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
  return players[in_action].hole_cards
}

function isPair (state) {
  const cards = getCards(state)
  return cards[0].rank === cards[1].rank
}

function isSameSuit (state) {
  const cards = getCards(state)
  return cards[0].suit === cards[1].suit
}

module.exports = {isPair, isSameSuit, getRankNum, getCards}