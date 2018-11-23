import preload from './preload';
import create from './create';
import update from './update';

export default function() {
  var config = {
    type: Phaser.AUTO,
    width: document.body.getBoundingClientRect().width,
    height: document.body.getBoundingClientRect().height,
    canvas: document.querySelector('.game'),

    physics: {
      default: 'arcade',
    },

    scene: {
      preload: preload,
      create: create.baseScene,
      update: update
    }
  };

  window.game = new Phaser.Game(config);

  create.popatos();

  function collectStar(player, star) {
    console.log('11')
    star.disableBody(true, true);
  }

  function borderDetect(player, star) {
    star.destroy();
  }
}