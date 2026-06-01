import {
  createActionButton,
  createEndpointCard,
  createField,
  createLazyAccordionItem,
  createSectionHeader,
  escapeHtml
} from "./shared.js";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function renderSearchResults(users) {
  if (!Array.isArray(users) || users.length === 0) {
    return '<div class="tiny-note text-center py-3 mb-0">No matching users found.</div>';
  }

  return users.map((user) => {
    const imageSrc = user.profilePic && typeof user.profilePic === "string" ? user.profilePic : DEFAULT_AVATAR;
    return `
      <button type="button" class="contact-item w-100 text-start" data-action="chat.select" data-user-id="${escapeHtml(user._id)}">
        <img src="${escapeHtml(imageSrc)}" alt="Avatar" />
        <div class="contact-meta">
          <div class="d-flex justify-content-between align-items-center gap-2">
            <strong>${escapeHtml(user.name)}</strong>
            <span class="soft-badge method-get">${escapeHtml(user.role || "USER")}</span>
          </div>
          <div class="contact-preview">${escapeHtml(user.latestMessageText || "No recent message")}</div>
        </div>
      </button>
    `;
  }).join("");
}

function renderTimeline(data, currentUserId) {
  const timeline = data?.timeline || {};
  const userContext = data?.userContext || {};
  const imageSrc = userContext.profilePic || DEFAULT_AVATAR;
  const entries = Object.keys(timeline);

  const bannerHtml = `
    <div class="chat-participant-banner show">
      <img src="${escapeHtml(imageSrc)}" class="chat-avatar" alt="Avatar" />
      <div>
        <div class="message-name">${escapeHtml(userContext.name || "Unknown")} <span class="text-secondary fw-normal">(${escapeHtml(userContext.role || "USER")})</span></div>
        <div class="message-meta">Locality: ${escapeHtml(userContext.locality || "N/A")} | District: ${escapeHtml(userContext.district || "N/A")}</div>
      </div>
    </div>
  `;

  if (entries.length === 0) {
    return {
      bannerHtml,
      streamHtml: '<div class="tiny-note text-center my-auto">Conversation initialized. No textual records found.</div>'
    };
  }

  const streamHtml = entries.map((dateHeader) => {
    const messages = timeline[dateHeader] || [];
    const messageRows = messages.map((message) => {
      const isMe = message.senderId === currentUserId;
      return `
        <div class="message-row ${isMe ? "me" : ""}">
          <div class="message-bubble ${isMe ? "me" : "them"}">
            <div>${escapeHtml(message.messageText)}</div>
            <div class="message-footer">
              <span>${escapeHtml(message.timeLabel || "")}</span>
              <span>${isMe ? (message.isRead ? "✓✓" : "✓") : ""}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="message-separator">${escapeHtml(dateHeader)}</div>
      ${messageRows}
    `;
  }).join("");

  return { bannerHtml, streamHtml };
}

function searchBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/users/search-user-to-chat",
    description: "Search users for a conversation target.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "chatSearchInput", label: "Search users", placeholder: "Name or email fragment" })}
        ${createActionButton({ action: "chat.search", label: "Search Users", variant: "secondary" })}
        <div id="chatSearchOutputContainer" class="chat-list mt-3"></div>
      </div>
    `
  });
}

function historyBody() {
  return createEndpointCard({
    method: "POST",
    path: "GET /api/users/history/:userId and POST /api/users/chat/send",
    description: "Load a conversation and send a follow-up message.",
    bodyHtml: `
      <div class="chat-history">
        <div id="chatParticipantBanner" class="chat-participant-banner"></div>
        <div id="chatMessageStream" class="chat-message-stream">
          <div class="tiny-note text-center my-auto">Open a user from search to load history.</div>
        </div>
      </div>
      <div class="mt-3">
        ${createField({ id: "chatHistoryUserId", label: "Target User ID", placeholder: "User id to load history" })}
        ${createField({ id: "chatOutgoingTextMessage", label: "Message", control: "textarea", rows: 3, placeholder: "Write a message" })}
        <div class="d-flex gap-2 flex-wrap">
          ${createActionButton({ action: "chat.load", label: "Load History", variant: "secondary", fullWidth: false })}
          ${createActionButton({ action: "chat.send", label: "Send Message", variant: "primary", fullWidth: false })}
        </div>
      </div>
    `
  });
}

export function renderChatSection() {
  return `
    ${createSectionHeader({
      title: "Chat",
      subtitle: "Chat search and message history are mounted only when the section opens.",
      badge: "Chat APIs",
      icon: "chat-dots",
      badgeClass: "method-post"
    })}
    <div class="accordion endpoint-accordion" id="chatAccordion">
      ${createLazyAccordionItem({
        itemId: "chat-search",
        bodyId: "chat-search-body",
        method: "GET",
        title: "GET /api/users/search-user-to-chat",
        description: "Search users for a conversation target."
      })}
      ${createLazyAccordionItem({
        itemId: "chat-history",
        bodyId: "chat-history-body",
        method: "POST",
        title: "GET /api/users/history/:userId and POST /api/users/chat/send",
        description: "Load a conversation and send a follow-up message."
      })}
    </div>
  `;
}

export function getChatLazyBodies() {
  return {
    "chat-search-body": searchBody,
    "chat-history-body": historyBody
  };
}

export function getChatActions(state, api) {
  return {
    "chat.search": async () => {
      const query = String(state.dom.chatSearchInput?.value ?? "").trim();
      const container = state.dom.chatSearchOutputContainer;
      const result = await api.sendRequest(`/api/users/search-user-to-chat?search=${encodeURIComponent(query)}`, "GET", null, { authRequired: true });

      if (!container) {
        return;
      }

      if (result.status !== 200 || !Array.isArray(result.data)) {
        container.innerHTML = '<div class="tiny-note text-center text-danger py-3 mb-0">Failed to fetch records or unauthorized access.</div>';
        return;
      }

      container.innerHTML = renderSearchResults(result.data);
    },
    "chat.select": async (context) => {
      const userId = String(context?.element?.dataset?.userId ?? "").trim();
      if (!state.dom.chatHistoryUserId || !userId) {
        return;
      }
      state.dom.chatHistoryUserId.value = userId;
      await context.actions["chat.load"]?.(context);
    },
    "chat.load": async () => {
      const targetUserId = String(state.dom.chatHistoryUserId?.value ?? "").trim();
      const banner = state.dom.chatParticipantBanner;
      const stream = state.dom.chatMessageStream;
      const currentUserId = String(state.dom.currentUserId?.value ?? "").trim();

      if (!targetUserId) {
        alert("Please enter or pick an explicit target User ID context parameter first.");
        return;
      }

      const result = await api.sendRequest(`/api/users/history/${encodeURIComponent(targetUserId)}`, "GET", null, { authRequired: true });
      if (result.status !== 200 || !result.data || !banner || !stream) {
        if (banner) banner.classList.remove("show");
        if (stream) stream.innerHTML = '<div class="tiny-note text-center text-danger my-auto">Failed to compile conversation log details.</div>';
        return;
      }

      const rendered = renderTimeline(result.data, currentUserId);
      banner.innerHTML = rendered.bannerHtml;
      stream.innerHTML = rendered.streamHtml;
      banner.classList.add("show");
      stream.scrollTop = stream.scrollHeight;
    },
    "chat.send": async (context) => {
      const receiverId = String(state.dom.chatHistoryUserId?.value ?? "").trim();
      const textInput = state.dom.chatOutgoingTextMessage;
      const messageText = String(textInput?.value ?? "").trim();

      if (!receiverId) {
        alert("A valid recipient ID must be selected to transmit messages.");
        return;
      }

      if (!messageText) {
        alert("Cannot send an empty message.");
        return;
      }

      const result = await api.sendRequest("/api/users/chat/send", "POST", { receiverId, messageText }, { authRequired: true });
      if (result.status === 201) {
        if (textInput) {
          textInput.value = "";
        }
        await context.actions["chat.load"]?.(context);
      } else {
        alert("Failed to deliver the message. Check the response panel for details.");
      }
    }
  };
}
