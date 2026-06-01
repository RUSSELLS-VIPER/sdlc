import {
  createActionButton,
  createEndpointCard,
  createField,
  createLazyAccordionItem,
  createSectionHeader
} from "./shared.js";

function toggleFavoriteBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/users/favorites/:propertyId",
    description: "Toggle favorite state for a property.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "favoritePropertyId", label: "Property ID", placeholder: "Property id" })}
        <div class="tiny-note">Falls back to Common Property ID when this field is empty.</div>
        ${createActionButton({ action: "favorite.toggle", label: "Execute Request", variant: "secondary" })}
      </div>
    `
  });
}

function favoriteListBody() {
  return createEndpointCard({
    method: "GET",
    path: "GET /api/users/favorites/my-list",
    description: "Fetch the authenticated user's saved favorites.",
    bodyHtml: `
      <div class="input-stack">
        ${createActionButton({ action: "favorite.list", label: "Fetch Favorites", variant: "primary" })}
      </div>
    `
  });
}

export function renderFavoriteSection() {
  return `
    ${createSectionHeader({
      title: "Favorites",
      subtitle: "Favorite toggles and the user list are loaded only when this section opens.",
      badge: "Favorite APIs",
      icon: "heart",
      badgeClass: "method-post"
    })}
    <div class="accordion endpoint-accordion" id="favoriteAccordion">
      ${createLazyAccordionItem({
        itemId: "favorite-toggle",
        bodyId: "favorite-toggle-body",
        method: "POST",
        title: "POST /api/users/favorites/:propertyId",
        description: "Toggle favorite state for a property."
      })}
      ${createLazyAccordionItem({
        itemId: "favorite-list",
        bodyId: "favorite-list-body",
        method: "GET",
        title: "GET /api/users/favorites/my-list",
        description: "Fetch the authenticated user's saved favorites."
      })}
    </div>
  `;
}

export function getFavoriteLazyBodies() {
  return {
    "favorite-toggle-body": toggleFavoriteBody,
    "favorite-list-body": favoriteListBody
  };
}

export function getFavoriteActions(state, api) {
  return {
    "favorite.toggle": async () => {
      const propertyId = String(state.dom.favoritePropertyId?.value ?? state.dom.commonPropertyId?.value ?? "").trim();
      await api.sendRequest(`/api/users/favorites/${encodeURIComponent(propertyId)}`, "POST", null, { authRequired: true });
    },
    "favorite.list": async () => {
      await api.sendRequest("/api/users/favorites/my-list", "GET", null, { authRequired: true });
    }
  };
}
