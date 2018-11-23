import randomInt from './../../utils/scripts/randomInt';
import actions from './actions';
import state from './../../state/state';

window.player = null;
window.platforms = null;
window.bottomBorder = null;
window.cursors = null;
window.bg = null;
window.stars = null;
window.bg = null;
window.context = null;

var create = {
  baseScene() {
    var docBottom = document.body.getBoundingClientRect().bottom;
    var docCenter = document.body.getBoundingClientRect().width / 2;

    bg = this.add.tileSprite(0, 0, document.body.getBoundingClientRect().width,
                              document.body.getBoundingClientRect().height, 'ground').setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();
    bottomBorder = this.physics.add.staticGroup();

    bottomBorder.create(0, docBottom, 'platform').setScale(3, 1).refreshBody();

    player = this.physics.add.image(docCenter, docBottom, 'beetle');

    player.setBounce(0.01);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    context = this;
  },

  popatos() {
    setInterval(() => {
      var x = randomInt(50, document.body.getBoundingClientRect().width - 50);
      var y = 30;

      var potato = context.physics.add.image(x, y, 'potato');
      
      context.physics.moveTo(potato, x, 300, 300);

      setTimeout(() => {
        potato.destroy();
      }, 5200);
        
      context.physics.add.overlap(player, potato, actions.collectStar, null, context);
    }, 500);
  }
}

export default create;