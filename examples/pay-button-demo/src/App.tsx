import { useState } from 'react';
import { PayButton } from '@loofta/pay-sdk';

export default function App() {
  const [organizationId, setOrganizationId] = useState('demo');
  const [amount, setAmount] = useState('100');
  const [buttonText, setButtonText] = useState('Pay with Loofta');
  const [lastPaymentId, setLastPaymentId] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
        Loofta Pay Button – Demo
      </h1>
      <p style={{ color: '#64748b', marginBottom: 24 }}>
        Test the <code>@loofta/pay-sdk</code> PayButton. Click opens Loofta’s hosted checkout.
      </p>

      <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#475569', marginBottom: 16, textTransform: 'uppercase' }}>
          Props
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>organizationId</span>
            <input
              type="text"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              placeholder="e.g. demo"
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>amount (USD)</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 100"
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>buttonText</span>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Pay with Loofta"
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}
            />
          </label>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#475569', marginBottom: 16, textTransform: 'uppercase' }}>
          Button
        </h2>
        <PayButton
          organizationId={organizationId}
          amount={amount ? Number(amount) : undefined}
          buttonText={buttonText || 'Pay with Loofta'}
          onSuccess={(paymentId) => {
            setLastPaymentId(paymentId);
            console.log('Payment completed:', paymentId);
          }}
        />
        {lastPaymentId && (
          <p style={{ marginTop: 16, fontSize: 14, color: '#059669' }}>
            Last payment ID: <code>{lastPaymentId}</code>
          </p>
        )}
      </div>

      <p style={{ fontSize: 13, color: '#94a3b8' }}>
        Requires an organization set up with Loofta. Use <code>demo</code> for testing if configured.
      </p>
    </div>
  );
}
