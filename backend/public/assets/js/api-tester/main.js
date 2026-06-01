import {
  cacheDom,
  cacheRootIds,
  createMetricsCard,
  createSectionHeader
} from "./shared.js";
import { renderAuthSection, getAuthLazyBodies, getAuthActions } from "./auth.js";
import { renderPropertySection, getPropertyLazyBodies, getPropertyActions } from "./property.js";
import { renderProfileSection, getProfileLazyBodies, getProfileActions } from "./profile.js";
import { renderFavoriteSection, getFavoriteLazyBodies, getFavoriteActions } from "./favorite.js";
import { renderChatSection, getChatLazyBodies, getChatActions } from "./chat.js";
import { renderAdminSection, getAdminLazyBodies, getAdminActions } from "./admin.js";
import { createApiClient } from "./shared.js";

const state = {
  dom: cacheDom([
    "baseUrl",
    "token",
    "currentUserId",
    "commonPropertyId",
    "response",
    "responseStatusBadge",
    "saveToken",
    "clearToken",
    "copyResponseBtn",
    "clearResponseBtn",
    "sidebarOffcanvas",
    "mobileNavHost",
    "sidebarNav",
    "apiTesterSections",
    "section-dashboard",
    "section-auth",
    "section-properties",
    "section-users",
    "section-favorites",
    "section-chat",
    "section-admin"
  ]),
  sectionBodies: {},
  lazyBodyRenderers: {},
  loadedSections: new Set(),
  loadedBodies: new Set(),
  navButtons: [],
  actions: {}
};

function renderDashboardSection() {
  return {
    html: `
      ${createSectionHeader({
        title: "Dashboard Overview",
        subtitle: "Live metrics stay available, but the panel mounts only when the dashboard section opens.",
        badge: "Overview",
        icon: "clock-history",
        badgeClass: "method-put"
      })}
      <div class="row g-4">
        <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "metricTotalUsers", icon: "people-fill", label: "Total Users", value: "0" })}</div>
        <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "metricTotalProperties", icon: "building-fill", label: "Total Properties", value: "0" })}</div>
        <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "metricFavorites", icon: "heart-fill", label: "Favorites", value: "0" })}</div>
        <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "metricApiRequests", icon: "lightning-charge-fill", label: "API Requests", value: "0" })}</div>
      </div>
    `,
    lazyBodies: {}
  };
}

const sectionFactories = {
  "section-dashboard": renderDashboardSection,
  "section-auth": () => ({ html: renderAuthSection(), lazyBodies: getAuthLazyBodies() }),
  "section-properties": () => ({ html: renderPropertySection(), lazyBodies: getPropertyLazyBodies() }),
  "section-users": () => ({ html: renderProfileSection(), lazyBodies: getProfileLazyBodies() }),
  "section-favorites": () => ({ html: renderFavoriteSection(), lazyBodies: getFavoriteLazyBodies() }),
  "section-chat": () => ({ html: renderChatSection(), lazyBodies: getChatLazyBodies() }),
  "section-admin": () => ({ html: renderAdminSection(), lazyBodies: getAdminLazyBodies() })
};

const api = createApiClient(state.dom);

function syncMetricState() {
  api.setMetric("metricApiRequests", api.loadMetricCount());
  api.setMetric("metricTotalUsers", 0);
  api.setMetric("metricTotalProperties", 0);
  api.setMetric("metricFavorites", 0);
}

function cloneMobileNav() {
  if (!state.dom.mobileNavHost || !state.dom.sidebarNav) {
    return;
  }

  state.dom.mobileNavHost.innerHTML = state.dom.sidebarNav.innerHTML;

  state.dom.mobileNavHost.querySelectorAll("[id]").forEach((element) => {
    element.id = `${element.id}-mobile`;
  });

  state.dom.mobileNavHost.querySelectorAll("[data-bs-target]").forEach((element) => {
    const target = element.getAttribute("data-bs-target");
    if (target && target.startsWith("#")) {
      element.setAttribute("data-bs-target", `${target}-mobile`);
    }
  });

  state.dom.mobileNavHost.querySelectorAll("[aria-controls]").forEach((element) => {
    const controls = element.getAttribute("aria-controls");
    if (controls) {
      element.setAttribute("aria-controls", `${controls}-mobile`);
    }
  });

  state.dom.mobileNavHost.querySelectorAll("[aria-labelledby]").forEach((element) => {
    const labelledBy = element.getAttribute("aria-labelledby");
    if (labelledBy) {
      element.setAttribute("aria-labelledby", `${labelledBy}-mobile`);
    }
  });
}

function cacheSectionBodies() {
  document.querySelectorAll("[data-section-content]").forEach((element) => {
    state.sectionBodies[element.dataset.sectionContent] = element;
  });
}

