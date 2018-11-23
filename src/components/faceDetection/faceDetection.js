import getAngle from './getAngle';
import state from './../../state/state';
import browsOverlay from './browsOverlay';
import model from './../../../assets_static/models/model_spca_10_svm.js';

// Taken from: https://bit.ly/2P8oQQE
var vid = document.querySelector('.video');
var vid_width = vid.width;
var vid_height = vid.height;
var overlay = document.querySelector('.overlay'); 
var overlayCC = overlay.getContext('2d');
var ctrack = new clm.tracker();

var faceDetection = {
  adjustVideoProportions() {
    // resize overlay and video if proportions of video are not 4:3
    // keep same height, just change width
    var proportion = vid.videoWidth/vid.videoHeight;
    vid_width = Math.round(vid_height * proportion);
    vid.width = vid_width;
    overlay.width = vid_width;
  },

  gumSuccess(stream) {
    // add camera stream if getUserMedia succeeded
    if ("srcObject" in vid) {
      vid.srcObject = stream;
    } else {
      vid.src = (window.URL && window.URL.createObjectURL(stream));
    }
    vid.onloadedmetadata = function() {
      faceDetection.adjustVideoProportions();
      vid.play();
    }
    vid.onresize = function() {
      faceDetection.adjustVideoProportions();
      if (state.faceDetectionReady) {
        ctrack.stop();
        ctrack.reset();
        ctrack.start(vid);
      }
    }

    // startVideo()
  },

  gumFail() {
    document.querySelector('.enableCamera').classList.add('show');
  },

  setup() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({video : true}).then(faceDetection.gumSuccess).catch(faceDetection.gumFail);
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({video : true}, faceDetection.gumSuccess, faceDetection.gumFail);
    } else {
      alert("Your browser does not seem to support getUserMedia");
    }
  },

  drawLoop() {
    requestAnimationFrame(faceDetection.drawLoop);
    overlayCC.clearRect(0, 0, vid_width, vid_height);
    if (ctrack.getCurrentPosition()) {
      ctrack.draw(overlay);
    }

    window.facePoints = ctrack.getCurrentPosition();

    if(window.facePoints) {
      window.move = getAngle();
    }
  },

  init() {
    ctrack.init();

    window.startVideo = function() {
      // start video
      vid.play();
      // start tracking
      ctrack.start(vid);
      state.faceDetectionReady = true;
      // start loop to draw face
      faceDetection.drawLoop();
      browsOverlay.init();
    }
  }
};

export default faceDetection;