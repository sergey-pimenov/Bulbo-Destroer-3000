/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var state = {
  faceDetectionReady: false,
  gameStarted: false,
  paused: false,
  mouseOpened: false,

  scores: {
    bulbas: 0,
    prokopenias: 0,
    soloduhas: 0
  }
};

exports.default = state;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scores = __webpack_require__(11);

var _scores2 = _interopRequireDefault(_scores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = {
  handleBulbo: function handleBulbo(player, bulbo) {
    _scores2.default.collectBulbo();
    bulbo.destroy();
  },
  handleProkopenia: function handleProkopenia(player, bonus) {
    _scores2.default.collectProkopenia();
    bonus.destroy();
    actions.grow();
  },
  handleSoloduha: function handleSoloduha(player, bonus) {
    _scores2.default.collectSoloduha();
    bonus.destroy();
    actions.grow();
  },
  handleVodka: function handleVodka(player, bonus) {
    bonus.destroy();
    actions.blur();
  },
  destroyByTractor: function destroyByTractor(tractor, objToDestroy) {
    objToDestroy.destroy();
  },
  handleTractor: function handleTractor(player, tractor) {
    // player.destroy();

    console.log('Rotate player!');

    context.tweens.add({
      targets: player,
      rotation: 6.28319,
      duration: 150
    });
  },
  jump: function jump() {
    if (!context) return;

    context.tweens.add({
      targets: player,
      y: 400,
      duration: 450,
      ease: function ease(t) {
        return Math.pow(Math.sin(t * 3), 3);
      }
    });
  },
  grow: function grow() {
    context.tweens.add({
      targets: player,
      scaleX: '+=.06',
      scaleY: '+=.06',
      duration: 700
    });
  },
  blur: function blur() {
    document.body.classList.add('blur');

    setTimeout(function () {
      document.body.classList.remove('blur');
    }, 7000);
  }
};

exports.default = actions;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getAngle = __webpack_require__(7);

var _getAngle2 = _interopRequireDefault(_getAngle);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _browsOverlay = __webpack_require__(5);

var _browsOverlay2 = _interopRequireDefault(_browsOverlay);

var _detectMouseOpening = __webpack_require__(6);

var _detectMouseOpening2 = _interopRequireDefault(_detectMouseOpening);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Taken from: https://bit.ly/2P8oQQE
var vid = document.querySelector('.video');
var vid_width = vid.width;
var vid_height = vid.height;
var overlay = document.querySelector('.overlay');
var description = document.querySelector('.faceDetection .description');
var overlayCC = overlay.getContext('2d');
var ctrack = new clm.tracker();

var faceDetection = {
  adjustVideoProportions: function adjustVideoProportions() {
    // resize overlay and video if proportions of video are not 4:3
    // keep same height, just change width
    var proportion = vid.videoWidth / vid.videoHeight;
    vid_width = Math.round(vid_height * proportion);
    vid.width = vid_width;
    description.width = vid_width;
    overlay.width = vid_width;
  },
  gumSuccess: function gumSuccess(stream) {
    // add camera stream if getUserMedia succeeded
    if ("srcObject" in vid) {
      vid.srcObject = stream;
    } else {
      vid.src = window.URL && window.URL.createObjectURL(stream);
    }
    vid.onloadedmetadata = function () {
      faceDetection.adjustVideoProportions();
      vid.play();
    };
    vid.onresize = function () {
      faceDetection.adjustVideoProportions();
      if (_state2.default.faceDetectionReady) {
        ctrack.stop();
        ctrack.reset();
        ctrack.start(vid);
      }
    };

    faceDetection.startTracking();
  },
  gumFail: function gumFail() {
    document.querySelector('.enableCamera').classList.add('show');
  },
  setup: function setup() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(faceDetection.gumSuccess).catch(faceDetection.gumFail);
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, faceDetection.gumSuccess, faceDetection.gumFail);
    } else {
      alert("Your browser does not seem to support getUserMedia");
    }
  },
  drawLoop: function drawLoop() {
    requestAnimationFrame(faceDetection.drawLoop);
    overlayCC.clearRect(0, 0, vid_width, vid_height);
    if (ctrack.getCurrentPosition()) {
      ctrack.draw(overlay);
    }

    window.facePoints = ctrack.getCurrentPosition();

    if (window.facePoints) {
      window.move = (0, _getAngle2.default)();
      (0, _detectMouseOpening2.default)();
    }
  },
  startTracking: function startTracking() {
    vid.play();

    // Start tracking
    ctrack.start(vid);

    // Start loop to draw face
    faceDetection.drawLoop();
    _browsOverlay2.default.init();

    document.body.classList.add('showStartButton');

    document.querySelector('.start').addEventListener('click', function () {
      _state2.default.faceDetectionReady = true;

      document.body.classList.add('hideStartButton');
      document.body.classList.add('hideInitScreen');
    });
  },
  init: function init() {
    ctrack.init();
  }
};

