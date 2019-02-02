function getRankNum (rank, adj) {
  switch (rank) {
    case 'A':
      if (adj === '2') return 1
    case 'K':
    case 'Q':
    case 'J':
      return 10
    default:
      return parseInt(rank)
  }
}

function getCards ({players, in_action}) {
  const hole_cards = players[in_action].hole_cards
  return [hole_cards[0], hole_cards[1]]
}

function isPair (state) {
  const cards = getCards(state)
  return cards[0].rank === cards[1].rank
}

function isSameSuit (state) {
  const cards = getCards(state)
  return cards[0].suit === cards[1].suit
}

function isHighCard (state) {
  const cards = getCards(state)
  return getRankNum(cards[0].rank) >= 10 || getRankNum(cards[1].rank) >= 10 
}

module.exports = {isPair, isSameSuit, isHighCard, getRankNum, getCards}