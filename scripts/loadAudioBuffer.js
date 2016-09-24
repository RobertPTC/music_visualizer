let appDataLb = require('./appData'),
    beatDetection = require('./beatDetection');

let LoadAudio = (function getAudioData() {

  let _audioData,
      _levelsCount = 16,
      _length = 256,
      _tempo = 99,
      _levelBins,
      _timeByteData,
      _freqByteData,
      _audioCtx;

  function _handleBufferRendering(renderedBuffer, audioCtx, levelHistory, waveData, levelsData, callback) {
    let song = audioCtx.createBufferSource(),
      analyser = audioCtx.createAnalyser(),
      binCount,
      buffer = renderedBuffer;
    //peaks = beatDetection.getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]),
    //groups = beatDetection.getIntervals(peaks),
    //top = groups.sort((intA, intB) => {
    //  return intB.count - intA.count;
    //}).splice(0,5);

    analyser.smoothinTimeConstant = 0.8;
    analyser.fftSize = 1024;
    analyser.connect(audioCtx.destination);

    binCount = analyser.frequencyBinCount;
    _levelBins = Math.floor(binCount / _levelsCount);

    _timeByteData = new Uint8Array(binCount);
    _freqByteData = new Uint8Array(binCount);

    song.buffer = buffer;

    song.connect(audioCtx.destination);
    song.connect(analyser);

    song.ended = (e) => {
      console.log('ended ', e);
    };

    for (var i = 0; i < length; i++) {
      levelHistory.push(0);
    }
    appDataLb.setData('song', song);
    appDataLb.setData('analyser', analyser);
    appDataLb.setData('timeByteData', _timeByteData);
    appDataLb.setData('freqByteData', _freqByteData);
    appDataLb.setData('binCount', binCount);
    appDataLb.setData('levelsCount', _levelsCount);
    appDataLb.setData('levelsHistory', levelHistory);
    appDataLb.setData('waveData', waveData);
    appDataLb.setData('levelsData', levelsData);
    appDataLb.setData('levelBins', _levelBins);
    appDataLb.setData('tempo', _tempo);

    return new Promise((resolve) => {
      if (callback) {
        callback();
      }
    });
  }

  function _handleAudioData(buffer, offlineCtx, source, audioCtx, levelHistory, levelsData, waveData) {

    source.buffer = buffer;
    source.connect(offlineCtx.destination);
    source.start(0);
    return offlineCtx.startRendering();
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
  }

  function _createAudioDataPromise(offlineCtx) {
    return offlineCtx.decodeAudioData(_audioData);
  }

  return {
    init: () => {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      let offlineCtx = new OfflineAudioContext(2,44100*40,44100),
          source = offlineCtx.createBufferSource(),
          levelHistory = [],
          levelsData = [],
          waveData = [],
          request = new XMLHttpRequest();

      request.open('GET', 'love.mp3', true);

      request.responseType = 'arraybuffer';

      request.onload = function() {
        _audioData = request.response;
        _createAudioDataPromise(offlineCtx).then((buffer) => {
          _handleAudioData(buffer, offlineCtx, source, _audioCtx).then((renderedBuffer) => {
            _handleBufferRendering(renderedBuffer, _audioCtx, levelHistory, waveData, levelsData);
          })
        });
      };
      request.send();
    },
    reInit: (callback) => {
      let offlineCtx = new OfflineAudioContext(2,44100*40,44100),
          source = offlineCtx.createBufferSource(),
          levelHistory = [],
          levelsData = [],
          waveData = [];
      return _createAudioDataPromise(offlineCtx).then((buffer) => {
         return _handleAudioData(buffer, offlineCtx, source, _audioCtx).then((renderedBuffer) => {
           _handleBufferRendering(renderedBuffer, _audioCtx, levelHistory, waveData, levelsData, callback);
        })
      });
    }
  };
})();

module.exports = LoadAudio;
