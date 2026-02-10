import * as react_jsx_runtime from 'react/jsx-runtime';

interface PayButtonProps {
    /**
     * Organization ID (required). Must be set up with Loofta — your destination wallet, network, and token are configured in your organization.
     * If you don't have an organization ID, contact Loofta to get one.
     */
    organizationId: string;
    /** Payment amount in USD (optional) */
    amount?: number | string;
    /** Button background color (optional) */
    buttonBgColor?: string;
    /** Checkout page background color (optional - falls back to org settings) */
    pageBgColor?: string;
    /** @deprecated Use buttonBgColor instead */
    bgColor?: string;
    /** Callback URL after payment (optional) */
    callbackUrl?: string;
    /** Callback function after payment (optional) */
    onSuccess?: (paymentId: string) => void;
    /** Button text (optional) */
    buttonText?: string;
    /** Success text shown after payment (optional) */
    successText?: string;
    /** Custom className for button styling */
    className?: string;
    /** Open checkout in new tab vs popup (default: popup) */
    openMode?: 'popup' | 'redirect' | 'tab';
    /** Disable button */
    disabled?: boolean;
    /**
     * Base URL of the Loofta Pay hosted checkout page. Checkout is always Loofta's — this is only needed if the button is embedded on a different domain than the default Loofta Pay app. Usually omit; default is used.
     */
    checkoutBaseUrl?: string;
}
/**
 * Loofta Pay Button – opens your Loofta Pay checkout (same API as your app).
 */
declare function PayButton({ organizationId, amount, buttonBgColor, pageBgColor, bgColor, callbackUrl, onSuccess, buttonText, successText, className, openMode, disabled, checkoutBaseUrl, }: PayButtonProps): react_jsx_runtime.JSX.Element;
declare function generateEmbedCode(props: Partial<PayButtonProps>): string;
declare function generateScriptEmbed(props: Partial<PayButtonProps>): string;

export { PayButton, type PayButtonProps, generateEmbedCode, generateScriptEmbed };
