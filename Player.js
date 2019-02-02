class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    try {
      const me = gameState.players[gameState.in_action]
      const riskValue = parseInt(me.stack * 0.1, 10)
      console.log('@@@', me.stack, riskValue, gameState.minimum_raise);
      const betValue = gameState.minimum_raise <= riskValue ? gameState.minimum_raise : 0
      console.log('@@@ betValue', betValue);
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
