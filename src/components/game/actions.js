import scores from './../scores/scores';

var actions = {
  handleBulbo(player, bulbo) {
    scores.collectBulbo();
    bulbo.destroy();
  },

  handleProkopenia(player, bonus) {
    scores.collectProkopenia();
    bonus.destroy();
    actions.grow();
  },

  handleSoloduha(player, bonus) {
    scores.collectSoloduha();
    bonus.destroy();
    actions.grow();
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
  },

  grow() {
    context.tweens.add({
      targets: player,
      scaleX: '+=.1',
      scaleY: '+=.1',
      duration: 700
   });
  }
}

export default actions;