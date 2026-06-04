const METRIC_STORAGE_KEY = "api_tester_request_count";

const METHOD_TONES = {
  GET: "method-get",
  POST: "method-post",
  PUT: "method-put",
  PATCH: "method-patch",
  DELETE: "method-delete"
};

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function methodClass(method) {
  return METHOD_TONES[String(method || "").toUpperCase()] || "method-get";
}

export function createSectionHeader({ title, subtitle, badge, icon, badgeClass = "method-post" }) {
  return `
    <div class="section-header row g-3 align-items-end mb-3">
      <div class="col-lg">
        <h2 class="section-title mb-1">${escapeHtml(title)}</h2>
        <p class="section-kicker mb-0">${escapeHtml(subtitle)}</p>
      </div>
      <div class="col-lg-auto">
        <span class="soft-badge ${badgeClass}"><i class="bi bi-${escapeHtml(icon || "dot")}"></i> ${escapeHtml(badge || "")}</span>
      </div>
    </div>
  `;
}

export function createMetricsCard({ id, icon, label, value = "0", className = "" }) {
  return `
    <div class="overview-card ${className}">
      <div class="icon-wrap"><i class="bi bi-${escapeHtml(icon)}"></i></div>
      <div class="overview-value" id="${escapeHtml(id)}">${escapeHtml(value)}</div>
      <p class="overview-label">${escapeHtml(label)}</p>
    </div>
  `;
}

export function createLazyAccordionItem({
  itemId,
  bodyId,
  method,
  title,
  description,
  expanded = false
}) {
  const collapseClass = expanded ? "accordion-collapse collapse show" : "accordion-collapse collapse";
  const buttonClass = expanded ? "accordion-button" : "accordion-button collapsed";
  return `
    <div class="accordion-item endpoint-item">
      <h2 class="accordion-header" id="${escapeHtml(itemId)}-heading">
        <button class="${buttonClass}" type="button" data-bs-toggle="collapse" data-bs-target="#${escapeHtml(itemId)}-collapse" aria-expanded="${expanded ? "true" : "false"}" aria-controls="${escapeHtml(itemId)}-collapse">
          <span class="d-flex flex-column align-items-start gap-1 w-100">
            <span class="d-flex align-items-center gap-2 flex-wrap">
              <span class="soft-badge ${methodClass(method)}">${escapeHtml(method)}</span>
              <span>${escapeHtml(title)}</span>
            </span>
            <span class="tiny-note mb-0">${escapeHtml(description)}</span>
          </span>
        </button>
      </h2>
      <div id="${escapeHtml(itemId)}-collapse" class="${collapseClass}" aria-labelledby="${escapeHtml(itemId)}-heading" data-lazy-body="${escapeHtml(bodyId)}">
        <div class="accordion-body" data-lazy-slot="${escapeHtml(bodyId)}"></div>
      </div>
    </div>
  `;
}

export function createEndpointCard({ method, path, description, bodyHtml, footerHtml = "" }) {
  return `
    <div class="endpoint-card">
      <div class="endpoint-header">
        <div>
          <span class="soft-badge ${methodClass(method)} mb-2">${escapeHtml(method)}</span>
          <h3>${escapeHtml(path)}</h3>
          <div class="endpoint-meta">${escapeHtml(description)}</div>
        </div>
      </div>
      ${bodyHtml}
      ${footerHtml}
    </div>
  `;
}

export function createField({ id, label, value = "", placeholder = "", type = "text", note = "", rows = 3, control = "input", options = [], required = false, min, max }) {
  const requiredAttr = required ? "required" : "";
  const rangeAttrs = [];
  if (min !== undefined) rangeAttrs.push(`min="${escapeHtml(min)}"`);
  if (max !== undefined) rangeAttrs.push(`max="${escapeHtml(max)}"`);
  const commonAttrs = `${requiredAttr} ${rangeAttrs.join(" ")}`.trim();

  let controlHtml = "";
  if (control === "textarea") {
    controlHtml = `<textarea id="${escapeHtml(id)}" class="form-control" placeholder="${escapeHtml(placeholder)}" ${commonAttrs} rows="${rows}">${escapeHtml(value)}</textarea>`;
  } else if (control === "select") {
    controlHtml = `
      <select id="${escapeHtml(id)}" class="form-select" ${commonAttrs}>
        ${options.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === value ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
      </select>
    `;
  } else if (control === "file") {
    controlHtml = `<input id="${escapeHtml(id)}" type="file" class="form-control" accept="image/*" ${commonAttrs} />`;
  } else {
    controlHtml = `<input id="${escapeHtml(id)}" class="form-control" type="${escapeHtml(type)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" ${commonAttrs} />`;
  }

  return `
    <div class="field-block">
      <label class="form-label" for="${escapeHtml(id)}">${escapeHtml(label)}</label>
      ${controlHtml}
      ${note ? `<div class="tiny-note">${escapeHtml(note)}</div>` : ""}
    </div>
  `;
}

