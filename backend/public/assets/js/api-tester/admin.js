import {
  createActionButton,
  createEndpointCard,
  createField,
  createLazyAccordionItem,
  createMetricsCard,
  createSectionHeader
} from "./shared.js";

function dashboardBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/admin/dashboard",
    description: "Requires admin token authorization.",
    bodyHtml: `
      <div class="row g-3">
        <div class="col-md-4">
          ${createField({
            id: "adminTimeframe",
            label: "Timeframe",
            control: "select",
            value: "month",
            options: [
              { value: "month", label: "Month (Default)" },
              { value: "week", label: "Week" },
              { value: "year", label: "Year" }
            ]
          })}
        </div>
        <div class="col-md-8 d-flex align-items-end">
          ${createActionButton({ action: "admin.dashboard", label: "GET /api/admin/dashboard", variant: "primary" })}
        </div>
      </div>
    `
  });
}

function customerListBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/admin/customers-list",
    description: "Fetch regular customer directory profile records with pagination.",
    bodyHtml: `
      <div class="row g-3">
        <div class="col-md-4">${createField({ id: "adminCustomerPageNum", label: "Query Page Index", type: "number", value: "1", min: "1" })}</div>
        <div class="col-md-8">${createField({ id: "adminCustomerSearchText", label: "Search Parameter Text (Optional)", placeholder: "Filter by Name / Email fragment string..." })}</div>
      </div>
      <div class="mt-3">${createActionButton({ action: "admin.customers", label: "Execute API Request Context", variant: "secondary" })}</div>
    `
  });
}

export function renderAdminSection() {
  return `
    ${createSectionHeader({
      title: "Admin",
      subtitle: "Dashboard and customer tools stay hidden until the admin section is opened.",
      badge: "Admin APIs",
      icon: "shield-lock",
      badgeClass: "method-post"
    })}
    <div class="row g-4 mb-4">
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricChats", icon: "chat-left-text", label: "Active Chats", value: "—" })}</div>
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricFavorites", icon: "heart-fill", label: "Total Favorites", value: "—" })}</div>
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricProperties", icon: "house-check", label: "Total Properties", value: "—" })}</div>
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricUsers", icon: "people", label: "Total Users", value: "—" })}</div>
    </div>
    <div class="accordion endpoint-accordion" id="adminAccordion">
      ${createLazyAccordionItem({
        itemId: "admin-dashboard",
        bodyId: "admin-dashboard-body",
        method: "GET",
        title: "GET /api/admin/dashboard",
        description: "Requires admin token authorization."
      })}
      ${createLazyAccordionItem({
        itemId: "admin-customers",
        bodyId: "admin-customers-body",
        method: "GET",
        title: "GET /api/admin/customers-list",
        description: "Fetch regular customer directory profile records with pagination."
      })}
    </div>
  `;
}

export function getAdminLazyBodies() {
  return {
    "admin-dashboard-body": dashboardBody,
    "admin-customers-body": customerListBody
  };
}

export function getAdminActions(state, api) {
  return {
    "admin.dashboard": async () => {
      const timeframe = String(state.dom.adminTimeframe?.value ?? "month").trim();
      await api.sendRequest(`/api/admin/dashboard?timeframe=${encodeURIComponent(timeframe)}`, "GET", null, { authRequired: true });
    },
    "admin.customers": async () => {
      const pageIndex = String(state.dom.adminCustomerPageNum?.value ?? "1").trim() || "1";
      const searchString = String(state.dom.adminCustomerSearchText?.value ?? "").trim();
      let requestUrlPath = `/api/admin/customers-list?page=${encodeURIComponent(pageIndex)}`;
      if (searchString) {
        requestUrlPath += `&search=${encodeURIComponent(searchString)}`;
      }
      await api.sendRequest(requestUrlPath, "GET", null, { authRequired: true });
    }
  };
}
