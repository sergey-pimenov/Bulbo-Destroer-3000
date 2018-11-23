// Utils
import detectPlatform from './utils/scripts/detectPlatform';

// Components
import faceDetection from './components/faceDetection/faceDetection';
import game from './components/game/game';

// State
import state from './state/state';

detectPlatform();

faceDetection.setup();
faceDetection.init();


setInterval( () => {
  if(state.faceDetectionReady && !state.gameStarted) {
    game();
    state.gameStarted = true;
    console.log('Game ready')
  }
}, 100);