export function createActionButton({ action, label, variant = "primary", className = "", type = "button", fullWidth = true }) {
  const widthClass = fullWidth ? "w-100" : "";
  return `<button type="${escapeHtml(type)}" class="btn btn-api btn-${escapeHtml(variant)}-api ${widthClass} ${escapeHtml(className)}" data-action="${escapeHtml(action)}">${escapeHtml(label)}</button>`;
}

export function cacheDom(ids) {
  const dom = {};
  ids.forEach((id) => {
    dom[id] = document.getElementById(id);
  });
  return dom;
}

export function cacheRootIds(root, dom) {
  if (!root) return;
  root.querySelectorAll("[id]").forEach((element) => {
    dom[element.id] = element;
  });
}

export function getTrimmedValue(dom, id) {
  return String(dom[id]?.value ?? "").trim();
}

export function readPayloadFromMap(dom, mappings) {
  const payload = {};
  mappings.forEach(({ key, id, transform }) => {
    const value = getTrimmedValue(dom, id);
    if (value) {
      payload[key] = transform ? transform(value) : value;
    }
  });
  return payload;
}

export function buildFormDataFromMap(dom, mappings, { fileId, fileKey = "image" } = {}) {
  const formData = new FormData();
  let hasPayload = false;

  mappings.forEach(({ key, id, transform }) => {
    const value = getTrimmedValue(dom, id);
    if (value) {
      formData.append(key, transform ? transform(value) : value);
      hasPayload = true;
    }
  });

  if (fileId && dom[fileId]?.files?.[0]) {
    formData.append(fileKey, dom[fileId].files[0]);
    hasPayload = true;
  }

  return { formData, hasPayload };
}

export function normalizeError(error, fallbackMessage = "Unexpected error") {
  if (error instanceof Error) {
    return { message: error.message };
  }
  if (typeof error === "string") {
    return { message: error };
  }
  return { message: fallbackMessage };
}

function escapeJsonSnippet(jsonString) {
  return escapeHtml(jsonString)
    .replace(/("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"\s*:?)|(\btrue\b|\bfalse\b|\bnull\b|\b-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)/g, (match) => {
      if (match.startsWith("\"")) {
        return match.trim().endsWith(":")
          ? `<span class="json-key">${match}</span>`
          : `<span class="json-string">${match}</span>`;
      }
      if (match === "true" || match === "false") {
        return `<span class="json-boolean">${match}</span>`;
      }
      if (match === "null") {
        return `<span class="json-null">${match}</span>`;
      }
      return `<span class="json-number">${match}</span>`;
    })
    .replace(/[{}\[\],]/g, (match) => `<span class="json-punctuation">${match}</span>`);
}

function setResponseStatus(dom, status) {
  const numericStatus = Number(status) || 0;
  let tone = "method-get";
  let icon = "info-circle";

  if (numericStatus >= 200 && numericStatus < 300) {
    tone = "method-get";
    icon = "check-circle-fill";
  } else if (numericStatus >= 300 && numericStatus < 400) {
    tone = "method-put";
    icon = "arrow-repeat";
  } else if (numericStatus >= 400) {
    tone = "method-delete";
    icon = "exclamation-triangle-fill";
  }

  dom.responseStatusBadge.className = `soft-badge ${tone}`;
  dom.responseStatusBadge.innerHTML = `<i class="bi bi-${icon}"></i>Status ${numericStatus || "—"}`;
}

