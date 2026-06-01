import {
  buildFormDataFromMap,
  createActionButton,
  createEndpointCard,
  createField,
  createLazyAccordionItem,
  createSectionHeader
} from "./shared.js";

function createPropertyBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/properties",
    description: "Create property.",
    bodyHtml: `
      <div class="row g-3">
        <div class="col-md-6">${createField({ id: "createTitle", label: "Title", value: "2BHK Apartment" })}</div>
        <div class="col-md-6">${createField({ id: "createPrice", label: "Price", value: "7800000", type: "number" })}</div>
        <div class="col-12">${createField({ id: "createDescription", label: "Description", control: "textarea", value: "Near metro station, ready to move.", rows: 3 })}</div>
        <div class="col-md-6">${createField({ id: "createAddress", label: "Address", value: "Kolkata, India" })}</div>
        <div class="col-md-6">${createField({ id: "createBhkType", label: "BHK Type", value: "2BHK" })}</div>
        <div class="col-md-6">${createField({ id: "createSqFt", label: "Sq.FT", value: "1200", type: "number" })}</div>
        <div class="col-md-6">${createField({ id: "createApartmentType", label: "Apartment Type", value: "Apartment" })}</div>
        <div class="col-md-6">${createField({
          id: "createPropertyType",
          label: "Property Type",
          control: "select",
          value: "apartment",
          options: [
            { value: "apartment", label: "apartment" },
            { value: "home", label: "home" },
            { value: "office", label: "office" },
            { value: "villa", label: "villa" },
            { value: "rental", label: "rental" }
          ]
        })}</div>
        <div class="col-md-6">${createField({
          id: "createProjectStatus",
          label: "Project Status",
          control: "select",
          value: "Completed",
          options: [
            { value: "Completed", label: "Completed" },
            { value: "Ongoing", label: "Ongoing" }
          ]
        })}</div>
        <div class="col-12">${createField({ id: "createImage", label: "Image (optional)", control: "file", note: "Preview is loaded on demand.", placeholder: "" })}<div id="createImagePreview" class="image-preview"></div></div>
        <div class="col-12">${createActionButton({ action: "property.create", label: "Execute Request", variant: "primary" })}</div>
      </div>
    `
  });
}

function browsePropertyBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/properties",
    description: "Fetch all properties or a single property by ID.",
    bodyHtml: `
      <div class="input-stack">
        <div class="d-flex flex-wrap gap-2">
          ${createActionButton({ action: "property.list", label: "Fetch List", variant: "secondary", fullWidth: false })}
        </div>
        ${createField({ id: "propertyId", label: "Property ID", placeholder: "Property id for get/update/delete" })}
        <div class="tiny-note">Tip: you can reuse Common Property ID above.</div>
        ${createActionButton({ action: "property.get-by-id", label: "GET /api/properties/:id", variant: "outline", fullWidth: true })}
      </div>
    `
  });
}

function updatePropertyBody() {
  return createEndpointCard({
    method: "PUT",
    path: "PUT /api/properties/:id",
    description: "Update property.",
    bodyHtml: `
      <div class="row g-3">
        <div class="col-12">${createField({ id: "updateId", label: "Property ID", placeholder: "Property id" })}</div>
        <div class="col-md-6">${createField({ id: "updateTitle", label: "Title (optional)" })}</div>
        <div class="col-md-6">${createField({ id: "updatePrice", label: "Price (optional)", type: "number" })}</div>
        <div class="col-12">${createField({ id: "updateDescription", label: "Description (optional)", control: "textarea", rows: 3 })}</div>
        <div class="col-md-6">${createField({ id: "updateAddress", label: "Address (optional)" })}</div>
        <div class="col-md-6">${createField({ id: "updateBhkType", label: "BHK Type (optional)" })}</div>
        <div class="col-md-6">${createField({ id: "updateSqFt", label: "Sq.FT (optional)", type: "number" })}</div>
        <div class="col-md-6">${createField({ id: "updateApartmentType", label: "Apartment Type (optional)" })}</div>
        <div class="col-md-6">${createField({
          id: "updatePropertyType",
          label: "Property Type (optional)",
          control: "select",
          value: "",
          options: [
            { value: "", label: "-- Select --" },
            { value: "apartment", label: "apartment" },
            { value: "home", label: "home" },
            { value: "office", label: "office" },
            { value: "villa", label: "villa" },
            { value: "rental", label: "rental" }
          ]
        })}</div>
        <div class="col-md-6">${createField({
          id: "updateProjectStatus",
          label: "Project Status (optional)",
          control: "select",
          value: "",
          options: [
            { value: "", label: "-- Select --" },
            { value: "Completed", label: "Completed" },
            { value: "Ongoing", label: "Ongoing" }
          ]
        })}</div>
        <div class="col-12">${createField({ id: "updateImage", label: "Image (optional)", control: "file" })}<div id="updateImagePreview" class="image-preview"></div></div>
        <div class="col-12">${createActionButton({ action: "property.update", label: "Execute Request", variant: "primary" })}</div>
      </div>
    `
  });
}

