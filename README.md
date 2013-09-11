## edgecast
### [Edgecast](http://www.edgecast.com) API client for Node.js

This client is based on the [Fastly API Client](http://github.com/thisandagain/fastly) by Andrew Sliwinski.  It attempts to conform to the same extended/helper interface as that API whil targetting the Edgecast CDN API.

[![Build Status](https://travis-ci.org/j5bot/edgecast.png?branch=master)](https://travis-ci.org/j5bot/edgecast)

### Installation
```bash
npm install git://github.com/j5bot/edgecast
```

#### In package.json Dependencies
```javascript
"edgecast": "git://github.com/j5bot/edgecast#master"
```

### Basic Use
```javascript
var edgecast = require('edgecast')('yourapikey', 'youraccountnumber');

edgecast.request('PUT', 'edge/purge', {
    MediaPath: 'http://foo.com/bar',
    MediaType: edgecast.getMediaType('http small')
    }, function (err, obj) {
        if (err) return console.dir(err);   // Oh no!
        console.dir(obj);                   // Response body from the edgecast API
    }
);
```

### Helper Methods
The edgecast module also includes a few limited "helper" methods that make working with common API resources a bit simpler:

<table width="100%">
    <tr>
        <th width="25%">Method</td>
        <th width="75%">Example</td>
    </tr>
    <tr>
        <td>purge</td>
        <td><pre lang="javascript"><code>edgecast.purge('host.com', '/index.html', callback);</code></pre></td>
    </tr>
    <tr>
        <td>purgeAll</td>
        <td><pre lang="javascript"><code>edgecast.purgeAll('host.com', callback);</code></pre></td>
    </tr>
</table>

### Testing
```bash
npm test
```