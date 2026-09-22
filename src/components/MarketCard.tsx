import { useState } from 'react'
import type { BetMarket } from '../types'
import { MoneyFlowBar } from './MoneyFlowBar'
import { BookOutcomePanel } from './BookOutcomePanel'
import { analyzeBookOutcome } from '../utils/bookAnalysis'

interface Props {
  market: BetMarket
  locked: boolean
}

const platformColors: Record<string, string> = {
  Kalshi: 'bg-blue-600 text-white',
  Polymarket: 'bg-purple-600 text-white',
  PrizePicks: 'bg-orange-500 text-white',
}

const platformIcons: Record<string, string> = {
  Kalshi: '🏛️',
  Polymarket: '🔮',
  PrizePicks: '🏆',
}

const outcomeStyles: Record<string, string> = {
  yes: 'bg-emerald-700 text-emerald-100',
  no: 'bg-red-700 text-red-100',
  pending: 'bg-slate-600 text-slate-300',
}

export function MarketCard({ market, locked }: Props) {
  const [expanded, setExpanded] = useState(false)
  const analyses = analyzeBookOutcome(market)

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 hover:border-slate-500 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${platformColors[market.platform]}`}>
              {platformIcons[market.platform]} {market.platform}
            </span>
            <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">
              {market.sport}
            </span>
            {market.outcome !== 'pending' && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${outcomeStyles[market.outcome]}`}>
                Settled: {market.outcome}
              </span>
            )}
          </div>
          <h3 className="text-white font-semibold text-sm leading-snug">{market.title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Closes {new Date(market.closeTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {locked ? (
        <div className="bg-slate-700/50 rounded-lg p-4 text-center border border-dashed border-slate-600">
          <div className="text-2xl mb-1">🔒</div>
          <p className="text-slate-400 text-xs">Subscribe to see money flow & sportsbook analysis</p>
        </div>
      ) : (
        <>
          <MoneyFlowBar market={market} />

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 w-full text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 py-1 rounded hover:bg-slate-700 transition-colors"
          >
            {expanded ? '▲ Hide' : '▼ Show'} sportsbook outcome analysis
          </button>

          {expanded && <BookOutcomePanel analyses={analyses} />}
        </>
      )}
    </div>
  )
}
