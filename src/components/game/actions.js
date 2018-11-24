var actions = {
  collectStar(player, star) {
    console.log('11')
    star.disableBody(true, true);
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