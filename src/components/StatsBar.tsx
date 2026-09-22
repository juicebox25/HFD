import type { BetMarket, Platform } from '../types'
import { formatVolume } from '../utils/bookAnalysis'

interface Props {
  markets: BetMarket[]
  filter: Platform | 'All'
}

export function StatsBar({ markets, filter }: Props) {
  const filtered = filter === 'All' ? markets : markets.filter((m) => m.platform === filter)
  const total = filtered.reduce((s, m) => s + m.totalVolume, 0)
  const settled = filtered.filter((m) => m.outcome !== 'pending').length

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: 'Total Volume', value: formatVolume(total), icon: '💰' },
        { label: 'Active Markets', value: filtered.length - settled, icon: '🟢' },
        { label: 'Settled Today', value: settled, icon: '✅' },
      ].map((s) => (
        <div key={s.label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl mb-1">{s.icon}</div>
          <div className="text-white font-bold text-lg">{s.value}</div>
          <div className="text-slate-400 text-xs">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
