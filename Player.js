const {isPair, isSameSuit, getRankNum, getCards, isHighCard} = require('./SecretSauce.js')
const {getChances, isWorthIt} = require('./Odds')

class Player {
  static get VERSION() {
    return '0.40';
  }

  static betRequest(gameState, bet) {
    try {
      const me = gameState.players[gameState.in_action]
      // console.log('@@@ gameState', JSON.stringify(gameState));
      // console.log('@@@card ranks', isPair(gameState), isSameSuit(gameState))
      const value = gameState.minimum_raise || gameState.current_buy_in
      const isLowRiskValue = value <= parseInt(me.stack * 0.1, 10)
      const isHighRiskValue = value >= parseInt(me.stack * 0.5, 10)
      let betValue = 0
      const isPreFlop = gameState.community_cards.length === 0
      const isGood = isPair(gameState) || isSameSuit(gameState) || isHighCard(gameState)
      // console.log('@@@cards numrank', getRankNum(cards[0].rank, cards[1].rank), getRankNum(cards[1].rank, cards[0].rank))

      if (isPreFlop) {
        if (isGood/*&& !isHighRiskValue*/) {
          betValue = value * 1.20
        } else {
          betValue = 0
        }
      } else {
        try {
          const handChances = getChances(getCards(gameState), gameState.community_cards)
          const is = isWorthIt(handChances)
          if (is) {
            betValue = value * 1.20
          } else {
            betValue = 0
          }
        } catch (e) {
          betValue = value * 1.20
        }
        // console.log('handChances', handChances, 'is', is)
      }

      betValue = parseInt(betValue, 10)
      console.log('gameState', JSON.stringify(gameState))
      console.log(
        '@@@', gameState.game_id,
        'isGood', isGood,
        'version', this.VERSION,
        'stack',  me.stack,
        'isHighRiskValue', isHighRiskValue,
        'isLowRiskValue', isLowRiskValue,
        'minRaise', gameState.minimum_raise,
        'buyIn', gameState.current_buy_in,
        'value', value,
        'betValue', betValue
      );

      bet(betValue);
    } catch (e) {
      console.log('@@@error', e)
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
