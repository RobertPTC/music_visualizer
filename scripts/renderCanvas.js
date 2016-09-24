let appDataRc = require('./appData'),
    Glitter = require('./glitter');

let RenderCanvas = (function renderCanvas() {
  let canvas = document.getElementById('visualization-canvas'),
      canvasCtx = canvas.getContext('2d'),
      windowInnerWidth = window.innerWidth,
      chartW = windowInnerWidth <= 960 ? windowInnerWidth : windowInnerWidth * .66,
      glitterCounter = 0,
      glitters = [],
      backgroundGlitters = 30,
      chartH = 2 * (chartW / 3);
      canvasCtx.width = chartW;
      canvasCtx.height = chartH;
      canvas.height = chartH;
      canvas.width = chartW;
      canvasCtx.lineWidth = 2;
      canvasCtx.fillStyle = '#000';
      canvasCtx.fillRect(0, 0, chartW, chartH);
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';


  function _drawBackgroundGlitters(glitterCounter) {

    for(var j = 0; j < backgroundGlitters; j++) {
      var x = Math.round(Math.random() * chartW);
      var y = Math.round(Math.random() * chartH);
      var radius = Math.random();
      var opacity = Math.random();
      var colorNumber = Math.random();
      var glitter = new Glitter(x, y, radius, opacity, 'background', colorNumber, glitterCounter);

      glitters.push(glitter);
    }
  }

  return {
    drawWaveform: function() {
      let binCount = appDataRc.getData('binCount'),
          waveData = appDataRc.getData('waveData');
      canvasCtx.clearRect(0, 0, chartW, chartH);
      canvasCtx.fillStyle = '#000';
      canvasCtx.fillRect(0, 0, chartW, chartH);
      canvasCtx.beginPath();
      canvasCtx.strokeStyle = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
      canvasCtx.lineWidth = 4;
      for (var i = 0; i < binCount; i++) {
        canvasCtx.lineTo((i / binCount) * (40 * chartW), waveData[i] * chartH/2 + chartH/2);
      }
      canvasCtx.stroke();
      glitterCounter++;
      if (glitterCounter > 98) {
        if (glitterCounter % 99 === 0) {
          _drawBackgroundGlitters(glitterCounter);
          glitters.push(new Glitter(chartW, Math.round(Math.random() * chartH), 10 + Math.random() * 2, Math.random(), 'comet', Math.random(), glitterCounter));
          glitters.push(new Glitter(chartW + 15, Math.round(Math.random() * chartH), 10 + Math.random() * 2, Math.random(), 'comet', Math.random(), glitterCounter));
        }
        glitters.forEach((glitter) => {
          glitter.pulseCounter = glitterCounter;
          glitter.draw(canvasCtx);
        });
      }
    }
  }
})();

module.exports = RenderCanvas;
