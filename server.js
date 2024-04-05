const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
// var fs = require('fs');
// const bodyParser = require('body-parser');
// var forceSsl = require('express-force-ssl');

// var options = {
//   key: fs.readFileSync('certs/my-server.key.pem'),
//   cert: fs.readFileSync('certs/my-server.crt.pem'),
//   ca: fs.readFileSync('certs/intermediate.crt.pem'),
// }
var app = express();
// app.use(forceSsl);
app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', forceSsl, function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', forceSsl, function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

http.createServer(app).listen(80, function () {
 console.log('HTTP running on 80')
});

// https.createServer(options, app).listen(443, function () {
//   console.log('HTTPS running on 443')
// });
