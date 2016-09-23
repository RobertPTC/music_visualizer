let appDataRc = require('./appData'),
    Glitter = require('./glitter');

let RenderCanvas = (function renderCanvas() {
  let canvas = document.getElementById('visualization-canvas'),
      canvasCtx = canvas.getContext('2d'),
      chartW = 500,
      glitterCounter = 0,
      glitters = [],
      cometGlitters = 2,
      backgroundGlitters = 30,
      glitterDrawn = false,
      chartH = 450;
      canvasCtx.width = chartW;
      canvasCtx.height = chartH;
      canvasCtx.lineWidth = 2;
      canvasCtx.fillStyle = '#000';
      canvasCtx.fillRect(0, 0, chartW, chartH);
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
  function _drawBackgroundGlitters(initialize) {

    for(var j = 0; j < backgroundGlitters; j++) {
      var x = Math.round(Math.random() * chartW);
      var y = Math.round(Math.random() * chartH);
      var radius = Math.random() * 2;
      var opacity = Math.random();
      var colorNumber = Math.random();
      var glitter = new Glitter(x, y, radius, opacity, 'background', colorNumber);

      glitters.push(glitter);
      //if (initialize) {
      //  glitters.forEach((glitter) => {
      //    glitter.draw(canvasCtx);
      //  });
      //}
    }
  }

  _drawBackgroundGlitters(true);

  return {
    updateMusicData: function() {
      let sum = 0,
          levelsCount = appDataRc.getData('levelsCount'),
          levelsHistory = appDataRc.getData('levelsHistory');

      for (var i = 0; i < levelsCount; i++) {
        //sum += leve
      }

    },
    drawWaveform: function() {
      let binCount = appDataRc.getData('binCount'),
          waveData = appDataRc.getData('waveData');

      canvasCtx.clearRect(0, 0, chartW, chartH);
      canvasCtx.fillStyle = '#000';
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
      canvasCtx.lineWidth = 2;
      canvasCtx.fillRect(0, 0, chartW, chartH);
      canvasCtx.beginPath();
      for (var i = 0; i < binCount; i++) {
        canvasCtx.lineTo((i / binCount) * (40 * chartW), waveData[i] * chartH/2 + chartH/2);
      }
      canvasCtx.stroke();
      glitterCounter++;
      if (glitterCounter > 98) {
        if (glitterCounter % 102 === 0) {
          _drawBackgroundGlitters();
          glitters.push(new Glitter(chartW, Math.round(Math.random() * chartH), 10 + Math.random() * 2, Math.random(), 'comet', Math.random()));
        }
        glitters.forEach((glitter) => {
          glitter.draw(canvasCtx);
        });
      }
    }
  }
})();

module.exports = RenderCanvas;
