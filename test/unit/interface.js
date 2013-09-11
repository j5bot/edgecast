var test    = require('tap').test,
    edgecast  = require(__dirname + '/../../lib/index.js');

test('unit', function (t) {
    t.type(edgecast, 'function', 'module is a function');

    var ready = edgecast('apikey','account_number');
    t.type(ready, 'object', 'module exposes an object');
    t.type(ready.request, 'function', 'request method exists');
    t.end();
});