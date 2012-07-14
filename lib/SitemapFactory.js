/*!
 * Node-Hampelmann
 * Copyright(c) 2012 KNURT Systeme (http://knurtsysteme.de)
 * MIT License
 */

/**
 * construct a google sitemap as xml from an object
 * 
 * @param {String}
 *          baseurl the base url
 * @api public
 * @since 0.0.1 (07/11/2012)
 */
var SitemapFactory = function(baseurl) {

  var defaultChangefreq = 'monthly';

  /**
   * return the given changefreq as string for use with sitemap xml. if the
   * given changefreq is not valid use default
   * 
   * @api private
   */
  var formatChangefreq = function(changefreq) {
    return [ 'never', 'yearly', 'monthly', 'weekly', 'daily', 'hourly', 'always' ].indexOf((changefreq + "").toLowerCase()) == -1 ? defaultChangefreq
        : changefreq;
  };

  /**
   * return the given changefreq as string for use with sitemap xml
   * 
   * @api private
   */
  var formatPriority = function(priority) {
    var result = priority;
    if (Object.prototype.toString.call(result) === '[object Number]') {
      result = result.toFixed(2);
    }
    return result;
  };

  /**
   * return the given loc as string for use with sitemap xml
   * 
   * @api private
   */
  var formatLoc = function(loc) {
    var result = loc;
    if (result.indexOf("/") == 0)
      result = result.substr(1);
    result = baseurl + result;
    // ↘ remove leading slash in full path
    if (result.lastIndexOf("/") == result.length - 1)
      result = result.substr(0, result.length - 1);
    return result;
  };

  /**
   * return the given date as string for use with sitemap xml
   * 
   * @api private
   */
  var formatLastmod = function(date) {
    var result = '';
    if (Object.prototype.toString.call(date) === '[object Date]') {
      var cdf = require('./CommonDateFormat');
      result = new cdf.CommonDateFormat(date).getW3CDateTime();
    } else if (Object.prototype.toString.call(date) === '[object String]') {
      result = date;
    } else {
      console.error("date must be a string or an date. " + Object.prototype.toString.call(date) + " given. use now.");
      result = formatLastmod(new Date());
    }
    return result;

  };

  /**
   * return the google sitemap
   * 
   * @param {Array}
   *          urlset array of objects representing the sitemap
   * @param {Object}
   *          defaults used if an attribute in urlset is not given
   * @api public
   * @return {String} the google sitemap
   */
  this.get = function(urlset, defaults) {
    if (Object.prototype.toString.call(urlset) !== '[object Array]')
      throw 'urlset must be an array';
    var result = '<?xml version="1.0" encoding="UTF-8"?>', loc, lastmod, changefreq, priority;
    result += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
    defaults = defaults || {};
    defaults.lastmod = new Date();
    defaults.priority = defaults.priority || 1;
    defaults.changefreq = defaults.changefreq || defaultChangefreq;

    // ↘ correct baseurl (always leading slash)
    if (baseurl.lastIndexOf("/") != baseurl.length - 1)
      baseurl += "/";

    // ↓ generate url elements
    for ( var i in urlset) {
      var url = urlset[i];

      loc = url.loc || '';
      loc = formatLoc(loc);

      lastmod = url.lastmod || defaults.lastmod;
      lastmod = formatLastmod(lastmod);

      changefreq = url.changefreq || defaults.changefreq;
      changefreq = formatChangefreq(changefreq);

      priority = url.priority || defaults.priority;
      priority = formatPriority(priority);

      result += '<url>';
      result += '<loc>' + loc + '</loc>';
      result += '<lastmod>' + lastmod + '</lastmod>';
      result += '<changefreq>' + changefreq + '</changefreq>';
      result += '<priority>' + priority + '</priority>';
      result += '</url>';
    }
    result += '</urlset>';
    return result;
  };
};

// line for node.js
if (typeof (exports) !== 'undefined' && typeof (exports.SitemapFactory) === 'undefined')
  exports.SitemapFactory = SitemapFactory;
