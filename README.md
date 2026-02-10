# @loofta/pay-sdk

Embeddable **Loofta Pay Button** for React.

- **Repository:** [github.com/loofta/loofta-pay-sdk](https://github.com/loofta/loofta-pay-sdk)
- **Examples:** [examples/pay-button-demo](https://github.com/loofta/loofta-pay-sdk/tree/master/examples/pay-button-demo)
- **Live demo:** [pay.loofta.xyz/b2b/demo](https://pay.loofta.xyz/b2b/demo) The button opens **Loofta’s hosted checkout** — your customers pay there, and funds go to the destination wallet, network, and token configured in your organization.

## Requirements

- **Organization ID** — You must have an organization set up with Loofta. Your **destination wallet address**, **network**, and **token** are configured in that organization.
- **Don’t have an organization ID?** [Contact Loofta](https://t.me/looftaxyz) to get one.

## Install

```bash
npm install @loofta/pay-sdk
# or
yarn add @loofta/pay-sdk
pnpm add @loofta/pay-sdk
```

## Usage

### React

```tsx
import { PayButton } from '@loofta/pay-sdk';

<PayButton
  organizationId="your-org-id"
  amount={100}
  buttonText="Pay $100"
  onSuccess={(paymentId) => {
    console.log('Payment completed:', paymentId);
  }}
/>
```

You usually **don’t** need `checkoutBaseUrl`. The button opens Loofta’s checkout; if your app is on a different domain, the default URL is used. Only set `checkoutBaseUrl` if Loofta has given you a specific checkout URL.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `organizationId` | `string` | **Required.** Your Loofta organization ID. Destination wallet, network, and token are set in your organization. Don’t have one? Contact Loofta. |
| `amount` | `number \| string` | Optional payment amount (USD). |
| `checkoutBaseUrl` | `string` | Optional. URL of the Loofta Pay checkout page. Only set if the button is on a different domain and you need to point to a specific Loofta checkout URL; otherwise omit. |
| `buttonBgColor` | `string` | Optional button background (CSS color). |
| `pageBgColor` | `string` | Optional checkout page background. |
| `callbackUrl` | `string` | Optional URL to redirect after payment. |
| `onSuccess` | `(paymentId: string) => void` | Called when payment completes (popup mode). |
| `buttonText` | `string` | Button label (default: "Pay with Loofta"). |
| `successText` | `string` | Text after success (default: "Paid Successfully"). |
| `openMode` | `'popup' \| 'redirect' \| 'tab'` | How to open checkout (default: `popup`). |
| `disabled` | `boolean` | Disable the button. |
| `className` | `string` | Optional CSS class. |

### How it works

1. User clicks the button on your site.
2. Loofta’s hosted checkout opens (popup, new tab, or redirect).
3. User pays with the token/network they choose; funds are sent to **your organization’s configured destination wallet, network, and token**.
4. You get the outcome via `onSuccess` and/or `callbackUrl`.

### Embed code helpers

```tsx
import { generateEmbedCode, generateScriptEmbed } from '@loofta/pay-sdk';

const reactSnippet = generateEmbedCode({
  organizationId: 'your-org-id',
  amount: 100,
});

const scriptSnippet = generateScriptEmbed({
  organizationId: 'your-org-id',
  amount: 100,
});
```

## Build

```bash
cd packages/loofta-pay-sdk
npm install
npm run build
```

Output: `dist/` (ESM, CJS, and types).

## Publish to npm

1. **Build the package**
   ```bash
   cd packages/loofta-pay-sdk
   npm install
   npm run build
   ```

2. **Log in to npm** (create an account at [npmjs.com](https://www.npmjs.com) if needed)
   ```bash
   npm login
   ```
   Enter your npm username, password, and email when prompted.

3. **Publish**
   ```bash
   npm publish
   ```
   Scoped packages like `@loofta/pay-sdk` use `publishConfig.access: "public"` in package.json, so you don’t need `--access public` each time.

4. **Later releases**: bump `version` in `package.json`, run `npm run build`, then `npm publish` again.

## License

MIT
