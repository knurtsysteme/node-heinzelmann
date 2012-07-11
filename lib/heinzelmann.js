/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */
 
/**
 * produce a heinzelmann util.
 *
 * @param {String} name
 * key deciding what to produce:
 * 'http-response' produces a new HTTPResponseUtil
 * 'http-request' produces a new HTTPRequestUtil
 * 'mongo-factory' produces a new MongoFactory
 * @param {mixed} args
 * different things constructing the new instance with.
 * see class documentation for detailed information.
 * @api public
 */
exports.util = function(name, args) {
  var util;
  if(name === 'http-response') {
    util = require('./HTTPResponseUtil');
    return new util.HTTPResponseUtil(args);
  } else if(name === 'http-request') {
    util = require('./HTTPRequestUtil');
    return new util.HTTPRequestUtil(args);
  } else if(name === 'mongo-factory') {
    util = require('./MongoFactory');
    return new util.MongoFactory(args);
  } else {
    throw "unkonwn util " + name;
  }
};