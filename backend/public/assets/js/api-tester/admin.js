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

function blogCreateBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/admin/blogs",
    description: "Create an admin blog post.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "blogTitle", label: "Title", placeholder: "Blog title" })}
        ${createField({ id: "blogSubtitle", label: "Subtitle", control: "textarea", rows: 3, placeholder: "Blog subtitle" })}
        ${createField({ id: "blogContent", label: "Content", control: "textarea", rows: 8, placeholder: "Blog content" })}
        ${createField({ id: "blogImage", label: "Image", control: "file" })}
        <div id="blogImagePreview" class="image-preview"></div>
        ${createActionButton({ action: "admin.blog.create", label: "Create Blog", variant: "primary" })}
      </div>
    `
  });
}

function blogLookupBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/admin/blogs and GET /api/admin/blogs/:id",
    description: "List blogs or fetch a single blog post.",
    bodyHtml: `
      <div class="input-stack">
        ${createActionButton({ action: "admin.blog.list", label: "Fetch Blog List", variant: "secondary" })}
        ${createField({ id: "blogPostId", label: "Blog ID", placeholder: "Blog post id" })}
        ${createActionButton({ action: "admin.blog.get", label: "Fetch Blog By ID", variant: "outline" })}
      </div>
    `
  });
}

function blogUpdateBody() {
  return createEndpointCard({
    method: "PUT",
    path: "PUT /api/admin/blogs/:id",
    description: "Update blog title, subtitle, content, or image.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "blogUpdateId", label: "Blog ID", placeholder: "Blog post id" })}
        ${createField({ id: "blogUpdateTitle", label: "Title (optional)", placeholder: "Updated blog title" })}
        ${createField({ id: "blogUpdateSubtitle", label: "Subtitle (optional)", control: "textarea", rows: 3, placeholder: "Updated blog subtitle" })}
        ${createField({ id: "blogUpdateContent", label: "Content (optional)", control: "textarea", rows: 8, placeholder: "Updated blog content" })}
        ${createField({ id: "blogUpdateImage", label: "Image (optional)", control: "file" })}
        <div id="blogUpdateImagePreview" class="image-preview"></div>
        ${createActionButton({ action: "admin.blog.update", label: "Update Blog", variant: "primary" })}
      </div>
    `
  });
}

function blogDeleteBody() {
  return createEndpointCard({
    method: "DELETE",
    path: "DELETE /api/admin/blogs/:id",
    description: "Remove a blog post.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "blogDeleteId", label: "Blog ID", placeholder: "Blog post id" })}
        ${createActionButton({ action: "admin.blog.delete", label: "Delete Blog", variant: "outline" })}
      </div>
    `
  });
}

function roleChangeBody() {
  return createEndpointCard({
    method: "PATCH",
    path: "PATCH /api/admin/admin-update-role/:userId",
    description: "Update a user's role from the admin console.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "adminRoleUserId", label: "User ID", placeholder: "Target user id" })}
        ${createField({
          id: "adminRoleValue",
          label: "New Role",
          control: "select",
          value: "agent",
          options: [
            { value: "user", label: "user" },
            { value: "agent", label: "agent" },
            { value: "admin", label: "admin" }
          ]
        })}
        ${createActionButton({ action: "admin.role.change", label: "Update Role", variant: "primary" })}
      </div>
    `
  });
}

