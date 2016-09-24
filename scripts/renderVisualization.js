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
        binCount = appDataRv.getData('binCount'),
        levelsHistory = appDataRv.getData('levelsHistory');

    analyser.getByteTimeDomainData(timeByteData);
    analyser.getByteFrequencyData(freqByteData);

    for(var j = 0; j < binCount; j++) {
      waveData[j] = ((timeByteData[j] - 128) /128 );
    }

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
