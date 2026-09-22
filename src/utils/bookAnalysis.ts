import type { BetMarket, BookOutcomeAnalysis } from '../types'

export function analyzeBookOutcome(market: BetMarket): BookOutcomeAnalysis[] {
  const { yesVolume, noVolume, totalVolume, vig } = market
  const vigPool = totalVolume * vig  // what the book keeps regardless

  // YES wins scenario
  const yesPublicPct = yesVolume / totalVolume
  // If majority is on YES and YES wins → book pays out more on popular side
  // Book collects vig, so they still tend to profit but edge shrinks if public is right
  const yesBookEdge = vigPool - (yesPublicPct > 0.6 ? yesVolume * 0.02 : 0)

  // NO wins scenario
  const noPublicPct = noVolume / totalVolume
  const noBookEdge = vigPool - (noPublicPct > 0.6 ? noVolume * 0.02 : 0)

  const fmt = (n: number) => Math.round(n)

  return [
    {
      scenario: 'YES wins',
      publicMoneyPct: Math.round(yesPublicPct * 100),
      bookmakersResult:
        yesPublicPct > 0.65 ? 'loss' : yesPublicPct > 0.55 ? 'breakeven' : 'profit',
      edgeUSD: fmt(yesBookEdge),
      explanation:
        yesPublicPct > 0.65
          ? `${Math.round(yesPublicPct * 100)}% of money is on YES. If YES hits the book faces a large payout and may lose.`
          : yesPublicPct > 0.55
          ? `Money is slightly favoring YES (${Math.round(yesPublicPct * 100)}%). Book near breakeven if YES wins.`
          : `Only ${Math.round(yesPublicPct * 100)}% on YES. Book profits from larger NO pool if YES wins.`,
    },
    {
      scenario: 'NO wins',
      publicMoneyPct: Math.round(noPublicPct * 100),
      bookmakersResult:
        noPublicPct > 0.65 ? 'loss' : noPublicPct > 0.55 ? 'breakeven' : 'profit',
      edgeUSD: fmt(noBookEdge),
      explanation:
        noPublicPct > 0.65
          ? `${Math.round(noPublicPct * 100)}% of money is on NO. If NO hits the book faces a large payout and may lose.`
          : noPublicPct > 0.55
          ? `Money slightly favors NO (${Math.round(noPublicPct * 100)}%). Book near breakeven if NO wins.`
          : `Only ${Math.round(noPublicPct * 100)}% on NO. Book profits from larger YES pool if NO wins.`,
    },
  ]
}

export function formatVolume(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}
