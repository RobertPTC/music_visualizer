let appDataVc = require('./appData'),
    renderVisualization = require('./renderVisualization'),
    LoadAudioBuffer = require('./loadAudioBuffer');

let VisualizationControls = (function visualizationControls() {

  let startVisualization = document.getElementById('start-visualization'),
      stopVisualization = document.getElementById('stop-visualization');

  function _callback() {
    console.log('callback');
  }

  startVisualization.addEventListener('click', () => {
    if (!appDataVc.getData('reInit')) {
      require('./loadAudioBuffer').init().then(() => {
        let song = appDataVc.getData('song');
        console.log('song ', song);
        song.start(0);
        appDataVc.setData('startTime', Date.now());
        appDataVc.setData('reInit', true);
        renderVisualization.visualize();
      });
    } else {
      LoadAudioBuffer.reInit(_callback).then((data) => {
        let song = appDataVc.getData('song'),
            restartTime = (appDataVc.getData('stopTime') - appDataVc.getData('startTime')) / 1000;
        song.start(0, restartTime);
        renderVisualization.visualize();
      });
    }
  });

  stopVisualization.addEventListener('click', () => {
    let song = appDataVc.getData('song');
    song.stop();
    appDataVc.setData('stopTime', Date.now());
    renderVisualization.stopVisualize();
  });

})();

module.exports = VisualizationControls;