exports.default = faceDetection;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var config = {
    type: Phaser.AUTO,
    width: document.body.getBoundingClientRect().width,
    height: document.body.getBoundingClientRect().height,
    canvas: document.querySelector('.game'),

    physics: {
      default: 'arcade'
    },

    scene: {
      preload: _preload2.default,
      create: _create2.default.baseScene,
      update: _update2.default
    }
  };

  window.game = new Phaser.Game(config);

  setTimeout(function () {
    _create2.default.popatos();
    _create2.default.soloduhas();
    _create2.default.vodka();

    setTimeout(function () {
      _create2.default.tractor();

      setInterval(function () {
        _create2.default.tractor();
      }, 12000);
    }, 450);
  }, 500);

  setTimeout(_create2.default.prokopenias, 1500);

  function collectBulbo(player, star) {
    console.log('11');
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
    if (!_state2.default.paused) {
      game.scene.pause("default");
      _state2.default.paused = true;
      pauseAndResumeNode.innerHTML = 'Прадоўжыць';
    } else {
      game.scene.resume("default");
      _state2.default.paused = false;
      pauseAndResumeNode.innerHTML = 'Паўза';
    }
  }
};

var _preload = __webpack_require__(9);

var _preload2 = _interopRequireDefault(_preload);

var _create = __webpack_require__(8);

var _create2 = _interopRequireDefault(_create);

var _update = __webpack_require__(10);

var _update2 = _interopRequireDefault(_update);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pauseAndResumeNode = document.querySelector('.pauseAndResume');

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // iOS Safari
  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  if (iOSSafari) {
    document.body.classList.add('safari');
  }

  function mobileAndTabletcheck() {
    var check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  if (mobileAndTabletcheck()) {
    document.body.classList.add('mobile');
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var browsOverlayNode = document.querySelector('.browsOverlay');

var browsOverlay = {
  drawOverlay: function drawOverlay() {
    requestAnimationFrame(browsOverlay.drawOverlay);

    if (!facePoints) return;

    var rightPointX = facePoints[19][0];
    var rightPointY = facePoints[19][1];
    var leftPointX = facePoints[15][0];
    var leftPointY = facePoints[15][1];

    var ctx = browsOverlayNode.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);
    ctx.beginPath();
    ctx.moveTo(leftPointX, leftPointY - 7);
    ctx.lineTo(rightPointX, rightPointY - 7);
    ctx.strokeStyle = "rgb(255,255,0)";
    ctx.lineWidth = 2;
    ctx.stroke();
  },
  setProportions: function setProportions() {
    var faceOverlayWidth = document.querySelector('.overlay').getBoundingClientRect().width;
    var faceOverlayHeight = document.querySelector('.overlay').getBoundingClientRect().height;

    browsOverlayNode.width = faceOverlayWidth;
    browsOverlayNode.height = faceOverlayHeight;
  },
  init: function init() {
    // browsOverlay.drawOverlay();
    // browsOverlay.setProportions();
  }
};

exports.default = browsOverlay;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (!window.game || !window.game.isRunning) return;

  var topMousePoint = facePoints[60][1];
  var bottomMousePoint = facePoints[57][1];

  if (bottomMousePoint - topMousePoint >= 5 && !_state2.default.mouseOpened) {
    _state2.default.mouseOpened = true;

    console.log('Mouse opened!');

    _actions2.default.jump();

    setTimeout(function () {
      _state2.default.mouseOpened = false;
    }, 1000);
  }
};

var _actions = __webpack_require__(1);

var _actions2 = _interopRequireDefault(_actions);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var leftPoint = facePoints[19][1];
  var rightPoint = facePoints[15][1];

  return leftPoint - rightPoint;
};

;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create;

var _randomInt = __webpack_require__(13);

var _randomInt2 = _interopRequireDefault(_randomInt);

var _actions = __webpack_require__(1);

var _actions2 = _interopRequireDefault(_actions);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.player = null;
window.platforms = null;
window.bottomBorder = null;
window.cursors = null;
window.bg = null;
window.stars = null;
window.tractor = null;
window.context = null;

