//window.onload = () => {
//  let ctx = new (window.AudioContext || window.webkitAudioContext)(),
//      audio = document.getElementById('loveWillTearUsApart'),
//      audioSrc = ctx.createMediaElementSource(audio),
//      analyser = ctx.createAnalyser(),
//      frequencyData,
//      bufferLength,
//      dataArray;
//
//  dataArray = new Uint8Array(200);
//
//  audioSrc.connect(analyser);
//  audioSrc.connect(ctx.destination);
//  audio.muted = true;
//  audio.play();
//  function _render() {
//    requestAnimationFrame(_render);
//    analyser.getByteFrequencyData(dataArray);
//
//    //console.log('frequenceyData ', dataArray);
//  }
//
//  console.log('frequencyData ', dataArray);
//  //window.setInterval(() => {
//  //  analyser.getByteFrequencyData(dataArray);
//  //  audio.volume = 0.1;
//  //  //audio.pause();
//  //  console.log('frequencyData ', dataArray);
//  //}, 1000);
//
//};
window.onload = () => {
  require('./loadAudioBuffer');
  require('./visualizationControls');
};