class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    console.log(JSON.stringify(gameState));
    bet(0);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