export function renderAdminSection() {
  return `
    ${createSectionHeader({
      title: "Admin",
      subtitle: "Dashboard, customer tools, blog tools, and role updates are loaded only when needed.",
      badge: "Admin APIs",
      icon: "shield-lock",
      badgeClass: "method-post"
    })}
    <div class="row g-4 mb-4">
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricChats", icon: "chat-left-text", label: "Active Chats", value: "--" })}</div>
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricFavorites", icon: "heart-fill", label: "Total Favorites", value: "--" })}</div>
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricProperties", icon: "house-check", label: "Total Properties", value: "--" })}</div>
      <div class="col-xl-3 col-md-6">${createMetricsCard({ id: "adminMetricUsers", icon: "people", label: "Total Users", value: "--" })}</div>
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
      ${createLazyAccordionItem({
        itemId: "admin-blogs-create",
        bodyId: "admin-blogs-create-body",
        method: "POST",
        title: "POST /api/admin/blogs",
        description: "Create an admin blog post."
      })}
      ${createLazyAccordionItem({
        itemId: "admin-blogs-lookup",
        bodyId: "admin-blogs-lookup-body",
        method: "GET",
        title: "GET /api/admin/blogs and GET /api/admin/blogs/:id",
        description: "List blogs or fetch a single blog post."
      })}
      ${createLazyAccordionItem({
        itemId: "admin-blogs-update",
        bodyId: "admin-blogs-update-body",
        method: "PUT",
        title: "PUT /api/admin/blogs/:id",
        description: "Update blog title, subtitle, content, or image."
      })}
      ${createLazyAccordionItem({
        itemId: "admin-blogs-delete",
        bodyId: "admin-blogs-delete-body",
        method: "DELETE",
        title: "DELETE /api/admin/blogs/:id",
        description: "Remove a blog post."
      })}
      ${createLazyAccordionItem({
        itemId: "admin-role-change",
        bodyId: "admin-role-change-body",
        method: "PATCH",
        title: "PATCH /api/admin/admin-update-role/:userId",
        description: "Update a user's role from the admin console."
      })}
    </div>
  `;
}

export function getAdminLazyBodies() {
  return {
    "admin-dashboard-body": dashboardBody,
    "admin-customers-body": customerListBody,
    "admin-blogs-create-body": blogCreateBody,
    "admin-blogs-lookup-body": blogLookupBody,
    "admin-blogs-update-body": blogUpdateBody,
    "admin-blogs-delete-body": blogDeleteBody,
    "admin-role-change-body": roleChangeBody
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
    },
    "admin.blog.create": async () => {
      const formData = new FormData();
      const title = String(state.dom.blogTitle?.value ?? "").trim();
      const subtitle = String(state.dom.blogSubtitle?.value ?? "").trim();
      const content = String(state.dom.blogContent?.value ?? "").trim();

      if (title) formData.append("title", title);
      if (subtitle) formData.append("subtitle", subtitle);
      if (content) formData.append("content", content);
      if (state.dom.blogImage?.files?.[0]) {
        formData.append("image", state.dom.blogImage.files[0]);
      }

      await api.sendRequest("/api/admin/blogs", "POST", formData, { authRequired: true, isFormData: true });
    },
    "admin.blog.list": async () => {
      await api.sendRequest("/api/admin/blogs", "GET", null, { authRequired: true });
    },
    "admin.blog.get": async () => {
      const blogId = String(state.dom.blogPostId?.value ?? "").trim();
      await api.sendRequest(`/api/admin/blogs/${encodeURIComponent(blogId)}`, "GET", null, { authRequired: true });
    },
    "admin.blog.update": async () => {
      const blogId = String(state.dom.blogUpdateId?.value ?? "").trim();
      const formData = new FormData();
      const title = String(state.dom.blogUpdateTitle?.value ?? "").trim();
      const subtitle = String(state.dom.blogUpdateSubtitle?.value ?? "").trim();
      const content = String(state.dom.blogUpdateContent?.value ?? "").trim();

      if (title) formData.append("title", title);
      if (subtitle) formData.append("subtitle", subtitle);
      if (content) formData.append("content", content);
      if (state.dom.blogUpdateImage?.files?.[0]) {
        formData.append("image", state.dom.blogUpdateImage.files[0]);
      }

      await api.sendRequest(`/api/admin/blogs/${encodeURIComponent(blogId)}`, "PUT", formData, { authRequired: true, isFormData: true });
    },
    "admin.blog.delete": async () => {
      const blogId = String(state.dom.blogDeleteId?.value ?? "").trim();
      await api.sendRequest(`/api/admin/blogs/${encodeURIComponent(blogId)}`, "DELETE", null, { authRequired: true });
    },
    "admin.role.change": async () => {
      const userId = String(state.dom.adminRoleUserId?.value ?? "").trim();
      const role = String(state.dom.adminRoleValue?.value ?? "").trim();
      await api.sendRequest(`/api/admin/admin-update-role/${encodeURIComponent(userId)}`, "PATCH", { role }, { authRequired: true });
    }
  };
}
