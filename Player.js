const {isPair, isSameSuit, getRankNum, getCards, isHighCard} = require('./SecretSauce.js')
const {getChances, isWorthIt} = require('./Odds')

class Player {
  static get VERSION() {
    return '0.50';
  }

  static betRequest(gameState, bet) {
    try {
      const me = gameState.players[gameState.in_action]
      // console.log('@@@ gameState', JSON.stringify(gameState));
      // console.log('@@@card ranks', isPair(gameState), isSameSuit(gameState))
      const value = gameState.minimum_raise || gameState.current_buy_in
      const isLowRiskValue = value <= Math.ceil(me.stack * 0.1)
      const isHighRiskValue = value >= Math.ceil(me.stack * 0.7)
      let betValue = 0
      const isPreFlop = gameState.community_cards.length === 0
      const isGood = isPair(gameState) || isSameSuit(gameState) || isHighCard(gameState)
      // console.log('@@@cards numrank', getRankNum(cards[0].rank, cards[1].rank), getRankNum(cards[1].rank, cards[0].rank))
      // const handChances = getChances(getCards(gameState), gameState.community_cards)
      if (isPreFlop) {
        if (isGood/*&& !isHighRiskValue*/) {
          betValue = value * 1.20 + (gameState.small_blind * 2)
        } else if (!isHighRiskValue) {
          betValue = value + (gameState.small_blind * 2)
        }
      } else {
        try {
          const handChances = getChances(getCards(gameState), gameState.community_cards)
          const is = isWorthIt(handChances, isHighRiskValue)
          if (is) {
            betValue = value * 1.20
          } else {
            betValue = 0
          }
        } catch (e) {
          console.log('eeee', e)
          betValue = value * 1.20
        }
        // console.log('handChances', handChances, 'is', is)
      }

      betValue = Math.ceil(betValue)
      // console.log('gameState', JSON.stringify(gameState))
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
