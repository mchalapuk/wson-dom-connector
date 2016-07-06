should = require 'should'
mocha = require 'mocha'

jsdom = require 'jsdom'
WSON = require 'wson'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

document = null
window = null
testedWSON = null

before ->
  document = jsdom.jsdom '<body><div>'
  window = document.defaultView
  testedWSON = new WSON connectors: connectors window, document
after ->
  window.close()

getBodysFirstChild = (doc)-> doc.body.firstChild
getDocument = (doc)-> doc

testParams = [
  [ 'HTMLDivElement', getBodysFirstChild, '[:HTMLDivElement|/html`a1`e/body`a1`e/div`a1`e]' ]
  [ 'Document', getDocument, '[:Document]' ]
]

describe "WSON with all connectors", ->
  describe ".stringify", ->
    for params in testParams
      do (params)->
        [name, getTestedNode, expectedString] = params

        it "should serialize a #{name} to #{expectedString}", ->
          node = getTestedNode document
          serialized = testedWSON.stringify node
          serialized.should.equal expectedString

  describe ".parse", ->
    for params in testParams
      do (params)->
        [name, getTestedNode, expectedString] = params

        it "should return the same instance of #{name} as was passed to .stringify", ->
          node = getTestedNode document
          serialized = testedWSON.stringify node
          deserialized = testedWSON.parse serialized
          deserialized.should.be.exactly node

        it "should parse #{name} from another document", ->
          node = getTestedNode document
          serialized = testedWSON.stringify node
          anotherDocument = jsdom.jsdom document.body.outerHTML
          anotherWindow = anotherDocument.defaultView
          anotherWSON = new WSON connectors: connectors anotherWindow, anotherDocument
          anotherNode = getTestedNode anotherDocument
          deserialized = anotherWSON.parse serialized
          deserialized.should.be.exactly anotherNode

