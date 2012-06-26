node-heinzelmann
================

The Node-[Heinzelmann](http://en.wikipedia.org/wiki/Heinzelm%C3%A4nnchen) is a loose collection of useful and useless Utilities written in JavaScript for [node.js](http://nodejs.org/)

## README Contents

- [http-response](#a0)
  - [download](#a0-0)
  - [json](#a0-1)
  
<a name="a0"/>
## http-response

Utilities to write a response to the client. You get it with:

```js
require('heinzelmann').util(name, args);
```

<a name="a0-0"/>
### download

Send a File to the client.

Without options:
```js
var http = require('http');
var heinzelmann = require('heinzelmann');

var server = http.createServer(function(req, res) {
  var resUtil = heinzelmann.util('http-response', res);
  resUtil.download('/tmp/98we72w9a34.zip');
});

server.listen(3000);
```

With options:
```js
var http = require('http');
var heinzelmann = require('heinzelmann');

var server = http.createServer(function(req, res) {
  var resUtil = heinzelmann.util('http-response', res);
  var options = {
    'clientname': 'your-download.zip' // file presented to client as "your-download.zip"
  }; 
  resUtil.download('/tmp/98we72w9a34.zip', options);
});

server.listen(3000);
```

<a name="a0-1"/>
### json

Answer request with json.

```js
var http = require('http');
var heinzelmann = require('heinzelmann');

var server = http.createServer(function(req, res) {
  var resUtil = heinzelmann.util('http-response', res);
  var thing = {
    'foo': 'bar'
  };
  resUtil.json(thing);
});

server.listen(3000);
```

