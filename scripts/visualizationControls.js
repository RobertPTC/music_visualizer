let appDataVc = require('./appData'),
    renderVisualization = require('./renderVisualization');

let VisualizationControls = (function visualizationControls() {

  let startVisualization = document.getElementById('start-visualization'),
      stopVisualization = document.getElementById('stop-visualization');

  startVisualization.addEventListener('click', () => {
    let song = appDataVc.getData('song');
    song.start(0);
    renderVisualization.visualize();
  });

  stopVisualization.addEventListener('click', () => {
    let song = appDataVc.getData('song');
    song.stop();
    renderVisualization.stopVisualize();
  });

})();

module.exports = VisualizationControls;
