// license: MIT
'use strict';

var xpathPosition = require('simple-xpath-position');

module.exports = DomXPathConnector;

function DomXPathConnector(NodeConstructor, documentNode) {
  function xPathFromNode(node) {
    return [ xpathPosition.fromNode(node, documentNode) ];
  }
  function nodeFromXPath(xpath) {
    return xpathPosition.toNode(xpath[0], documentNode);
  }

  return {
    by: NodeConstructor,
    split: xPathFromNode,
    create: nodeFromXPath,
  };
}

