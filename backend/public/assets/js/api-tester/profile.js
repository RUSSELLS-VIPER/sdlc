import {
  buildFormDataFromMap,
  createActionButton,
  createEndpointCard,
  createField,
  createLazyAccordionItem,
  createSectionHeader
} from "./shared.js";

function profileLookupBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/users/profile/:id",
    description: "Fetch user profile.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "profileUserId", label: "User ID", placeholder: "User id (or Current User ID)" })}
        ${createActionButton({ action: "profile.get", label: "Execute Request", variant: "secondary" })}
      </div>
    `
  });
}

function profileUpdateBody() {
  return createEndpointCard({
    method: "PUT",
    path: "PUT /api/users/profile/update",
    description: "Update profile with file preview support.",
    bodyHtml: `
      <div class="row g-3">
        <div class="col-md-6">${createField({ id: "profileName", label: "Name (optional)", placeholder: "New name" })}</div>
        <div class="col-md-6">${createField({ id: "profileEmail", label: "Email (optional)", placeholder: "New email", type: "email" })}</div>
        <div class="col-md-6">${createField({ id: "profileCity", label: "City (optional)", placeholder: "City" })}</div>
        <div class="col-md-6">${createField({ id: "profileDistrict", label: "District (optional)", placeholder: "District" })}</div>
        <div class="col-md-6">${createField({ id: "profileLocality", label: "Locality (optional)", placeholder: "Locality" })}</div>
        <div class="col-md-6">${createField({ id: "profilePhoneNo", label: "Phone No. (optional)", placeholder: "Phone No." })}</div>
        <div class="col-12">${createField({ id: "profileImage", label: "Profile Image (optional)", control: "file" })}<div id="profileImagePreview" class="image-preview"></div></div>
        <div class="col-12">${createActionButton({ action: "profile.update", label: "Execute Request", variant: "primary" })}</div>
      </div>
    `
  });
}

export function renderProfileSection() {
  return `
    ${createSectionHeader({
      title: "User Management",
      subtitle: "Profile lookup and update flows stay intact while the page mounts less markup up front.",
      badge: "Profile APIs",
      icon: "person-circle",
      badgeClass: "method-put"
    })}
    <div class="accordion endpoint-accordion" id="profileAccordion">
      ${createLazyAccordionItem({
        itemId: "profile-lookup",
        bodyId: "profile-lookup-body",
        method: "GET",
        title: "GET /api/users/profile/:id",
        description: "Fetch user profile."
      })}
      ${createLazyAccordionItem({
        itemId: "profile-update",
        bodyId: "profile-update-body",
        method: "PUT",
        title: "PUT /api/users/profile/update",
        description: "Update profile with file preview support."
      })}
    </div>
  `;
}

export function getProfileLazyBodies() {
  return {
    "profile-lookup-body": profileLookupBody,
    "profile-update-body": profileUpdateBody
  };
}

export function getProfileActions(state, api) {
  return {
    "profile.get": async () => {
      const userId = String(state.dom.profileUserId?.value ?? state.dom.currentUserId?.value ?? "").trim();
      await api.sendRequest(`/api/users/profile/${encodeURIComponent(userId)}`, "GET", null, { authRequired: true });
    },
    "profile.update": async () => {
      const { formData, hasPayload } = buildFormDataFromMap(state.dom, [
        { key: "name", id: "profileName" },
        { key: "email", id: "profileEmail" },
        { key: "city", id: "profileCity" },
        { key: "district", id: "profileDistrict" },
        { key: "locality", id: "profileLocality" },
        { key: "phoneNo", id: "profilePhoneNo" }
      ], { fileId: "profileImage" });

      if (!hasPayload) {
        api.renderResponse({ message: "Add at least one field or profile image to update" }, 400, "updateUserProfile");
        return;
      }

      await api.sendRequest("/api/users/profile/update", "PUT", formData, { authRequired: true, isFormData: true });
    }
  };
}
