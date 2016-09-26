window.onload = (() => {
  let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    alert('Hey, sorry, but you\'re using an Apple device or browser. Try another!');
  }
  require('./visualizationControls');
})();