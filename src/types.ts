export type Platform = 'Kalshi' | 'Polymarket' | 'PrizePicks'
export type BetOutcome = 'yes' | 'no' | 'pending'
export type BookResult = 'profit' | 'loss' | 'breakeven'

export interface BetMarket {
  id: string
  platform: Platform
  title: string
  sport: string
  closeTime: string
  yesOdds: number   // implied probability 0-1
  noOdds: number
  yesVolume: number  // dollars
  noVolume: number
  totalVolume: number
  outcome: BetOutcome
  // sportsbook vigorish / overround (e.g. 0.05 = 5%)
  vig: number
}

export interface BookOutcomeAnalysis {
  scenario: 'YES wins' | 'NO wins'
  publicMoneyPct: number  // % of money on winning side
  bookmakersResult: BookResult
  edgeUSD: number
  explanation: string
}
