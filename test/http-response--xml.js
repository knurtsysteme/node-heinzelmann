var assert = require('assert');
var http = require('http');
var url = require('url');
var heinzelmann = require('../');

var lastmodDefault = new Date(2000,0,1,2,3,4);

var urlset = [
              {
                loc : '/'
              },
              {
                loc : '/',
                lastmod : lastmodDefault
              },
              {
                loc : '/',
                lastmod : '2011-12-16T10:36:26+00:00',
                priority : 0.4,
                changefreq : 'daily'
              }
];
var thing = '<foo></foo>';
var callbackFired = false;

// using heinzelmann function
var serverToTest = function(req, res) {
  var resUtil = heinzelmann.util('http-response', res);
  resUtil.xml('<foo></foo>');
};

// test the response
var testServerResponse = function(res) {
  callbackFired = true;
  assert.equal(res.headers['content-type'], 'application/xml');
  res.on('data', function (body) {
    assert.equal(thing, body);
  });
  server.close();
};

var server = http.createServer(serverToTest);
server.listen(3002);
http.get(url.parse('http://localhost:3002/'), testServerResponse);
process.addListener('exit', function() {
  assert.ok(callbackFired);
});
