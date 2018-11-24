import state from './../../state/state';

var bulbaNodes = document.querySelector('.scores .bulbas');
var prokopeniasNodes = document.querySelector('.scores .prokopenias');
var soloduhasNodes = document.querySelector('.scores .soloduhas');

var scores = {
  collectBulbo() {
    state.scores.bulbas++;

    bulbaNodes.innerHTML = state.scores.bulbas;
  },

  collectProkopenia() {
    state.scores.prokopenias++;

    prokopeniasNodes.innerHTML = state.scores.prokopenias;
  },

  collectSoloduha() {
    state.scores.soloduhas++;

    soloduhasNodes.innerHTML = state.scores.soloduhas;
  }
}

export default scores;