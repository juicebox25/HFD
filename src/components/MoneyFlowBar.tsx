import type { BetMarket } from '../types'
import { formatVolume } from '../utils/bookAnalysis'

interface Props {
  market: BetMarket
}

export function MoneyFlowBar({ market }: Props) {
  const yesPct = Math.round((market.yesVolume / market.totalVolume) * 100)
  const noPct = 100 - yesPct

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-emerald-400">YES {yesPct}%</span>
        <span className="text-slate-400 text-center">
          Total: {formatVolume(market.totalVolume)}
        </span>
        <span className="text-red-400">NO {noPct}%</span>
      </div>
      <div className="flex h-5 rounded-full overflow-hidden bg-slate-700">
        <div
          className="bg-emerald-500 transition-all duration-500 flex items-center justify-center"
          style={{ width: `${yesPct}%` }}
        >
          {yesPct > 20 && (
            <span className="text-[10px] font-bold text-white">{formatVolume(market.yesVolume)}</span>
          )}
        </div>
        <div
          className="bg-red-500 transition-all duration-500 flex items-center justify-center"
          style={{ width: `${noPct}%` }}
        >
          {noPct > 20 && (
            <span className="text-[10px] font-bold text-white">{formatVolume(market.noVolume)}</span>
          )}
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>Implied: {Math.round(market.yesOdds * 100)}¢</span>
        <span>Vig: {Math.round(market.vig * 100)}%</span>
        <span>Implied: {Math.round(market.noOdds * 100)}¢</span>
      </div>
    </div>
  )
}
