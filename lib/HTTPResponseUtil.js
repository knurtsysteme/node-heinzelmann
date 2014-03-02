/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */

/**
 * construct a new http response util
 *
 * @api public
 * @param response
 * the user get
 * @since 0.0.1 (06/26/2012)
 */
var HTTPResponseUtil = function(response) {
  
  if(typeof(response) === 'undefined') throw 'response is required';

  /**
   * answer with a file download
   *
   * @api public
   * @param {String} download
   * absolute path of download file
   * @param {Object} options
   * clientname the name of the file as presented to the client (browser decision by default, no header set)
   * @return {Integer} status code
   */
  this.download = function(download, options) {
    if (typeof (download) == 'undefined') throw 'download is required';
    var fs = require('fs');
    var data = fs.readFileSync(download);
    options = options || {};
    if(options.clientname) {
      response.setHeader('Content-Disposition', 'attachment; filename="'+options.clientname+'"');
    }
    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader('Content-Length', data.length);
    response.write(data);
    response.end();
    return response.statusCode;  
  };
  
  /**
   * answer with json (header is utf-8 and application/json)
   *
   * @api public
   * @param {Object} thing
   * an object or array to print out as json to the response
   * @return {Integer} status code
   */
  this.json = function(thing) {
    var result = null;
    try {
      response.charset = 'UTF-8';
      response.setHeader('Content-Type', 'application/json');
      result = thing;
    } catch(e) {
      result = {"error": e.message};
    }
    response.end(JSON.stringify(result));
    return response.statusCode;  
  };
  
  /**
   * answer with jsonp (header is utf-8 and application/javascript)
   *
   * @api public
   * @param {Object} json
   * @param {string} name of callback function
   * an object or array to print out as json to the response
   * @return {Integer} status code
   */
  this.jsonp = function(json, callback) {
    var result = null;
    callback = callback || 'callback';
    try {
      response.charset = 'UTF-8';
      response.setHeader('Content-Type', 'application/javascript');
      result = json;
    } catch(e) {
      result = {"error": e.message};
    }
    response.end(callback + '(' + JSON.stringify(result) + ')');
    return response.statusCode;  
  };
  
  /**
   * answer with xml (header is utf-8 and application/xml)
   *
   * @api public
   * @param {String} thing that is already xml. no check, no parsing here!
   * @return {Integer} status code
   */
  this.xml = function(thing) {
    var result = null;
    try {
      response.charset = 'UTF-8';
      response.setHeader('Content-Type', 'application/xml');
      result = thing;
    } catch(e) {
      result = {"error": e.message};
    }
    response.end(result);
    return response.statusCode;  
  };
};

// line for node.js
if(typeof(exports) !== 'undefined' && typeof(exports.HTTPResponseUtil) === 'undefined') exports.HTTPResponseUtil = HTTPResponseUtil;
