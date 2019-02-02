class Player {
  static get VERSION() {
    return '0.22';
  }

  static betRequest(gameState, bet) {
    try {
      const me = gameState.players[gameState.in_action]
      const riskValue = parseInt(me.stack * 0.1, 10)
      const value = gameState.minimum_raise || gameState.current_buy_in
      console.log(
        '@@@', gameState.game_id,
        'stack',  me.stack,
        'riskValue', riskValue,
        'minRaise', gameState.minimum_raise,
        'buyIn', gameState.current_buy_in,
        'value', value
      );
      const betValue = value <= riskValue ? value : 0
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
