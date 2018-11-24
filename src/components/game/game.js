import preload from './preload';
import create from './create';
import update from './update';
import state from './../../state/state';

var pauseAndResumeNode = document.querySelector('.pauseAndResume');

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
  create.soloduhas();
  create.vodka();

  setTimeout(create.prokopenias, 1500);

  function collectBulbo(player, star) {
    console.log('11')
    star.disableBody(true, true);
  }

  function borderDetect(player, star) {
    star.destroy();
  }

  function setListeners() {
    pauseAndResumeNode.addEventListener('click', pauseOrResumeGame);
  }

  setListeners();

  function pauseOrResumeGame() {
    if(!state.paused) {
      game.scene.pause("default");
      state.paused = true;
      pauseAndResumeNode.innerHTML = 'Прадоўжыць';
    } else {
      game.scene.resume("default")
      state.paused = false;
      pauseAndResumeNode.innerHTML = 'Паўза';
    }
  }
}