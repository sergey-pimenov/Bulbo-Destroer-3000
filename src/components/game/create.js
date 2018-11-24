import randomInt from './../../utils/scripts/randomInt';
import actions from './actions';
import state from './../../state/state';

window.player = null;
window.platforms = null;
window.bottomBorder = null;
window.cursors = null;
window.bg = null;
window.stars = null;
window.context = null;

var create = {
  baseScene() {
    var docBottom = document.body.getBoundingClientRect().bottom;
    var docCenter = document.body.getBoundingClientRect().width / 2;

    bg = this.add.tileSprite(0, 0, document.body.getBoundingClientRect().width,
                              document.body.getBoundingClientRect().height, 'ground').setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();
    bottomBorder = this.physics.add.staticGroup();

    bottomBorder.create(0, docBottom + 50, 'platform').setScale(3, 1).refreshBody();

    var config = {
      key: 'bee',
      frames: this.anims.generateFrameNumbers('bee', {
          start: 0,
          end: 24
      }),
      repeat: -1,
      frameRate: 48
    };

    this.anims.create(config);

    player = this.physics.add.sprite(docCenter, docBottom, 'bee');

    player.anims.play('bee');

    player.setBounce(0.01);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    context = this;
  },

  prokopenias() {
    setInterval(() => {
      if(state.paused) return;

      var x = randomInt(50, document.body.getBoundingClientRect().width - 50);
      var y = -150;

      var prokopenia = context.physics.add.image(x, y, 'prokopenia');
      
      context.physics.moveTo(prokopenia, x, 300, 300);

      setTimeout(() => {
        if(state.paused) return;
        prokopenia.destroy();
      }, 5200);

      context.physics.add.overlap(player, prokopenia, actions.handleProkopenia, null, context);
    }, 3000);
  },

  vodka() {
    create.newObject(-150, 'vodka', actions.handleVodka, 10000);
  },

  popatos() {
    create.newObject(-30, 'potato', actions.handleBulbo, 500);
  },

  soloduhas() {
    create.newObject(-150, 'soloduha', actions.handleSoloduha, 3000);
  },

  prokopenias() {
    create.newObject(-150, 'prokopenia', actions.handleProkopenia, 3000);
  },

  newObject(yPos = -150, key, handler, interval) {
    setInterval(() => {
      if(state.paused) return;

      var x = randomInt(50, document.body.getBoundingClientRect().width - 50);
      var y = -150;

      var newGameObj = context.physics.add.image(x, y, key);
      
      context.physics.moveTo(newGameObj, x, 300, 300);

      setTimeout(() => {
        if(state.paused) return;
        newGameObj.destroy();
      }, 5200);

      context.physics.add.overlap(player, newGameObj, handler, null, context);
    }, interval);
  },
}

export default create;