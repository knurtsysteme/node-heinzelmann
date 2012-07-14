/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */

/**
 * format dates to common used representations. 
 * for other things see:
 * https://github.com/felixge/node-dateformat
 * https://github.com/minodisk/dateformat-js
 *
 * @param {Date} date
 * to user for formatting. default "now".
 * @api public
 * @since 0.0.1 (07/14/2012)
 */
var CommonDateFormat = function(date) {
  var date = date || new Date();
  
  /**
   * set the date working with
   *
   * @param {Date} newDate to set
   * @api public
   * @return {Date} the old date
   */
  this.setDate = function(newDate) {
    var old = this.date;
    date = newDate;
    return old;
  };

  /**
   * return a date in W3C Date and Time format
   * with complete date plus hours, minutes and seconds:
   * http://www.w3.org/TR/NOTE-datetime
   *
   * @param {String} tzd (optional)
   * time zone designator (Z or +hh:mm or -hh:mm)
   * default "+00:00"
   * @api public
   * @return {String}
   */
  this.getW3CDateTime = function(tzd) {
    tzd = tzd || "+00:00";
    return date.getFullYear() + '-' + getFullMonth() + '-' + getFullDay() + 'T' + getFullHour() + ':' + getFullMinute() + ':' + getFullSecond() + tzd;
  };

  /**
   * return the date in a row.
   * e.g. 20120617150809 for 06/17/2012 15:08:09
   *
   * @api public
   * @return {String}
   */
  this.getRow = function() {
    return date.getFullYear() + getFullMonth() + getFullDay() + getFullHour() + getFullMinute() + getFullSecond();
  };
  
  var getFullHour = function() {
    return getFull(date.getHours());
  };
  var getFullSecond = function() {
    return getFull(date.getSeconds());
  };
  var getFull = function(value) {
    return value < 10 ? "0" + value : "" + value;
  };
  var getFullMinute = function() {
    return getFull(date.getMinutes());
  };
  
  var getFullDay = function() {
    return getFull(date.getDate());
  };
  
  var getFullMonth = function() {
    return getFull(date.getMonth() + 1);
  };
};

// line for node.js
if(typeof(exports) !== 'undefined' && typeof(exports.CommonDateFormat) === 'undefined') exports.CommonDateFormat = CommonDateFormat;
