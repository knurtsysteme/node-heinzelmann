node-heinzelmann
================

The Node-[Heinzelmann](http://en.wikipedia.org/wiki/Heinzelm%C3%A4nnchen) is a loose collection of useful and useless Utilities written in JavaScript for [node.js](http://nodejs.org/)

## README Contents

- [http-response](#a)
  - [download](#a-a)
  - [json](#a-b)
- [http-request](#b)
  - [ip](#b-a)
  - [summary](#b-b)
- [mongo-factory](#c)
  - [client](#c-a)
  
<a name="a"/>
## http-response

Utilities to write a response to the client. You get it with:

```js
require('heinzelmann').util('http-response', args);
```

<a name="a-a"/>
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

<a name="a-b"/>
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

<a name="b"/>
## http-request

Grep interesting information out of user's request.

<a name="b-a"/>
### ip

return the ip address of the client. try to get the address even in case of proxies.

```js
var http = require('http');
var heinzelmann = require('heinzelmann');

var server = http.createServer(function(req, res) {
  console.log(heinzelmann.util('http-request', request).ip());
});

server.listen(3000);
```

<a name="b-b"/>
### summary

return a summary of the request with ip address, cookies, user-agent and the date now.
this is useful if you are not interested in the entire request paramesters.

```js
var http = require('http');
var heinzelmann = require('heinzelmann');

var server = http.createServer(function(req, res) {
  console.log(heinzelmann.util('http-request', request).summary());
});

server.listen(3000);
```


<a name="c"/>
### mongo-factory

produce mongo purposes

<a name="c-a"/>
### client

return a mongoclient setting default values. this is useful if you are tired to type "127.0.0.1" ...

```js
var mongodb = require('mongodb');
var heinzelmann = require('heinzelmann');
var mongoclient = heinzelmann.util('mongo-factory', 'db_name').client();
```
