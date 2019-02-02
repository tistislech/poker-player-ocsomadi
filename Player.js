const {isPair, isSameSuit, getRankNum, getCards} = require('./SecretSauce.js')

class Player {
  static get VERSION() {
    return '0.24';
  }

  static betRequest(gameState, bet) {
    try {
      const me = gameState.players[gameState.in_action]
      const riskValue = parseInt(me.stack * 0.1, 10)
      const value = gameState.minimum_raise || gameState.current_buy_in
      const betValue = value <= riskValue ? value : 0
      console.log('@@@ gameState', JSON.stringify(gameState));
      console.log('@@@card ranks', isPair(gameState), isSameSuit(gameState))
      const cards = getCards(gameState)
      console.log('@@@cards numrank', getRankNum(cards[0].rank, cards[1].rank), getRankNum(cards[1].rank, cards[2].rank))
      console.log(
        '@@@', gameState.game_id,
        'stack',  me.stack,
        'riskValue', riskValue,
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
