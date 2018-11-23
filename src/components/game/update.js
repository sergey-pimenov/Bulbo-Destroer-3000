export default function update () {
  bg.tilePositionY -= 3;

  if(window.move) {
      player.setVelocityX(40 * window.move);
  } else
  {
      player.setVelocityX(0);
  }
}