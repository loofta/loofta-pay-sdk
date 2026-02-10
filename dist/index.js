'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/PayButton.tsx
var DEFAULT_STYLE = {
  background: "linear-gradient(to right, #FF0F00, #EAB308)",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minWidth: "160px",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 4px 14px rgba(255, 15, 0, 0.25)"
};
var HOVER_STYLE = {
  transform: "scale(1.02)",
  boxShadow: "0 6px 20px rgba(255, 15, 0, 0.35)"
};
function LoaderIcon() {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10", strokeOpacity: 0.25 }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "path",
      {
        d: "M12 2a10 10 0 0 1 10 10",
        style: { transformOrigin: "12px 12px" },
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "animateTransform",
          {
            attributeName: "transform",
            type: "rotate",
            from: "0 12 12",
            to: "360 12 12",
            dur: "0.8s",
            repeatCount: "indefinite"
          }
        )
      }
    )
  ] });
}
function CheckIcon() {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "20 6 9 17 4 12" }) });
}
function PayIcon() {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
}
function PayButton({
  organizationId,
  amount,
  buttonBgColor,
  pageBgColor,
  bgColor,
  callbackUrl,
  onSuccess,
  buttonText = "Pay with Loofta",
  successText = "Paid Successfully",
  className,
  openMode = "popup",
  disabled = false,
  checkoutBaseUrl
}) {
  const [loading, setLoading] = react.useState(false);
  const [paid, setPaid] = react.useState(false);
  const [isHovered, setIsHovered] = react.useState(false);
  const effectiveButtonBgColor = buttonBgColor || bgColor;
  const getCheckoutUrl = react.useCallback(() => {
    const defaultBase = "https://pay.loofta.com";
    const base = checkoutBaseUrl != null && checkoutBaseUrl !== "" ? checkoutBaseUrl.replace(/\/$/, "") : defaultBase;
    const path = base.endsWith("/checkout") ? base : `${base}/checkout`;
    const params = new URLSearchParams();
    params.set("organizationId", organizationId);
    if (amount) params.set("amount", String(amount));
    if (pageBgColor) params.set("bgColor", encodeURIComponent(pageBgColor));
    const effectiveCallback = callbackUrl ?? (typeof window !== "undefined" ? window.location.href : "");
    if (effectiveCallback) params.set("callback", encodeURIComponent(effectiveCallback));
    return `${path}?${params.toString()}`;
  }, [checkoutBaseUrl, organizationId, amount, pageBgColor, callbackUrl]);
  const handleClick = react.useCallback(() => {
    if (disabled || loading || paid) return;
    setLoading(true);
    const url = getCheckoutUrl();
    if (openMode === "redirect") {
      window.location.href = url;
      return;
    }
    if (openMode === "tab") {
      window.open(url, "_blank", "noopener,noreferrer");
      setLoading(false);
      return;
    }
    const width = 500;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      url,
      "loofta-pay-checkout",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
    const handleMessage = (event) => {
      if (event.data?.type === "loofta-payment-success") {
        setLoading(false);
        setPaid(true);
        onSuccess?.(event.data.paymentId);
        popup?.close();
        window.removeEventListener("message", handleMessage);
      }
    };
    window.addEventListener("message", handleMessage);
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        setLoading(false);
        window.removeEventListener("message", handleMessage);
      }
    }, 500);
  }, [disabled, loading, paid, getCheckoutUrl, openMode, onSuccess]);
  const successStyle = {
    ...DEFAULT_STYLE,
    background: "linear-gradient(to right, #10B981, #059669)",
    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.25)",
    cursor: "default"
  };
  const buttonStyle = {
    ...DEFAULT_STYLE,
    ...effectiveButtonBgColor ? { background: effectiveButtonBgColor } : {},
    ...isHovered && !disabled && !paid ? HOVER_STYLE : {},
    ...disabled ? { opacity: 0.6, cursor: "not-allowed" } : {}
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick: handleClick,
      disabled: disabled || loading || paid,
      className,
      style: className ? void 0 : paid ? successStyle : buttonStyle,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: paid ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CheckIcon, {}),
        successText
      ] }) : loading ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(LoaderIcon, {}),
        "Processing..."
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(PayIcon, {}),
        buttonText
      ] })
    }
  );
}
function generateEmbedCode(props) {
  const { organizationId, amount, buttonBgColor, pageBgColor, callbackUrl, buttonText, checkoutBaseUrl } = props;
  const propsStr = [
    `organizationId="${organizationId || "your-org-id"}"`,
    amount ? `amount={${amount}}` : null,
    buttonBgColor ? `buttonBgColor="${buttonBgColor}"` : null,
    pageBgColor ? `pageBgColor="${pageBgColor}"` : null,
    callbackUrl ? `callbackUrl="${callbackUrl}"` : null,
    buttonText ? `buttonText="${buttonText}"` : null,
    checkoutBaseUrl ? `checkoutBaseUrl="${checkoutBaseUrl}"` : null
  ].filter(Boolean).join("\n  ");
  return `import { PayButton } from '@loofta/pay-sdk';

<PayButton
  ${propsStr}
  onSuccess={(paymentId) => {
    console.log('Payment completed:', paymentId);
  }}
/>`;
}
function generateScriptEmbed(props) {
  const { organizationId, amount, buttonBgColor, pageBgColor, callbackUrl, buttonText, checkoutBaseUrl } = props;
  const base = checkoutBaseUrl || "https://pay.loofta.xyz";
  return `<!-- Loofta Pay Button -->
<script src="${base}/sdk/loofta-pay.js"></script>
<div 
  id="loofta-pay-button"
  data-organization-id="${organizationId || "your-org-id"}"
  data-checkout-base-url="${base}"
  ${amount ? `data-amount="${amount}"` : ""}
  ${buttonBgColor ? `data-button-bg-color="${buttonBgColor}"` : ""}
  ${pageBgColor ? `data-page-bg-color="${pageBgColor}"` : ""}
  ${buttonText ? `data-button-text="${buttonText}"` : ""}
  ${callbackUrl ? `data-callback="${callbackUrl}"` : ""}
></div>
<script>
  LooftaPay.mount('#loofta-pay-button');
</script>`;
}

exports.PayButton = PayButton;
exports.generateEmbedCode = generateEmbedCode;
exports.generateScriptEmbed = generateScriptEmbed;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map