node-heinzelmann
================

The Node-[Heinzelmann](http://en.wikipedia.org/wiki/Heinzelm%C3%A4nnchen) is a loose collection of useful and useless Utilities written in JavaScript for [node.js](http://nodejs.org/)

## README Contents

- [http-response](#a)
  - [download](#a-a)
  - [json](#a-b)
  - [xml](#a-c)
- [http-request](#b)
  - [ip](#b-a)
  - [summary](#b-b)
- [mongo-factory](#c)
  - [client](#c-a)
- [sitemap-factory](#d)
  - [get](#d-a)
  
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

<a name="a-c"/>
### xml

Answer request with an old lady (without any validation).

```js
var http = require('http');
var heinzelmann = require('heinzelmann');

var server = http.createServer(function(req, res) {
  var resUtil = heinzelmann.util('http-response', res);
  var thing = '<foo></foo>';
  resUtil.xml(thing);
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


<a name="d"/>
### sitemap-factory

produce a google sitemap out of a given object. use given default values or system default values (lastmod "now", priority 1.00 and changefreq "monthly").

<a name="d-a"/>
### get

return a google xml sitemap. example (with own priority and changefreq as default, use system lastmod)

```js
var heinzelmann = require('heinzelmann');
var smf = heinzelmann.util('sitemap-factory', 'http://foo.bar');
var urlset = [ {
  loc : '/'
}, {
  loc : '/loc-1.html',
  lastmod : new Date(2000, 0, 1, 2, 3, 4)
}, {
  loc : 'loc-2.html',
  lastmod : '2011-12-16T10:36:26+00:00',
  priority : 0.4,
  changefreq : 'never'
} ];
var defaults = {
  priority : 0.8,
  changefreq : 'daily'
};
```

The output (where 2012-07-11T10:13:28+00:00 is the date "now"):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>http://foo.bar</loc>
    <lastmod>2012-07-11T10:13:28+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>http://foo.bar/loc-1.html</loc>
    <lastmod>2000-01-01T02:03:04+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>http://foo.bar/loc-2.html</loc>
    <lastmod>2011-12-16T10:36:26+00:00</lastmod>
    <changefreq>never</changefreq>
    <priority>0.40</priority>
  </url>
</urlset>
```