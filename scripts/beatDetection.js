var BeatDetection = (function beatDetection() {
  let partSize = 22050,
      parts,
      peaks = [];
  return {
    getPeaks: (data) => {
      parts = data[0].length / partSize;
      for (var i = 0; i < parts; i++) {
        let max = 0;
        for (var j = i * partSize; j < (i + 1) * partSize; j++) {
          let volume = Math.max(Math.abs(data[0][j]), Math.abs(data[1][j]));
          if (!max || volume > max.volume) {
            max = {
              position: j,
              volume: volume
            };
          }
        }
        peaks.push(max);
      }

      peaks.sort((a, b) => {
        return b.volume - a.volume;
      });
      peaks = peaks.splice(0, peaks.length * 0.5);
      peaks.sort((a,b) => {
        return a.position - b.position;
      });
      return peaks;
    },
    getIntervals: (peaks) => {
      let groups = [];
      peaks.forEach((peak, index) => {
        for (var i = 1; (index + i) < peaks.length && i < 10; i++) {
          let group = {
            tempo: (60 * 44100) / (peaks[index + i].position - peak.position),
            count: 1
          };
          while (group.tempo < 90) {
            group.tempo *= 2;
          }

          while (group.tempo > 180) {
            group.tempo /= 2;
          }

          group.tempo = Math.round(group.tempo);

          if (!(groups.some((interval) => {
              return (interval.tempo === group.tempo ? interval.count++ : 0)
            }))) {

              groups.push(group);
          }
        }
      });
      return groups;
    }
  }
})();

module.exports = BeatDetection;
