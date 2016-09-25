var express = require('express'),
    path = require('path'),
    open = require('open'),
    app = express();

app.set('port', (process.env.PORT || 3111));
app.use(express.static(__dirname));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
  console.log('app listening on port ' + app.get('port'));
  if (process.env.NODE_ENV !== 'production') {
    //open('http://localhost:' + app.get('port'));
  }
});


