import { calculateEquity } from 'poker-odds'

const mapCardToVendor = (card) => {
  return `${card.rank}${card.suits.charAt(0)}`
}

const getChances = (cards, community_cards) => {
  const hand = cards.map(c => mapCardToVendor(c))
  const board = community_cards.map(c => mapCardToVendor(c))

  const [{count: allCases, handChances}] = calculateEquity([hand], board)

  handChances.map(hc => {
    return {
      name: hc.name,
      probability: hc.count / allCases
    }
  })

  return handChances
}

const isWorthIt = (handChances) => {
  return !handChances.filter(c => c.probability >= 0.2).length
}

module.exports = { getChances, isWorthIt }
