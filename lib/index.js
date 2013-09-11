/**
 * Edgecast API client.
 *
 * @package Edgecast 
 * @author J5 <j5@addthis.com> based on Fastly API Client by Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var request = require('request');

/**
 * Constructor
 */
function Edgecast (apikey, accountNumber) {
    this.apikey = apikey || '';
    this.accountNumber = accountNumber || '';
}

/**
 * Adapter helper method.
 *
 * @param {string} Method
 * @param {string} URL API endpoint
 * @param {object, optional} json request body to send
 * @param {function} callback function to call with response
 *
 * @return {Object}
 */
Edgecast.prototype.request = function (method, url, json, callback) {
    var self = this;

    // Handle params
    if (typeof callback === 'undefined') {
        callback = host;
        host = false;
    }

    // Construct headers
    var headers = {
        'Authorization': 'TOK:' + self.apikey,
        'Accept': 'JSON: Application/JSON',
        'Content-Type': 'JSON: Application/JSON',
        'Host': 'api.edgecast.com'
    };

    // HTTP request
    request({
        method:     method,
        url:        'https://api.edgecast.com/v2/mcc/customers/' + this.accountNumber + '/' + url,
        headers:    headers,
        json:       json || {}
    }, function (err, response, body) {
        if (err) return callback(err);
        if (response.code < 200 || response.code > 302) return callback(body);
        if (response.code === 200) callback(null, { status: 'ok', id: this.accountNumber });
    });
};

// -------------------------------------------------------

// return the edgecast type integer for the type as string
Edgecast.prototype.getType = function (type) {
    switch (type.toLowerCase()) {
        case 'windows media':
        case 'windows_media':
            return 1;
        case 'flash':
            return 2;
        case 'http large':
        case 'http_large':
            return 3;
        case 'http small':
        case 'http_small':
            return 8;
        case 'application':
        case 'adn':
            return 14;
        case undefined:
            return 8;
        default:
            return parseInt(type, 10);
    }
};

Edgecast.prototype.purge = function (host, url, callback, type) {
    this.request('PUT', 'edge/purge', { MediaPath: host + url, MediaType: this.getType(type) }, callback);
};

// uses wildcards and recursive purging ... must get the CNAME as the service parameter
Edgecast.prototype.purgeAll = function (service /* huh? */, callback, type) {
    this.request('PUT', 'edge/purge', { MediaPath: service + '/*', MediaType: this.getType(type) }, callback);
};

// Edgecast.prototype.stats = function (service, callback) {
//     var url = '/service/' + encodeURIComponent(service) + '/stats/summary';
//     this.request('GET', url, callback);
// };

/**
 * Export
 */
module.exports = function (apikey, accountNumber) {
    return new Edgecast(apikey, accountNumber);
};