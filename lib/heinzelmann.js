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
 * @since 0.0.1 (06/26/2012)
 */
exports.util = function(name, args) {
  var util;
  var result;
  switch(name) {
    case 'http-response':
      util = require('./HTTPResponseUtil');
      result = new util.HTTPResponseUtil(args);
      break;
    case 'http-request':
      util = require('./HTTPRequestUtil');
      result = new util.HTTPRequestUtil(args);
      break;
    case 'mongo-factory':
      util = require('./MongoFactory');
      result = new util.MongoFactory(args);
      break;
    case 'sitemap-factory':
      util = require('./SitemapFactory');
      result = new util.SitemapFactory(args);
      break;
    case 'common-date-format':
      util = require('./CommonDateFormat');
      result = new util.CommonDateFormat(args);
      break;
    default:
      throw "unkonwn util " + name;
      result = null;
  }
  return result;
};
