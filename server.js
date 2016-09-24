var express = require('express'),
    path = require('path'),
    open = require('open'),
    app = express();
console.log('process env ', process.env.PORT);
app.set('port', (process.env.PORT || 3111));
app.use(express.static(__dirname));
app.listen(app.get('port'), function() {
  console.log('app listening on port ' + app.get('port'));
  //open('http://localhost:3010');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


