import type { BookOutcomeAnalysis } from '../types'
import { formatVolume } from '../utils/bookAnalysis'

interface Props {
  analyses: BookOutcomeAnalysis[]
}

const resultColors: Record<string, string> = {
  profit: 'text-emerald-400 bg-emerald-900/30 border-emerald-700',
  loss: 'text-red-400 bg-red-900/30 border-red-700',
  breakeven: 'text-yellow-400 bg-yellow-900/30 border-yellow-700',
}

const resultLabels: Record<string, string> = {
  profit: '📈 Book Profits',
  loss: '📉 Book Loses',
  breakeven: '⚖️ Breakeven',
}

export function BookOutcomePanel({ analyses }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {analyses.map((a) => (
        <div
          key={a.scenario}
          className={`rounded-lg border p-3 text-xs ${resultColors[a.bookmakersResult]}`}
        >
          <div className="font-bold text-sm mb-1">{a.scenario}</div>
          <div className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${resultColors[a.bookmakersResult]}`}>
            {resultLabels[a.bookmakersResult]}
          </div>
          <p className="text-slate-300 leading-tight">{a.explanation}</p>
          <div className="mt-1 font-mono text-xs">
            Book edge ≈ {formatVolume(a.edgeUSD)}
          </div>
        </div>
      ))}
    </div>
  )
}
