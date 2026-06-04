import {
  createActionButton,
  createEndpointCard,
  createField,
  createLazyAccordionItem,
  createSectionHeader,
  readPayloadFromMap
} from "./shared.js";

function submitInquiryBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/client/property/:propertyId/inquiry",
    description: "Submit an inquiry for a property. Requires a signed-in user, agent, or admin token.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "clientInquiryPropertyId", label: "Property ID", placeholder: "Property id" })}
        <div class="tiny-note">Falls back to Common Property ID when this field is empty.</div>
        ${createField({ id: "clientInquiryName", label: "Name (optional)", placeholder: "Uses profile name when empty" })}
        ${createField({ id: "clientInquiryEmail", label: "Email (optional)", placeholder: "Uses profile email when empty", type: "email" })}
        ${createField({ id: "clientInquiryPhoneNo", label: "Phone No. (optional)", placeholder: "Uses profile phone when empty" })}
        ${createField({ id: "clientInquiryMessageText", label: "Message", control: "textarea", rows: 4, value: "I am interested in this property. Please contact me with more details." })}
        ${createActionButton({ action: "inquiry.submit", label: "Submit Inquiry", variant: "primary" })}
      </div>
    `
  });
}

function agentDashboardBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/agent/dashboard-summary",
    description: "Fetch agent KPIs, pie chart data, and the agent's property list.",
    bodyHtml: `
      <div class="input-stack">
        ${createActionButton({ action: "agent.dashboard-summary", label: "Fetch Dashboard Summary", variant: "primary" })}
      </div>
    `
  });
}

function agentLeadsBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/agent/agent/leads",
    description: "Fetch incoming inquiries for the authenticated agent with pagination and optional search.",
    bodyHtml: `
      <div class="row g-3">
        <div class="col-md-4">${createField({ id: "agentLeadsPage", label: "Page", type: "number", value: "1", min: "1" })}</div>
        <div class="col-md-8">${createField({ id: "agentLeadsSearch", label: "Search Name (optional)", placeholder: "Customer name fragment" })}</div>
        <div class="col-12">${createActionButton({ action: "agent.leads", label: "Fetch Agent Leads", variant: "secondary" })}</div>
      </div>
    `
  });
}

function inquiryActionBody() {
  return createEndpointCard({
    method: "PATCH",
    path: "PATCH /api/agent/inquiry/:inquiryId/action",
    description: "Approve or disapprove a pending inquiry. Requires an agent token.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "agentActionInquiryId", label: "Inquiry ID", placeholder: "Inquiry id" })}
        ${createField({
          id: "agentInquiryAction",
          label: "Action",
          control: "select",
          value: "approved",
          options: [
            { value: "approved", label: "approved" },
            { value: "disapproved", label: "disapproved" }
          ]
        })}
        ${createActionButton({ action: "agent.inquiry-action", label: "Update Inquiry Action", variant: "primary" })}
      </div>
    `
  });
}

