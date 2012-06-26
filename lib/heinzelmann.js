/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */
 
/**
 * produce a heinzelmann util
 */
exports.util = function(name, args) {
  if(name === 'http-response') {
    var util = require('./HTTPResponseUtil');
    return new util.HTTPResponseUtil(args);
  } else {
    throw "unkonwn util " + name;
  }
}
