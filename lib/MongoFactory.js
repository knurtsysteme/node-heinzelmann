/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */

/**
 * construct a new mongoclient
 *
 * @param {String} databaseName
 * name of the database
 * @api public
 */
var MongoFactory = function(databaseName) {
  var mongodb = require('mongodb');
  
  /**
   * return a client of the mongo db.
   *
   * @param {Object} options
   * databaseName: use this db. if not given, use 
   * global db given in constructor. 
   * host: to use. default: 127.0.0.1 
   * port: to use. default: 27017 
   * autoReconnect: connection iption auto_reconnect. default: true 
   * @api public
   * @return {Object}
   */
  this.client = function(options) {
    options = options || {};
    options.databaseName = options.databaseName || databaseName || 'no-name';
    options.host = options.host || "127.0.0.1";
    options.port = options.port || 27017;
    if (typeof(options.autoReconnect) !== 'boolean') options.autoReconnect = true;
    return new mongodb.Db (
      options.databaseName,
      new mongodb.Server(
        options.host, 
        options.port, {
          auto_reconnect : options.autoReconnect
        }
      )
    );
  };
};

// line for node.js
if(typeof(exports) !== 'undefined' && typeof(exports.MongoFactory) === 'undefined') exports.MongoFactory = MongoFactory;
