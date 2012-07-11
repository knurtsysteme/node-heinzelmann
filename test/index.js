var heinzelmann = require('../');

// check heinzelmann is there
exports.selftest = function(test) {
  test.expect(1);
  test.ok(typeof (heinzelmann) == 'object');
  test.done();
};

// all asserts in http-response--download.js ok?
exports.httpResponseDownload = function(test) {
  test.expect(1);
  try {
    require('./http-response--download');
    test.ok(true);
  } catch (e) {
    test.ok(false, 'should not throw exception');
  }
  test.done();
};

// all asserts in http-response--json.js ok?
exports.httpResponseJSON = function(test) {
  test.expect(1);
  try {
    require('./http-response--json');
    test.ok(true);
  } catch (e) {
    test.ok(false, 'should not throw exception');
  }
  test.done();
};

// all asserts in http-response--xml.js ok?
exports.httpResponseJSON = function(test) {
  test.expect(1);
  try {
    require('./http-response--xml');
    test.ok(true);
  } catch (e) {
    test.ok(false, 'should not throw exception');
  }
  test.done();
};

// mongo utils
exports.mongoFactoryDefault = function(test) {
  test.expect(2);
  var mf = heinzelmann.util('mongo-factory', 'test-name');
  var mongoclient = mf.client();
  test.equals(typeof (mongoclient), 'object');
  test.equals(typeof (mongoclient.open), 'function');
  test.done();
};

// sitemap factory
exports.sitemapFactory = function(test) {
  test.expect(4);
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
    changefreq : 'daily'
  } ];
  var defaults = {
    priority : 0.8,
    changefreq : 'daily'
  };
  var iOf0 = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
  var iOf1 = '<url><loc>http://foo.bar</loc><lastmod>'; // ignore date now
  var iOf2 = '</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url><url><loc>http://foo.bar/loc-1.html</loc><lastmod>2000-01-01T02:03:04+00:00</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url><url><loc>http://foo.bar/loc-2.html</loc><lastmod>';
  // ignoring date now
  var iOf3 = '</lastmod><changefreq>daily</changefreq><priority>0.40</priority></url></urlset>';
  var got = smf.get(urlset, defaults);
  test.equals(0, got.indexOf(iOf0));
  test.equals(273, got.indexOf(iOf1));
  test.equals(337, got.indexOf(iOf2));
  test.equals(629, got.indexOf(iOf3));
  test.done();
};

// request utils
exports.httpRequestGetIP = function(test) {
  test.expect(5);
  var requestMock = {
    'connection' : {
      'socket' : {
        'remoteAddress' : "200.200.200.200"
      }
    }
  };
  var hr = heinzelmann.util('http-request', requestMock);
  test.equals(typeof (hr), 'object');
  test.equals(typeof (hr.summary()), 'object');
  test.equals(hr.ip(), '200.200.200.200');
  test.equals(hr.summary().ip, '200.200.200.200');
  test.equals(heinzelmann.util('http-request', {}).ip(), 'unknown');
  test.done();
};
