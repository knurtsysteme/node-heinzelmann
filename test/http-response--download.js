var assert = require('assert');
var http = require('http');
var url = require('url');
var heinzelmann = require('../');

var callbackFired = false;
var callbackFiredWithData = false;

// using heinzelmann function
var serverToTest = function(req, res) {
  var resUtil = heinzelmann.util('http-response', res);
  resUtil.download(__dirname + '/testfile.zip');
};

// test the response
var testServerResponse = function(res) {
  callbackFired = true;
  assert.equal(res.headers['content-type'], 'application/octet-stream');
  res.on('data', function (body) {
    callbackFiredWithData = true;
  });
  server.close();
};

var server = http.createServer(serverToTest);
server.listen(3000);
http.get(url.parse('http://localhost:3000/'), testServerResponse);
process.addListener('exit', function() {
  assert.ok(callbackFired);
  assert.ok(callbackFiredWithData);
});
