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

  handleVodka(player, bonus) {
    bonus.destroy();
    actions.blur();
  },

  destroyByTractor(tractor, objToDestroy) {
    objToDestroy.destroy();
  },

  handleTractor(player, tractor) {
    // player.destroy();

    console.log('Rotate player!')

    context.tweens.add({
      targets: player,
      rotation: 6.28319,
      duration: 200
    });
  },

  jump() {
    if(!context) return;

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
      scaleX: '+=.06',
      scaleY: '+=.06',
      duration: 700
    });
  },

  blur() {
    document.body.classList.add('blur');

    setTimeout(() => {
      document.body.classList.remove('blur');
    }, 7000)
  }
}

export default actions;