var express = require('express'),
    port = process.env.PORT || 3010,
    path = require('path'),
    open = require('open'),
    app = express();
console.log('process env ', process.env.PORT);
app.use(express.static(__dirname));
app.listen(port, function() {
  console.log('app listening on port ' + port);
  //open('http://localhost:3010');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


