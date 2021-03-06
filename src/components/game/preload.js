export default function preload () {
  this.load.image('ground', 'assets_static/images/ground.jpg');
  this.load.image('platform', 'assets_static/images/platform.png');
  this.load.image('soloduha', 'assets_static/images/soloduha.png');
  this.load.image('prokopenia', 'assets_static/images/prokopenia.png');
  this.load.image('vodka', 'assets_static/images/vodka.png');
  this.load.image('potato', 'assets_static/images/potato.png');
  this.load.image('beetle', 'assets_static/images/beetle.png');
  this.load.image('tractor', 'assets_static/images/tractor.png');
  this.load.spritesheet('bee', 
                        'assets_static/images/bee.png',
                        { frameWidth: 200, frameHeight: 200, endFrame: 24 });
}