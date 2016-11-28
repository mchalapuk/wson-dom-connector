[travis-url]: http://travis-ci.org/muroc/wson-dom-connector
[travis-image]: https://api.travis-ci.org/muroc/wson-dom-connector.svg

[david-url]: https://david-dm.org/muroc/wson-dom-connector
[david-image]: https://david-dm.org/muroc/wson-dom-connector.svg

[david-url-dev]: https://david-dm.org/muroc/wson-dom-connector?type=dev
[david-image-dev]: https://david-dm.org/muroc/wson-dom-connector/dev-status.svg

[npm-url]: https://npmjs.org/package/wson-dom-connector
[npm-image]: https://badge.fury.io/js/wson-dom-connector.svg

# wson-dom-connector

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-image-dev]][david-url-dev]
[![NPM version][npm-image]][npm-url]

[WSON][wson] is a human-readable data-interchange format with support for cyclic
structures. This module is an extension to wson that enables serializing
[DOM][dom] nodes to their [xpaths][xpath] and parsing those xpaths back to DOM
nodes.

[wson]: https://github.com/tapirdata/wson
[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[xpath]: https://www.w3.org/TR/xpath/

**Possible Use Cases**

 1. Store references to DOM elements between page reloads,
 2. Record DOM events to later simulate a user during automated test
    (needs [`wson-event-connector`][wson-event-connector]).

[wson-event-connector]: https://github.com/muroc/wson-event-connector

## Installation

```shell
npm install --save wson wson-dom-connector
```

## Usage

wson-dom-conector can be used in a web browser via [browserify][browserify]...

[browserify]: https://github.com/substack/node-browserify

```javascript
var WSON = require("wson").Wson;
var domConnectors = require("wson-dom-connector");

var wson = new WSON({
  connectors: domConnectors(window)
  });

console.log(wson.stringify(document.body));
// [:HTMLBodyElement|/body`a1`e]
```

...or in [node][node] with any standard-compliant DOM implementation
(e.g. [jsdom][jsdom]).

[node]: https://nodejs.org/en/
[jsdom]: https://github.com/tmpvar/jsdom

```javascript
var WSON = require("wson").Wson;
var domConnectors = require("wson-dom-connector");
var jsdom = require("jsdom");

var document = jsdom.jsdom("<body></body>")

var wson = new WSON({
  connectors: domConnectors(document.defaultView)
  });

console.log(wson.stringify(document.body));
// [:HTMLBodyElement|/body`a1`e]
```

## API
Please refer to [wson's documentation][wson] for further details.

## License

Copyright &copy; 2016 Maciej Chałapuk.
Released under [MIT license](LICENSE).

