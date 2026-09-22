interface Props {
  onSubscribe: (tier: string) => void
  onClose: () => void
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9',
    period: '/mo',
    features: [
      'Money flow on all markets',
      'Sportsbook outcome analysis',
      '3 platforms: Kalshi, Polymarket, PrizePicks',
      'Daily email digest',
    ],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/mo',
    features: [
      'Everything in Basic',
      'Real-time alerts on sharp money moves',
      'Historical edge data',
      'Line movement tracker',
      'API access',
    ],
    highlight: true,
  },
]

export function SubscribeModal({ onSubscribe, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white text-2xl font-bold">Unlock Edge Intelligence</h2>
            <p className="text-slate-400 text-sm mt-1">See where the money really goes on Kalshi, Polymarket & PrizePicks</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xl leading-none">✕</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl p-5 border ${plan.highlight
                ? 'border-indigo-500 bg-indigo-950/40'
                : 'border-slate-700 bg-slate-800'
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">Most Popular</div>
              )}
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-400 mb-0.5">{plan.period}</span>
              </div>
              <div className="font-semibold text-white mb-3">{plan.name}</div>
              <ul className="space-y-2 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSubscribe(plan.id)}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${plan.highlight
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                Get {plan.name}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          Cancel anytime · No credit card required for free preview
        </p>
      </div>
    </div>
  )
}
