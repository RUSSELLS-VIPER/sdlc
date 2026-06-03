import {
  createActionButton,
  createEndpointCard,
  createField,
  createLazyAccordionItem,
  createSectionHeader,
  readPayloadFromMap
} from "./shared.js";

function registerBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/auth/register",
    description: "Create a new account.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "regName", label: "Name", value: "Test User" })}
        ${createField({ id: "regEmail", label: "Email", value: "test@example.com", type: "email" })}
        ${createField({ id: "regPassword", label: "Password", value: "123456", type: "password" })}
        ${createField({
          id: "regRole",
          label: "Role",
          control: "select",
          value: "user",
          options: [
            { value: "user", label: "user" },
            { value: "agent", label: "agent" },
            { value: "admin", label: "admin" }
          ]
        })}
        ${createActionButton({ action: "auth.register", label: "Execute Request", variant: "primary" })}
      </div>
    `
  });
}

function verifyBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/auth/verify-email",
    description: "Verify OTP received by email.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "verifyEmail", label: "Email", value: "test@example.com", type: "email" })}
        ${createField({ id: "verifyOtp", label: "OTP", placeholder: "Enter OTP from email" })}
        ${createActionButton({ action: "auth.verify-email", label: "Execute Request", variant: "primary" })}
      </div>
    `
  });
}

function loginBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/auth/login",
    description: "Authenticate and persist the token.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "loginEmail", label: "Email", value: "test@example.com", type: "email" })}
        ${createField({ id: "loginPassword", label: "Password", value: "123456", type: "password" })}
        ${createActionButton({ action: "auth.login", label: "Execute Request", variant: "primary" })}
      </div>
    `
  });
}

function forgotPasswordBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/auth/forgot-password",
    description: "Request a password reset OTP.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "forgotPasswordEmail", label: "Email", value: "test@example.com", type: "email" })}
        ${createActionButton({ action: "auth.forgot-password", label: "Execute Request", variant: "primary" })}
      </div>
    `
  });
}

function resetPasswordBody() {
  return createEndpointCard({
    method: "POST",
    path: "POST /api/auth/reset-password",
    description: "Reset a password using email, OTP, and a new password.",
    bodyHtml: `
      <div class="input-stack">
        ${createField({ id: "resetPasswordEmail", label: "Email", value: "test@example.com", type: "email" })}
        ${createField({ id: "resetPasswordOtp", label: "OTP", placeholder: "Enter OTP from email" })}
        ${createField({ id: "resetPasswordNewPassword", label: "New Password", value: "123456", type: "password" })}
        ${createActionButton({ action: "auth.reset-password", label: "Execute Request", variant: "primary" })}
      </div>
    `
  });
}

export function renderAuthSection() {
  return `
    ${createSectionHeader({
      title: "Authentication",
      subtitle: "Register, verify, login, and password recovery flows are kept intact but loaded only when needed.",
      badge: "Auth endpoints",
      icon: "shield-check"
    })}
    <div class="accordion endpoint-accordion" id="authAccordion">
      ${createLazyAccordionItem({
        itemId: "auth-register",
        bodyId: "auth-register-body",
        method: "POST",
        title: "POST /api/auth/register",
        description: "Create a new account."
      })}
      ${createLazyAccordionItem({
        itemId: "auth-verify",
        bodyId: "auth-verify-body",
        method: "POST",
        title: "POST /api/auth/verify-email",
        description: "Verify OTP received by email."
      })}
      ${createLazyAccordionItem({
        itemId: "auth-login",
        bodyId: "auth-login-body",
        method: "POST",
        title: "POST /api/auth/login",
        description: "Authenticate and persist the token."
      })}
      ${createLazyAccordionItem({
        itemId: "auth-forgot-password",
        bodyId: "auth-forgot-password-body",
        method: "POST",
        title: "POST /api/auth/forgot-password",
        description: "Request a password reset OTP."
      })}
      ${createLazyAccordionItem({
        itemId: "auth-reset-password",
        bodyId: "auth-reset-password-body",
        method: "POST",
        title: "POST /api/auth/reset-password",
        description: "Reset a password using email, OTP, and a new password."
      })}
    </div>
  `;
}

export function getAuthLazyBodies() {
  return {
    "auth-register-body": registerBody,
    "auth-verify-body": verifyBody,
    "auth-login-body": loginBody,
    "auth-forgot-password-body": forgotPasswordBody,
    "auth-reset-password-body": resetPasswordBody
  };
}

export function getAuthActions(state, api) {
  return {
    "auth.save-token": async () => {
      const token = String(state.dom.token?.value ?? "").trim();
      const currentUserId = String(state.dom.currentUserId?.value ?? "").trim();
      localStorage.setItem("api_tester_token", token);
      localStorage.setItem("api_tester_user_id", currentUserId);
      api.renderResponse({ message: "Token saved in localStorage" }, 200, "saveToken");
    },
    "auth.clear-token": async () => {
      state.dom.token.value = "";
      state.dom.currentUserId.value = "";
      localStorage.removeItem("api_tester_token");
      localStorage.removeItem("api_tester_user_id");
      api.renderResponse({ message: "Token cleared" }, 200, "clearToken");
    },
    "auth.register": async () => {
      await api.sendRequest("/api/auth/register", "POST", readPayloadFromMap(state.dom, [
        { key: "name", id: "regName" },
        { key: "email", id: "regEmail" },
        { key: "password", id: "regPassword" },
        { key: "role", id: "regRole" }
      ]));
    },
    "auth.verify-email": async () => {
      await api.sendRequest("/api/auth/verify-email", "POST", readPayloadFromMap(state.dom, [
        { key: "email", id: "verifyEmail" },
        { key: "otp", id: "verifyOtp" }
      ]));
    },
    "auth.login": async () => {
      const result = await api.sendRequest("/api/auth/login", "POST", readPayloadFromMap(state.dom, [
        { key: "email", id: "loginEmail" },
        { key: "password", id: "loginPassword" }
      ]));

      if (result.status === 200 && result.data && result.data.token) {
        state.dom.token.value = result.data.token;
        localStorage.setItem("api_tester_token", result.data.token);

        if (result.data.user && result.data.user.id) {
          state.dom.currentUserId.value = result.data.user.id;
          localStorage.setItem("api_tester_user_id", result.data.user.id);
        }
      }
    },
    "auth.forgot-password": async () => {
      await api.sendRequest("/api/auth/forgot-password", "POST", readPayloadFromMap(state.dom, [
        { key: "email", id: "forgotPasswordEmail" }
      ]));
    },
    "auth.reset-password": async () => {
      await api.sendRequest("/api/auth/reset-password", "POST", readPayloadFromMap(state.dom, [
        { key: "email", id: "resetPasswordEmail" },
        { key: "otp", id: "resetPasswordOtp" },
        { key: "newPassword", id: "resetPasswordNewPassword" }
      ]));
    }
  };
}
