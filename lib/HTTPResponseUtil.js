/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */

/**
 * construct a new http response util
 *
 * @param response
 *   the user get
 */
var HTTPResponseUtil = function(response) {
  
  if(typeof(response) == 'undefined') throw 'response is required';

  /**
   * answer with a file download
   *
   * @param download
   *   absolute path of download file
   * @param options
   *   clientname the name of the file as presented to the client (browser decision by default, no header set)
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
  }
  
  /**
   * answer with json (header is utf-8 and application/json)
   *
   * @param thing
   *   an object or array to print out as json to the response
   */
  this.json = function(thing) {
	  response.charset = 'UTF-8';
	  response.setHeader('Content-Type', 'application/json');
	  response.end(JSON.stringify(thing));
  }
};

// line for node.js
if(typeof(exports) != 'undefined') exports.HTTPResponseUtil = HTTPResponseUtil;
