var heinzelmann = require('../');

// check heinzelmann is there
exports.selftest = function(test){
  test.expect(1);
  test.ok(typeof(heinzelmann) == 'object');
  test.done();
};

// all asserts in http-response--download.js ok?
exports.httpResponseDownload = function(test) {
  test.expect(1);
  try {
    require('./http-response--download');
    test.ok(true);
  } catch(e) {
    test.ok(false, 'should not throw exception');
  }
  test.done();
};

//all asserts in http-response--json.js ok?
exports.httpResponseJSON = function(test) {
  test.expect(1);
  try {
   require('./http-response--json');
   test.ok(true);
  } catch(e) {
   test.ok(false, 'should not throw exception');
  }
  test.done();
};


//all asserts in http-response--xml.js ok?
exports.httpResponseJSON = function(test) {
  test.expect(1);
  try {
   require('./http-response--xml');
   test.ok(true);
  } catch(e) {
   test.ok(false, 'should not throw exception');
  }
  test.done();
};

// mongo utils
exports.mongoFactoryDefault = function(test) {
  test.expect(2);
  var mf = heinzelmann.util('mongo-factory', 'test-name');
  var mongoclient = mf.client();
  test.equals(typeof(mongoclient), 'object');
  test.equals(typeof(mongoclient.open), 'function');
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
  test.equals(typeof(hr), 'object');
  test.equals(typeof(hr.summary()), 'object');
  test.equals(hr.ip(), '200.200.200.200');
  test.equals(hr.summary().ip, '200.200.200.200');
  test.equals(heinzelmann.util('http-request', {}).ip(), 'unknown');
  test.done();
};

