let AppData = (function appData() {
  let appDataStore = {};

  return {
    setData: (key, data) => {
      appDataStore[key] = data;
    },
    getData: (key) => {
      return appDataStore[key];
    }
  }
})();

module.exports = AppData;