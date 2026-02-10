# Loofta Pay Button – Example

Minimal app to test the `@loofta/pay-sdk` PayButton locally.

## Run

From the **loofta-swap repo root**:

```bash
npm install
npm run build --workspace=@loofta/pay-sdk
npm run dev --workspace=pay-button-demo
```

Then open [http://localhost:5174](http://localhost:5174).

Or from this folder:

```bash
cd examples/pay-button-demo
npm install
npm run dev
```

## What it does

- Renders a **PayButton** with configurable `organizationId`, `amount`, and `buttonText`.
- On success, shows the payment ID and logs to the console.
- The button opens Loofta’s hosted checkout (default URL). You need an organization set up with Loofta; use `demo` if you have it configured.
