var browsOverlayNode = document.querySelector('.browsOverlay');

var browsOverlay = {
  drawOverlay() {
    requestAnimationFrame(browsOverlay.drawOverlay);

    if(!facePoints) return;

    var rightPointX = facePoints[19][0];
    var rightPointY = facePoints[19][1];
    var leftPointX = facePoints[15][0];
    var leftPointY = facePoints[15][1];

    var ctx = browsOverlayNode.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);
    ctx.beginPath();
    ctx.moveTo(leftPointX, leftPointY - 7);
    ctx.lineTo(rightPointX,rightPointY - 7);
    ctx.strokeStyle = "rgb(255,255,0)";
    ctx.lineWidth = 2;
    ctx.stroke();
  },

  setProportions() {
    var faceOverlayWidth = document.querySelector('.overlay').getBoundingClientRect().width;
    var faceOverlayHeight = document.querySelector('.overlay').getBoundingClientRect().height;

    browsOverlayNode.width = faceOverlayWidth;
    browsOverlayNode.height = faceOverlayHeight;
  },

  init() {
    // browsOverlay.drawOverlay();
    // browsOverlay.setProportions();
  }
}

export default browsOverlay;