var create = (_create = {
  baseScene: function baseScene() {
    var docBottom = document.body.getBoundingClientRect().bottom;
    var docCenter = document.body.getBoundingClientRect().width / 2;

    bg = this.add.tileSprite(0, 0, document.body.getBoundingClientRect().width, document.body.getBoundingClientRect().height, 'ground').setOrigin(0, 0);

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
  prokopenias: function prokopenias() {
    setInterval(function () {
      if (_state2.default.paused) return;

      var x = (0, _randomInt2.default)(50, document.body.getBoundingClientRect().width - 50);
      var y = -150;

      var prokopenia = context.physics.add.image(x, y, 'prokopenia');

      context.physics.moveTo(prokopenia, x, 300, 300);

      setTimeout(function () {
        if (_state2.default.paused) return;
        prokopenia.destroy();
      }, 5200);

      context.physics.add.overlap(player, prokopenia, _actions2.default.handleProkopenia, null, context);
    }, 3000);
  },
  vodka: function vodka() {
    create.newObject(-150, 'vodka', _actions2.default.handleVodka, 20000);
  },
  popatos: function popatos() {
    create.newObject(-30, 'potato', _actions2.default.handleBulbo, 500);
  },
  soloduhas: function soloduhas() {
    create.newObject(-150, 'soloduha', _actions2.default.handleSoloduha, 5000);
  }
}, _defineProperty(_create, 'prokopenias', function prokopenias() {
  create.newObject(-150, 'prokopenia', _actions2.default.handleProkopenia, 5000);
}), _defineProperty(_create, 'tractor', function (_tractor) {
  function tractor() {
    return _tractor.apply(this, arguments);
  }

  tractor.toString = function () {
    return _tractor.toString();
  };

  return tractor;
}(function () {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tractor';

  if (_state2.default.paused || !context) return;

  var x = -300;
  var y = document.body.getBoundingClientRect().height - 200;

  tractor = context.physics.add.image(x, y, key);

  setTimeout(function () {
    context.physics.moveTo(tractor, document.body.getBoundingClientRect().width, y, 1200);

    setTimeout(function () {
      if (_state2.default.paused) return;
      tractor.destroy();
    }, 5200);
  }, 5000);

  context.physics.add.overlap(player, tractor, _actions2.default.handleTractor, null);
})), _defineProperty(_create, 'newObject', function newObject() {
  var yPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -150;
  var key = arguments[1];
  var handler = arguments[2];
  var interval = arguments[3];

  setInterval(function () {
    if (_state2.default.paused) return;

    var x = (0, _randomInt2.default)(50, document.body.getBoundingClientRect().width - 50);
    var y = -150;

    var newGameObj = context.physics.add.image(x, y, key);

    context.physics.moveTo(newGameObj, x, 300, 300);

    setTimeout(function () {
      if (_state2.default.paused) return;
      newGameObj.destroy();
    }, 5200);

    context.physics.add.overlap(player, newGameObj, handler, null, context);
    // context.physics.add.overlap(tractor, newGameObj, actions.destroyByTractor, null, context);
  }, interval);
}), _create);

exports.default = create;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preload;
function preload() {
  this.load.image('ground', 'assets_static/images/ground.jpg');
  this.load.image('platform', 'assets_static/images/platform.png');
  this.load.image('soloduha', 'assets_static/images/soloduha.png');
  this.load.image('prokopenia', 'assets_static/images/prokopenia.png');
  this.load.image('vodka', 'assets_static/images/vodka.png');
  this.load.image('potato', 'assets_static/images/potato.png');
  this.load.image('beetle', 'assets_static/images/beetle.png');
  this.load.image('tractor', 'assets_static/images/tractor.png');
  this.load.spritesheet('bee', 'assets_static/images/bee.png', { frameWidth: 200, frameHeight: 200, endFrame: 24 });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = update;
function update() {
  bg.tilePositionY -= 6;

  if (window.move) {
    player.setVelocityX(40 * window.move);
  } else {
    player.setVelocityX(0);
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bulbaNodes = document.querySelector('.scores .bulbas');
var prokopeniasNodes = document.querySelector('.scores .prokopenias');
var soloduhasNodes = document.querySelector('.scores .soloduhas');

var scores = {
  collectBulbo: function collectBulbo() {
    _state2.default.scores.bulbas++;

    bulbaNodes.innerHTML = _state2.default.scores.bulbas;
  },
  collectProkopenia: function collectProkopenia() {
    _state2.default.scores.prokopenias++;

    prokopeniasNodes.innerHTML = _state2.default.scores.prokopenias;
  },
  collectSoloduha: function collectSoloduha() {
    _state2.default.scores.soloduhas++;

    soloduhasNodes.innerHTML = _state2.default.scores.soloduhas;
  }
};

exports.default = scores;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _detectPlatform = __webpack_require__(4);

var _detectPlatform2 = _interopRequireDefault(_detectPlatform);

var _faceDetection = __webpack_require__(2);

var _faceDetection2 = _interopRequireDefault(_faceDetection);

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
(0, _detectPlatform2.default)();

// State


// Components


_faceDetection2.default.setup();
_faceDetection2.default.init();

setInterval(function () {
  if (_state2.default.faceDetectionReady && !_state2.default.gameStarted) {
    (0, _game2.default)();
    _state2.default.gameStarted = true;
    console.log('Game ready');
  }
}, 100);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

/***/ })
/******/ ]);