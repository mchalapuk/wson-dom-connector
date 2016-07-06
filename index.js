// license: MIT
'use strict';

var xpathPosition = require('simple-xpath-position');

module.exports = DomXPathConnector;
module.exports.forAllDomInterfaces = forAllDomInterfaces;

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

var DomInterfaces = [
  'Node','Text', 'Comment', 'CDATASection', 'ProcessingInstruction', 'Element',
  'Document', 'XMLDocument', 'DocumentFragment', 'DocumentType', 'Window',
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

function forAllDomInterfaces(window, document) {
  var connectors = {};
  DomInterfaces.forEach(function(name) {
    if (typeof window[name] === 'undefined') {
      return;
    }
    connectors[name] = new DomXPathConnector(window[name], document);
  });
  return connectors;
}

