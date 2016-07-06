[npm-url]: https://npmjs.org/package/wson-dom-connector
[npm-image]: https://img.shields.io/npm/v/wson-dom-connector.svg?maxAge=2592000

[travis-url]: http://travis-ci.org/webfront-toolkit/wson-dom-connector
[travis-image]: https://img.shields.io/travis/webfront-toolkit/wson-dom-connector.svg?maxAge=2592000

[david-url]: https://david-dm.org/webfront-toolkit/wson-dom-connector
[david-image]: https://david-dm.org/webfront-toolkit/wson-dom-connector.svg

[david-url-dev]: https://david-dm.org/webfront-toolkit/wson-dom-connector#info=devDependencies
[david-image-dev]: https://david-dm.org/webfront-toolkit/wson-dom-connector/dev-status.svg

[license-url]: LICENSE
[license-image]: https://img.shields.io/github/license/webfront-toolkit/wson-dom-connector.svg?maxAge=2592000

# wson-dom-connector

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-image-dev]][david-url-dev]
[![License][license-image]][license-url]

[WSON][wson] is a human-readable data-interchange format with support for cyclic
structures. This module is an extension to wson that enables serializing
[DOM][dom] nodes to their [xpaths][xpath] and parsing those xpaths back to DOM
nodes.

[wson]: https://github.com/tapirdata/wson
[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[xpath]: https://www.w3.org/TR/xpath/

**Possible Use Cases**

 1. Store references to DOM elements between page reloads,
 2. Record DOM events to later simulate a user during automated test.

## Installation

```shell
npm install --save wson wson-dom-connector
```

## Usage

wson-dom-conector can be used in a web browser via [browserify][browserify]...

[browserify]: https://github.com/substack/node-browserify

```javascript
var WSON = require("wson");
var connectors = require("wson-dom-connector");

var wson = new WSON({
  connectors: domConnector(window, document)
  });

console.log(wson.stringify(document.body));
// [:HTMLBodyElement|/html`a1`e/body`a1`e]
```

...or in [node][node] with any standard-compliant DOM implementation
(e.g. [jsdom][jsdom]).

[node]: https://nodejs.org/en/
[jsdom]: https://github.com/tmpvar/jsdom

```javascript
var WSON = require("wson");
var connectors = require("wson-dom-connector");
var jsdom = require("jsdom");

var document = jsdom.jsdom("<body></body>")

var wson = new WSON({
  connectors: connectors(document.defaultView, document)
  });

console.log(wson.stringify(document.body));
// [:HTMLBodyElement|/html`a1`e/body`a1`e]
```

## API
Please refer to [wson's documentation][wson] for further details.

## License

Copyright &copy; 2016 Maciej Chałapuk.
Released under [MIT license](LICENSE).
