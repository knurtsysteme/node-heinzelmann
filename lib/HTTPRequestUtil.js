/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */

/**
 * construct a new HTTPRequestUtil supporting
 * some request util functions.
 *
 * @param request
 * got from client
 * @api public
 */
var HTTPRequestUtil = function(request) {

  var valueOnUnkown = 'unknown';

  /**
   * return client's IP
   * 
   * @api public
   * @return {String} of the ip address or 'unknown' 
   * if nothing could be found.
   */
  this.ip = function() {
    var result = valueOnUnkown;
	  if (request.connection && request.connection.remoteAddress) {
		  result = request.connection.remoteAddress;
	  } else if (request.socket && request.socket.remoteAddress) {
		  result = request.socket.remoteAddress;
	  } else if (request.connection && request.connection.socket
			  && request.connection.socket.remoteAddress) {
		  result = request.connection.socket.remoteAddress;
	  } 
	  return result;
  }

  /**
   * return a summary of the request
   * with ip address, cookies, 
   * user-agent and the date now.
   * 
   * @api public
   * @return {Object} summary
   */
  this.summary = function() {
    var result = {};
    result.ip = this.ip();
    result.useragent = request.headers && request.headers["user-agent"] ? request.headers["user-agent"] : valueOnUnkown;
	  result.cookies = request.headers && request.headers["cookie"] ? request.headers["cookie"] : valueOnUnkown;
	  result.date = new Date().getTime();
	  return result;
  }
};

// line for node.js
if(typeof(exports) !== 'undefined' && typeof(exports.HTTPRequestUtil) === 'undefined') exports.HTTPRequestUtil = HTTPRequestUtil;
