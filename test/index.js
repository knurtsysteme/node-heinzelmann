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

// all asserts in http-response--json.js ok?
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

