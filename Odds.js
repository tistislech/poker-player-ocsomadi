const pokerOdds = require('poker-odds')

const mapCardToVendor = (card) => {
  return `${card.rank === '10' ? 'T' : card.rank}${card.suit.charAt(0)}`
}

const getChances = (cards, community_cards) => {
  const hand = cards.map(c => mapCardToVendor(c))
  const board = community_cards.map(c => mapCardToVendor(c))
  console.log('@@@', hand, 'cards', cards, 'community_cards', community_cards)
  const [{count: allCases, handChances}] = pokerOdds.calculateEquity([hand], board)
  let result = handChances.map(hc => {
    return {
      name: hc.name,
      probability: hc.count / allCases
    }
  })
  console.log('@@@odds', hand, board, allCases, 'handChances', result)
  return result
}

const isWorthIt = (handChances) => {
  console.log('@h', handChances)
  console.log('@@@filtered', handChances.filter(c => c.probability >= 0.2))
  return handChances.filter(c => c.probability >= 0.2).length
}

module.exports = { getChances, isWorthIt }
