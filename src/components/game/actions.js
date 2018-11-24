import scores from './../scores/scores';

var actions = {
  collectBulbo(player, bulbo) {
    scores.collectBulbo();
    bulbo.destroy();
  },

  collectProkopenia(player, bonus) {
    scores.collectProkopenia();
    bonus.destroy();
  },

  collectSoloduha(player, bonus) {
    scores.collectSoloduha();
    bonus.destroy();
  },

  jump() {
    context.tweens.add({
      targets: player,
      y: 400,
      duration: 450,
      ease: function (t) {
          return Math.pow(Math.sin(t * 3), 3);
      }
  });
  }
}

export default actions;