function managePropertyBody() {
  return createEndpointCard({
    method: "DELETE",
    path: "DELETE /api/properties/:id and POST /api/properties/:id/like",
    description: "Remove a property or toggle its like state.",
    bodyHtml: `
      <div class="row g-3">
        <div class="col-md-6">
          ${createField({ id: "deleteId", label: "Property ID for Delete", placeholder: "Property id" })}
          <div class="mt-3">${createActionButton({ action: "property.delete", label: "Execute Delete", variant: "outline" })}</div>
        </div>
        <div class="col-md-6">
          ${createField({ id: "likeId", label: "Property ID for Like", placeholder: "Property id" })}
          <div class="tiny-note">Falls back to Common Property ID when this field is empty.</div>
          <div class="mt-3">${createActionButton({ action: "property.like", label: "Execute Like", variant: "secondary" })}</div>
        </div>
      </div>
    `
  });
}

export function renderPropertySection() {
  return `
    ${createSectionHeader({
      title: "Properties",
      subtitle: "Create, query, update, delete, and like property records with less always-mounted markup.",
      badge: "Property APIs",
      icon: "house-gear",
      badgeClass: "method-get"
    })}
    <div class="accordion endpoint-accordion" id="propertyAccordion">
      ${createLazyAccordionItem({
        itemId: "property-create",
        bodyId: "property-create-body",
        method: "POST",
        title: "POST /api/properties",
        description: "Create property."
      })}
      ${createLazyAccordionItem({
        itemId: "property-browse",
        bodyId: "property-browse-body",
        method: "GET",
        title: "GET /api/properties",
        description: "Fetch all properties or a single property by ID."
      })}
      ${createLazyAccordionItem({
        itemId: "property-update",
        bodyId: "property-update-body",
        method: "PUT",
        title: "PUT /api/properties/:id",
        description: "Update property."
      })}
      ${createLazyAccordionItem({
        itemId: "property-manage",
        bodyId: "property-manage-body",
        method: "DELETE",
        title: "Delete / Like",
        description: "Remove a property or toggle its like state."
      })}
    </div>
  `;
}

export function getPropertyLazyBodies() {
  return {
    "property-create-body": createPropertyBody,
    "property-browse-body": browsePropertyBody,
    "property-update-body": updatePropertyBody,
    "property-manage-body": managePropertyBody
  };
}

export function getPropertyActions(state, api) {
  return {
    "property.create": async () => {
      const { formData } = buildFormDataFromMap(state.dom, [
        { key: "title", id: "createTitle" },
        { key: "description", id: "createDescription" },
        { key: "price", id: "createPrice", transform: (value) => String(Number(value)) },
        { key: "address", id: "createAddress" },
        { key: "bhkType", id: "createBhkType" },
        { key: "sqFt", id: "createSqFt" },
        { key: "apartmentType", id: "createApartmentType" },
        { key: "propertyType", id: "createPropertyType" },
        { key: "projectStatus", id: "createProjectStatus" }
      ], { fileId: "createImage" });
      await api.sendRequest("/api/properties", "POST", formData, { authRequired: true, isFormData: true });
    },
    "property.list": async () => {
      await api.sendRequest("/api/properties", "GET");
    },
    "property.get-by-id": async () => {
      await api.sendRequest(`/api/properties/${encodeURIComponent(String(state.dom.propertyId?.value ?? "").trim())}`, "GET");
    },
    "property.update": async () => {
      const { formData, hasPayload } = buildFormDataFromMap(state.dom, [
        { key: "title", id: "updateTitle" },
        { key: "description", id: "updateDescription" },
        { key: "price", id: "updatePrice", transform: (value) => String(Number(value)) },
        { key: "address", id: "updateAddress" },
        { key: "bhkType", id: "updateBhkType" },
        { key: "sqFt", id: "updateSqFt" },
        { key: "apartmentType", id: "updateApartmentType" },
        { key: "propertyType", id: "updatePropertyType" },
        { key: "projectStatus", id: "updateProjectStatus" }
      ], { fileId: "updateImage" });
      const propertyId = String(state.dom.updateId?.value ?? "").trim();

      if (!hasPayload) {
        api.renderResponse({ message: "Add at least one field or image to update" }, 400, "updateProperty");
        return;
      }

      await api.sendRequest(`/api/properties/${encodeURIComponent(propertyId)}`, "PUT", formData, { authRequired: true, isFormData: true });
    },
    "property.delete": async () => {
      await api.sendRequest(`/api/properties/${encodeURIComponent(String(state.dom.deleteId?.value ?? "").trim())}`, "DELETE", null, { authRequired: true });
    },
    "property.like": async () => {
      const propertyId = String(state.dom.likeId?.value ?? state.dom.commonPropertyId?.value ?? "").trim();
      await api.sendRequest(`/api/properties/${encodeURIComponent(propertyId)}/like`, "POST", null, { authRequired: true });
    }
  };
}
