import actions from './../game/actions';
import state from './../../state/state';

export default function() {
  var topMousePoint = facePoints[60][1];
  var bottomMousePoint = facePoints[57][1];

  if((bottomMousePoint - topMousePoint) >= 5 && !state.mouseOpened) {
    state.mouseOpened = true;

    console.log('Mouse opened!')

    actions.jump();

    setTimeout(() => {
      state.mouseOpened = false;
    }, 1000);
  }
}