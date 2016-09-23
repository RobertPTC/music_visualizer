let appDataLb = require('./appData'),
    beatDetection = require('./beatDetection');

let LoadAudio = (function getAudioData() {
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      offlineCtx = new OfflineAudioContext(2,44100*40,44100),
      source = offlineCtx.createBufferSource(),
      levelsCount = 16,
      length = 256,
      tempo = 99,
      levelBins,
      timeByteData,
      freqByteData,
      levelHistory = [],
      levelsData = [],
      waveData = [],
      request = new XMLHttpRequest();

  request.open('GET', 'loveWillTearUsApart.mp3', true);

  request.responseType = 'arraybuffer';

  request.onload = function() {
    let audioData = request.response;

    offlineCtx.decodeAudioData(audioData, (buffer) => {

      source.buffer = buffer;
      source.connect(offlineCtx.destination);
      //LOGIC FOR FINDING TEMPO OF SONG

      //let lowPass = offlineCtx.createBiquadFilter(),
      //  highPass = offlineCtx.createBiquadFilter();
      //
      //

      //
      //lowPass.type = 'lowpass';
      //lowPass.frequency.value = 150;
      //lowPass.Q.value = 1;
      //
      //source.connect(lowPass);
      //
      //highPass.type = 'highpass';
      //highPass.frequency.value = 100;
      //highPass.Q.value = 1;
      //
      //lowPass.connect(highPass);
      //
      //highPass.connect(offlineCtx.destination);
      source.start(0);
      offlineCtx.startRendering();
    });

    offlineCtx.oncomplete = function(e) {
      let song = audioCtx.createBufferSource(),
          analyser = audioCtx.createAnalyser(),
          binCount,
          buffer = e.renderedBuffer,
          peaks = beatDetection.getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]),
          groups = beatDetection.getIntervals(peaks),
          top = groups.sort((intA, intB) => {
            return intB.count - intA.count;
          }).splice(0,5);

      analyser.smoothinTimeConstant = 0.8;
      analyser.fftSize = 1024;
      analyser.connect(audioCtx.destination);

      binCount = analyser.frequencyBinCount;
      levelBins = Math.floor(binCount / levelsCount);

      timeByteData = new Uint8Array(binCount);
      freqByteData = new Uint8Array(binCount);

      song.buffer = buffer;

      song.connect(audioCtx.destination);
      song.connect(analyser);

      for (var i = 0; i < length; i++) {
        levelHistory.push(0);
      }

      appDataLb.setData('song', song);
      appDataLb.setData('analyser', analyser);
      appDataLb.setData('timeByteData', timeByteData);
      appDataLb.setData('freqByteData', freqByteData);
      appDataLb.setData('binCount', binCount);
      appDataLb.setData('levelsCount', levelsCount);
      appDataLb.setData('levelsHistory', levelHistory);
      appDataLb.setData('waveData', waveData);
      appDataLb.setData('levelsData', levelsData);
      appDataLb.setData('levelBins', levelBins);
      appDataLb.setData('tempo', tempo);
    };
  };

  request.send();
})();

module.exports = LoadAudio;
