// license: MIT
'use strict';

var xpathPosition = require('simple-xpath-position');

module.exports = forAllDomInterfaces;

function XPathConnector(NodeConstructor, documentNode) {
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

function SingletonConnector(NodeConstructor, instance) {
  function checkSameInstance(node) {
    if (node !== instance) {
      throw new Error('The supplied node is not contained by the root node.');
    }
    return [];
  }
  function getInstance() {
    return instance;
  }

  return {
    by: NodeConstructor,
    split: checkSameInstance,
    create: getInstance
  }
}

var XPathableDomInterfaces = [
  'Node','Text', 'Comment', 'CDATASection', 'ProcessingInstruction', 'Element',
  'HTMLAnchorElement', 'HTMLAppletElement', 'HTMLAreaElement', 'HTMLAudioElement',
  'HTMLBaseElement', 'HTMLBodyElement', 'HTMLBRElement', 'HTMLButtonElement', 'HTMLCanvasElement',
  'HTMLDataElement', 'HTMLDataListElement', 'HTMLDialogElement', 'HTMLDirectoryElement',
  'HTMLDivElement', 'HTMLDListElement', 'HTMLElement', 'HTMLEmbedElement', 'HTMLFieldSetElement',
  'HTMLFontElement', 'HTMLFormElement', 'HTMLFrameElement', 'HTMLFrameSetElement',
  'HTMLHeadElement', 'HTMLHeadingElement', 'HTMLHtmlElement', 'HTMLHRElement', 'HTMLIFrameElement',
  'HTMLImageElement', 'HTMLInputElement', 'HTMLKeygenElement', 'HTMLLabelElement',
  'HTMLLegendElement', 'HTMLLIElement', 'HTMLLinkElement', 'HTMLMapElement', 'HTMLMediaElement',
  'HTMLMenuElement', 'HTMLMetaElement', 'HTMLMeterElement', 'HTMLModElement', 'HTMLObjectElement',
  'HTMLOListElement', 'HTMLOptGroupElement', 'HTMLOptionElement', 'HTMLOutputElement',
  'HTMLParagraphElement', 'HTMLParamElement', 'HTMLPreElement', 'HTMLProgressElement',
  'HTMLQuoteElement', 'HTMLScriptElement', 'HTMLSelectElement', 'HTMLSourceElement',
  'HTMLSpanElement', 'HTMLStyleElement', 'HTMLTableElement', 'HTMLTableCaptionElement',
  'HTMLTableCellElement', 'HTMLTableDataCellElement', 'HTMLTableHeaderCellElement',
  'HTMLTableColElement', 'HTMLTableRowElement', 'HTMLTableSectionElement', 'HTMLTextAreaElement',
  'HTMLTimeElement', 'HTMLTitleElement', 'HTMLTrackElement', 'HTMLUListElement',
  'HTMLUnknownElement', 'HTMLVideoElement', 'HTMLBaseFontElement', 'HTMLIsIndexElement',
  'SVGAElement', 'SVGAltGlyphElement', 'SVGAltGlyphDefElement', 'SVGAltGlyphItemElement',
  'SVGAnimationElement', 'SVGAnimateElement', 'SVGAnimateColorElement', 'SVGAnimateMotionElement',
  'SVGAnimateTransformElement', 'SVGCircleElement', 'SVGClipPathElement', 'SVGColorProfileElement',
  'SVGComponentTransferFunctionElement', 'SVGCursorElement', 'SVGDefsElement', 'SVGDescElement',
  'SVGElement', 'SVGEllipseElement', 'SVGFEBlendElement', 'SVGFEColorMatrixElement',
  'SVGFEComponentTransferElement', 'SVGFECompositeElement', 'SVGFEConvolveMatrixElement',
  'SVGFEDiffuseLightingElement', 'SVGFEDisplacementMapElement', 'SVGFEDistantLightElement',
  'SVGFEFloodElement', 'SVGFEGaussianBlurElement', 'SVGFEImageElement', 'SVGFEMergeElement',
  'SVGFEMergeNodeElement', 'SVGFEMorphologyElement', 'SVGFEOffsetElement',
  'SVGFEPointLightElement', 'SVGFESpecularLightingElement', 'SVGFESpotLightElement',
  'SVGFETileElement', 'SVGFETurbulenceElement', 'SVGFEFuncRElement', 'SVGFEFuncGElement',
  'SVGFEFuncBElement', 'SVGFEFuncAElement', 'SVGFilterElement',
  'SVGFilterPrimitiveStandardAttributes', 'SVGFontElement', 'SVGFontFaceElement',
  'SVGFontFaceFormatElement', 'SVGFontFaceNameElement', 'SVGFontFaceSrcElement',
  'SVGFontFaceUriElement', 'SVGForeignObjectElement', 'SVGGElement', 'SVGGlyphElement',
  'SVGGlyphRefElement', 'SVGGradientElement', 'SVGHKernElement', 'SVGImageElement',
  'SVGLinearGradientElement', 'SVGLineElement', 'SVGMarkerElement', 'SVGMaskElement',
  'SVGMetadataElement', 'SVGMissingGlyphElement', 'SVGMPathElement', 'SVGPathElement',
  'SVGPatternElement', 'SVGPolylineElement', 'SVGPolygonElement', 'SVGRadialGradientElement',
  'SVGRectElement', 'SVGScriptElement', 'SVGSetElement', 'SVGStopElement', 'SVGStyleElement',
  'SVGSVGElement', 'SVGSwitchElement', 'SVGSymbolElement', 'SVGTextElement', 'SVGTextPathElement',
  'SVGTitleElement', 'SVGTRefElement', 'SVGTSpanElement', 'SVGUseElement', 'SVGViewElement',
  'SVGVKernElement',
];

function forAllDomInterfaces(window) {
  check(window, 'window')
    .isNotEmpty()
    .isOfType(window.Window, 'window.Window');
  var document = check(window.document, 'window.document')
    .isNotEmpty()
    .isOfType(window.Document, 'window.Document')
    .value;

  var connectors = {};
  XPathableDomInterfaces.forEach(function(name) {
    if (typeof window[name] !== 'function') {
      return;
    }
    connectors[name] = new XPathConnector(window[name], document);
  });
  connectors.Window = new SingletonConnector(window.Window, window);
  connectors.Document = new SingletonConnector(window.Document, document);
  connectors.XMLDocument = new SingletonConnector(window.XMLDocument, document);
  return connectors;
}

function check(value, name) {
  var that = {};
  that.value = value;
  that.name = name;
  that.__proto__ = check.prototype;
  return that;
}

check.prototype = {
  isNotEmpty: function() {
    if (!this.value) {
      throw new Error(this.name +' is required');
    }
    return this;
  },
  isFunction: function() {
    if (typeof this.value !== 'function') {
      throw new Error(this.name +' must be a function');
    }
    return this;
  },
  isOfType: function(constructor, typeName) {
    check(constructor, typeName)
      .isNotEmpty()
      .isFunction();

    if (this.value.constructor !== constructor) {
      throw new Error(this.name +' must be of type '+ typeName);
    }
    return this;
  },
};