function cacheNavButtons() {
  state.navButtons = Array.from(document.querySelectorAll("[data-section-target]"));
}

function activateNavButtons(sectionId) {
  state.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.sectionTarget === sectionId);
  });
}

function mountLazyBody(bodyKey) {
  if (!bodyKey || state.loadedBodies.has(bodyKey)) {
    return;
  }

  const renderer = state.lazyBodyRenderers[bodyKey];
  const slot = document.querySelector(`[data-lazy-slot="${bodyKey}"]`);
  if (!renderer || !slot) {
    return;
  }

  slot.innerHTML = renderer();
  cacheRootIds(slot, state.dom);
  state.loadedBodies.add(bodyKey);
}

function mountSection(sectionId) {
  if (state.loadedSections.has(sectionId)) {
    return;
  }

  const sectionFactory = sectionFactories[sectionId];
  const sectionBody = state.sectionBodies[sectionId];
  if (!sectionFactory || !sectionBody) {
    return;
  }

  const { html, lazyBodies } = sectionFactory();
  sectionBody.innerHTML = html;
  Object.assign(state.lazyBodyRenderers, lazyBodies || {});
  cacheRootIds(sectionBody, state.dom);
  state.loadedSections.add(sectionId);
}

function openSection(sectionId, { scroll = true } = {}) {
  mountSection(sectionId);

  const collapseElement = state.dom[sectionId];
  if (collapseElement) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(collapseElement, { toggle: false });
    collapse.show();
  }

  activateNavButtons(sectionId);

  const offcanvas = bootstrap.Offcanvas.getInstance(state.dom.sidebarOffcanvas);
  if (offcanvas && window.innerWidth < 1200) {
    offcanvas.hide();
  }

  if (scroll) {
    window.requestAnimationFrame(() => {
      const target = state.dom[sectionId];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const actionElement = event.target.closest("[data-action]");
    if (actionElement) {
      const action = state.actions[actionElement.dataset.action];
      if (action) {
        event.preventDefault();
        await action({
          state,
          api,
          actions: state.actions,
          event,
          element: actionElement
        });
      }
      return;
    }

    const navElement = event.target.closest("[data-section-target]");
    if (navElement) {
      event.preventDefault();
      openSection(navElement.dataset.sectionTarget);
    }
  });

  document.addEventListener("change", async (event) => {
    const target = event.target;
    if (!target) {
      return;
    }

    if (target.id === "adminTimeframe") {
      await state.actions["admin.dashboard"]?.({
        state,
        api,
        actions: state.actions,
        event,
        element: target
      });
      return;
    }

    const previewTargets = {
      createImage: "createImagePreview",
      updateImage: "updateImagePreview",
      profileImage: "profileImagePreview",
      blogImage: "blogImagePreview",
      blogUpdateImage: "blogUpdateImagePreview"
    };

    const previewId = previewTargets[target.id];
    if (!previewId) {
      return;
    }

    const preview = state.dom[previewId];
    if (!preview) {
      return;
    }

    const file = target.files && target.files[0];
    if (!file) {
      preview.innerHTML = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    preview.innerHTML = `<img src="${previewUrl}" alt="Preview" />`;
    preview.querySelector("img").addEventListener("load", () => URL.revokeObjectURL(previewUrl), { once: true });
  });

  document.addEventListener("shown.bs.collapse", (event) => {
    const collapseElement = event.target;
    const bodyKey = collapseElement?.dataset?.lazyBody;
    if (bodyKey) {
      mountLazyBody(bodyKey);
      return;
    }

    const sectionId = collapseElement?.id;
    if (sectionId) {
      mountSection(sectionId);
      activateNavButtons(sectionId);
    }
  });
}

function hydrateInitialState() {
  if (!state.dom.baseUrl.value) {
    state.dom.baseUrl.value = window.location.origin;
  }

  state.dom.token.value = localStorage.getItem("api_tester_token") || "";
  state.dom.currentUserId.value = localStorage.getItem("api_tester_user_id") || "";

  syncMetricState();
  api.clearResponse();
}

function init() {
  cacheSectionBodies();
  cloneMobileNav();
  cacheNavButtons();

  state.actions = {
    ...getAuthActions(state, api),
    ...getPropertyActions(state, api),
    ...getProfileActions(state, api),
    ...getFavoriteActions(state, api),
    ...getChatActions(state, api),
    ...getAdminActions(state, api)
  };

  bindEvents();
  hydrateInitialState();
  openSection("section-dashboard", { scroll: false });
  syncMetricState();

  window.showSection = openSection;
  window.selectUserForChat = (userId) => {
    if (state.dom.chatHistoryUserId) {
      state.dom.chatHistoryUserId.value = userId;
    }
    state.actions["chat.load"]?.({
      state,
      api,
      actions: state.actions,
      event: null,
      element: state.dom.chatHistoryUserId
    });
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
