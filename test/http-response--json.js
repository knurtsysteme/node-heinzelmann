var assert = require('assert');
var http = require('http');
var url = require('url');
var heinzelmann = require('../');

var thing = {
  'foo': 'bar',
  'oof': [0,1,2,3,4]
};
var callbackFired = false;

// using heinzelmann function
var serverToTest = function(req, res) {
  var resUtil = heinzelmann.util('http-response', res);
  resUtil.json(thing);
};

// test the response
var testServerResponse = function(res) {
  callbackFired = true;
  assert.equal(res.headers['content-type'], 'application/json');
  res.on('data', function (body) {
    assert.equal(JSON.stringify(thing), body);
  });
  server.close();
};

var server = http.createServer(serverToTest);
server.listen(3001);
http.get(url.parse('http://localhost:3001/'), testServerResponse);
process.addListener('exit', function() {
  assert.ok(callbackFired);
});