function inquiryDeleteBody() {
  return createEndpointCard({
    method: "DELETE",
    path: "DELETE /api/agent/inquiry/:inquiryId",
    description: "Soft-delete an inquiry from user or agent view screens.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "agentDeleteInquiryId", label: "Inquiry ID", placeholder: "Inquiry id" })}
        ${createActionButton({ action: "agent.inquiry-delete", label: "Delete Inquiry", variant: "outline" })}
      </div>
    `
  });
}

function notificationsBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/users/my-notifications",
    description: "Fetch the authenticated user's latest notifications.",
    bodyHtml: `
      <div class="input-stack">
        ${createActionButton({ action: "notifications.my-list", label: "Fetch Notifications", variant: "secondary" })}
      </div>
    `
  });
}

export function renderInquirySection() {
  return `
    ${createSectionHeader({
      title: "Inquiries & Notifications",
      subtitle: "Client inquiry submission, agent lead handling, and user notifications.",
      badge: "Inquiry APIs",
      icon: "clipboard-check",
      badgeClass: "method-patch"
    })}
    <div class="accordion endpoint-accordion" id="inquiryAccordion">
      ${createLazyAccordionItem({
        itemId: "inquiry-submit",
        bodyId: "inquiry-submit-body",
        method: "POST",
        title: "POST /api/client/property/:propertyId/inquiry",
        description: "Submit an inquiry for a property."
      })}
      ${createLazyAccordionItem({
        itemId: "agent-dashboard-summary",
        bodyId: "agent-dashboard-summary-body",
        method: "GET",
        title: "GET /api/agent/dashboard-summary",
        description: "Fetch agent KPIs and property list."
      })}
      ${createLazyAccordionItem({
        itemId: "agent-leads",
        bodyId: "agent-leads-body",
        method: "GET",
        title: "GET /api/agent/agent/leads",
        description: "Fetch incoming inquiry leads."
      })}
      ${createLazyAccordionItem({
        itemId: "agent-inquiry-action",
        bodyId: "agent-inquiry-action-body",
        method: "PATCH",
        title: "PATCH /api/agent/inquiry/:inquiryId/action",
        description: "Approve or disapprove an inquiry."
      })}
      ${createLazyAccordionItem({
        itemId: "agent-inquiry-delete",
        bodyId: "agent-inquiry-delete-body",
        method: "DELETE",
        title: "DELETE /api/agent/inquiry/:inquiryId",
        description: "Soft-delete an inquiry record."
      })}
      ${createLazyAccordionItem({
        itemId: "notifications-my-list",
        bodyId: "notifications-my-list-body",
        method: "GET",
        title: "GET /api/users/my-notifications",
        description: "Fetch latest notifications."
      })}
    </div>
  `;
}

export function getInquiryLazyBodies() {
  return {
    "inquiry-submit-body": submitInquiryBody,
    "agent-dashboard-summary-body": agentDashboardBody,
    "agent-leads-body": agentLeadsBody,
    "agent-inquiry-action-body": inquiryActionBody,
    "agent-inquiry-delete-body": inquiryDeleteBody,
    "notifications-my-list-body": notificationsBody
  };
}

export function getInquiryActions(state, api) {
  return {
    "inquiry.submit": async () => {
      const propertyId = String(state.dom.clientInquiryPropertyId?.value || state.dom.commonPropertyId?.value || "").trim();
      await api.sendRequest(`/api/client/property/${encodeURIComponent(propertyId)}/inquiry`, "POST", readPayloadFromMap(state.dom, [
        { key: "name", id: "clientInquiryName" },
        { key: "email", id: "clientInquiryEmail" },
        { key: "phoneNo", id: "clientInquiryPhoneNo" },
        { key: "messageText", id: "clientInquiryMessageText" }
      ]), { authRequired: true });
    },
    "agent.dashboard-summary": async () => {
      await api.sendRequest("/api/agent/dashboard-summary", "GET", null, { authRequired: true });
    },
    "agent.leads": async () => {
      const page = String(state.dom.agentLeadsPage?.value || "1").trim() || "1";
      const search = String(state.dom.agentLeadsSearch?.value || "").trim();
      let requestUrlPath = `/api/agent/agent/leads?page=${encodeURIComponent(page)}`;
      if (search) {
        requestUrlPath += `&search=${encodeURIComponent(search)}`;
      }
      await api.sendRequest(requestUrlPath, "GET", null, { authRequired: true });
    },
    "agent.inquiry-action": async () => {
      const inquiryId = String(state.dom.agentActionInquiryId?.value || "").trim();
      const action = String(state.dom.agentInquiryAction?.value || "").trim();
      await api.sendRequest(`/api/agent/inquiry/${encodeURIComponent(inquiryId)}/action`, "PATCH", { action }, { authRequired: true });
    },
    "agent.inquiry-delete": async () => {
      const inquiryId = String(state.dom.agentDeleteInquiryId?.value || "").trim();
      await api.sendRequest(`/api/agent/inquiry/${encodeURIComponent(inquiryId)}`, "DELETE", null, { authRequired: true });
    },
    "notifications.my-list": async () => {
      await api.sendRequest("/api/users/my-notifications", "GET", null, { authRequired: true });
    }
  };
}
