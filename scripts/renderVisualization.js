let appDataRv = require('./appData'),
    renderCanvas = require('./renderCanvas');

let RenderVisualization = (function renderVisualization() {
  let _requestAnimationFrame;

  function _visualize() {
    _requestAnimationFrame = window.requestAnimationFrame(_visualize);
    let analyser = appDataRv.getData('analyser'),
        timeByteData = appDataRv.getData('timeByteData'),
        freqByteData = appDataRv.getData('freqByteData'),
        waveData = appDataRv.getData('waveData'),
        levelsData = appDataRv.getData('levelsData'),
        levelBins = appDataRv.getData('levelBins'),
        levelsHistory = appDataRv.getData('levelsHistory');

    analyser.getByteTimeDomainData(timeByteData);
    analyser.getByteFrequencyData(freqByteData);

    renderCanvas.drawWaveform();
  }

  return {
    visualize: () => {
      _visualize();
    },
    stopVisualize: () => {
      window.cancelAnimationFrame(_requestAnimationFrame);
    }
  };
})();

module.exports = RenderVisualization;