function setMetric(dom, key, value) {
  if (dom[key]) {
    dom[key].textContent = String(value ?? 0);
  }
}

function loadMetricCount() {
  return Number(localStorage.getItem(METRIC_STORAGE_KEY) || 0);
}

function saveMetricCount(value) {
  localStorage.setItem(METRIC_STORAGE_KEY, String(value));
}

function updateRequestMetric(dom) {
  const next = loadMetricCount() + 1;
  saveMetricCount(next);
  setMetric(dom, "metricApiRequests", next);
}

function updateOverviewMetrics(dom, path, data) {
  if (!path || !path.startsWith("/api/")) {
    return;
  }

  updateRequestMetric(dom);

  if (path.startsWith("/api/admin/dashboard") && data && data.overviewMetrics) {
    const totalUsers = data.overviewMetrics.totalCustomers ?? 0;
    const totalProperties = data.overviewMetrics.listedProperties ?? 0;
    const totalFavorites = data.overviewMetrics.totalFavorites ?? data.overviewMetrics.favorites ?? 0;
    const activeChats = data.overviewMetrics.activeChats ?? data.overviewMetrics.totalChats ?? 0;

    setMetric(dom, "metricTotalUsers", totalUsers);
    setMetric(dom, "metricTotalProperties", totalProperties);
    setMetric(dom, "adminMetricUsers", totalUsers);
    setMetric(dom, "adminMetricProperties", totalProperties);
    setMetric(dom, "adminMetricFavorites", totalFavorites);
    setMetric(dom, "adminMetricChats", activeChats);
  }

  if (path === "/api/users/favorites/my-list" && Array.isArray(data)) {
    setMetric(dom, "metricFavorites", data.length);
  }

  if (path === "/api/properties" && Array.isArray(data)) {
    setMetric(dom, "metricTotalProperties", data.length);
  }
}

export function createApiClient(dom) {
  function apiUrl(path) {
    const rawBaseUrl = String(dom.baseUrl?.value ?? window.location.origin).trim() || window.location.origin;
    const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, "");

    if (
      window.location.protocol === "https:" &&
      normalizedBaseUrl.startsWith("http://") &&
      normalizedBaseUrl.slice("http://".length).split("/")[0] === window.location.host
    ) {
      return window.location.origin.replace(/\/$/, "") + path;
    }

    return normalizedBaseUrl + path;
  }

  function headers(authRequired = false, isFormData = false) {
    const requestHeaders = {};
    const token = String(dom.token?.value ?? "").trim();

    if (!isFormData) {
      requestHeaders["Content-Type"] = "application/json";
    }

    if (authRequired && token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    return requestHeaders;
  }

  function renderResponse(data, status, path = "") {
    const jsonString = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    dom.response.innerHTML = escapeJsonSnippet(jsonString || "{}");
    setResponseStatus(dom, status);
    updateOverviewMetrics(dom, path, data);
  }

  function clearResponse() {
    dom.response.innerHTML = '<span class="response-placeholder">Response will appear here...</span>';
    dom.responseStatusBadge.className = "soft-badge method-get";
    dom.responseStatusBadge.innerHTML = '<i class="bi bi-info-circle"></i>Status —';
  }

  async function copyResponse() {
    await navigator.clipboard.writeText(dom.response.innerText);
    alert("Response copied to clipboard");
  }

  async function sendRequest(path, method, body, { authRequired = false, isFormData = false } = {}) {
    try {
      const options = { method, headers: headers(authRequired, isFormData) };

      if (body) {
        options.body = isFormData ? body : JSON.stringify(body);
      }

      const response = await fetch(apiUrl(path), options);
      const responseText = await response.text();
      let data;

      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (_error) {
        data = { raw: responseText };
      }

      renderResponse(data, response.status, path);
      return { status: response.status, data };
    } catch (error) {
      const payload = normalizeError(error, "Unable to complete the API request");
      renderResponse(payload, 0, path);
      return { status: 0, data: payload, error };
    }
  }

  return {
    apiUrl,
    clearResponse,
    copyResponse,
    renderResponse,
    sendRequest,
    setMetric: (key, value) => setMetric(dom, key, value),
    loadMetricCount,
    saveMetricCount
  };
}
