/**
 * @loofta/pay-sdk
 *
 * Embeddable Pay Button that opens Loofta's hosted checkout. Destination wallet, network, and token are set in your organization. Requires an organization ID from Loofta.
 *
 * @example
 * ```tsx
 * import { PayButton } from '@loofta/pay-sdk';
 *
 * <PayButton
 *   organizationId="your-org-id"
 *   amount={100}
 *   onSuccess={(id) => console.log('Paid:', id)}
 * />
 * ```
 */

export {
  PayButton,
  generateEmbedCode,
  generateScriptEmbed,
  type PayButtonProps,
} from './PayButton';
