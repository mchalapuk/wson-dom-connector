should = require 'should'
mocha = require 'mocha'
_ = require 'underscore'

jsdom = require 'jsdom'
WSON = require 'wson'

#delete require.cache[ require.resolve '../' ]
DomXPathConnector = require '../'

describe 'WSON with DomXPathConnector', ->
  document = null
  window = null
  testedWSON = null

  before ->
    document = jsdom.jsdom '<body><div></div></body>'
    window = document.defaultView
    testedWSON = new WSON connectors: DomXPathConnector.forAllDomInterfaces(window, document)

  describe '.stringify', ->
    it 'should serialize an element', ->
      serialized = testedWSON.stringify document.body.firstChild
      serialized.should.equal '[:HTMLDivElement|/html`a1`e/body`a1`e/div`a1`e]'

  describe '.parse', ->
    it 'should return the same instance of element as was passed to .stringify', ->
      serialized = testedWSON.stringify document.body.firstChild
      testedWSON.parse(serialized).should.be.exactly document.body.firstChild

    describe 'when called on WSON with connector from another HTML document', ->
      it 'should return element of xpath relative to this document', ->
        serialized = testedWSON.stringify document.body.firstChild
        anotherDocument = jsdom.jsdom document.body.outerHTML
        anotherWindow = anotherDocument.defaultView
        anotherWSON = new WSON connectors: {
          'HTMLDivElement': DomXPathConnector(anotherWindow.HTMLDivElement, anotherDocument),
        }
        anotherWSON.parse(serialized).should.be.exactly anotherDocument.body.firstChild



