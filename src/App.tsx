import { useState } from 'react'
import type { Platform } from './types'
import { mockMarkets } from './data/mockMarkets'
import { MarketCard } from './components/MarketCard'
import { SubscribeModal } from './components/SubscribeModal'
import { StatsBar } from './components/StatsBar'

const PLATFORMS: Array<Platform | 'All'> = ['All', 'Kalshi', 'Polymarket', 'PrizePicks']
const SPORTS = ['All', ...Array.from(new Set(mockMarkets.map((m) => m.sport)))]

const platformColors: Record<string, string> = {
  Kalshi: 'border-blue-600 text-blue-400',
  Polymarket: 'border-purple-600 text-purple-400',
  PrizePicks: 'border-orange-500 text-orange-400',
  All: 'border-slate-500 text-slate-300',
}

export default function App() {
  const [subscribed, setSubscribed] = useState(false)
  const [tier, setTier] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [platformFilter, setPlatformFilter] = useState<Platform | 'All'>('All')
  const [sportFilter, setSportFilter] = useState('All')
  const [search, setSearch] = useState('')

  const handleSubscribe = (selectedTier: string) => {
    setTier(selectedTier)
    setSubscribed(true)
    setShowModal(false)
  }

  const filtered = mockMarkets.filter((m) => {
    if (platformFilter !== 'All' && m.platform !== platformFilter) return false
    if (sportFilter !== 'All' && m.sport !== sportFilter) return false
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">EdgeFlow</span>
              <span className="text-slate-500 text-xs ml-2 hidden sm:inline">Betting money flow intelligence</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-700 px-3 py-1 rounded-full font-semibold uppercase">
                  {tier} subscriber
                </span>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero */}
        {!subscribed && (
          <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-800/50 rounded-2xl p-6 mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Where is the smart money going?</h1>
            <p className="text-slate-300 text-sm max-w-xl mb-4">
              EdgeFlow shows you the real money distribution on every Kalshi, Polymarket, and PrizePicks market — and whether the sportsbook profits or loses based on the outcome. Make smarter bets.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Start Free Trial →
              </button>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>✓ Kalshi</span>
                <span>✓ Polymarket</span>
                <span>✓ PrizePicks</span>
              </div>
            </div>
          </div>
        )}

        <StatsBar markets={mockMarkets} filter={platformFilter} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex gap-2 flex-wrap">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  platformFilter === p
                    ? `${platformColors[p]} bg-slate-800`
                    : 'border-slate-700 text-slate-500 hover:text-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Market Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-slate-500 py-16">No markets match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((market, i) => (
              <MarketCard
                key={market.id}
                market={market}
                locked={!subscribed && i >= 2}
              />
            ))}
          </div>
        )}

        {!subscribed && filtered.length > 2 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Unlock all {filtered.length} markets →
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-slate-600 text-xs">
        EdgeFlow · Data is simulated for demo purposes · Not financial advice
      </footer>

      {showModal && (
        <SubscribeModal onSubscribe={handleSubscribe} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
