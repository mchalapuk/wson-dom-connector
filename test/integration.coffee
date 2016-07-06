should = require 'should'
mocha = require 'mocha'

jsdom = require 'jsdom'
WSON = require 'wson'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

getBodysFirstChild = (win)-> win.document.body.firstChild
getDocument = (win)-> win.document
getWindow = (win)-> win

pageHtml = '<body><div>'

testParams = [
  [ 'HTMLDivElement', getBodysFirstChild, '[:HTMLDivElement|/html`a1`e/body`a1`e/div`a1`e]' ]
  [ 'Document', getDocument, '[:Document]' ]
  [ 'Window', getWindow, '[:Window]' ]
]

describe "WSON with all connectors", ->
  window = null
  testedWSON = null

  before ->
    window = jsdom.jsdom(pageHtml).defaultView
    testedWSON = new WSON connectors: connectors window, window.document
  after ->
    window.close()

  describe ".stringify", ->
    for params in testParams
      do (params)->
        [name, getTestedNode, expectedString] = params

        it "should serialize a #{name} to #{expectedString}", ->
          node = getTestedNode window
          serialized = testedWSON.stringify node
          serialized.should.equal expectedString

  describe ".parse", ->
    for params in testParams
      do (params)->
        [name, getTestedNode, expectedString] = params

        it "should return the same instance of #{name} as was passed to .stringify", ->
          node = getTestedNode window
          serialized = testedWSON.stringify node
          deserialized = testedWSON.parse serialized
          (deserialized is node).should.be.true

        it "should parse #{name} from another document", ->
          node = getTestedNode window
          serialized = testedWSON.stringify node
          anotherWindow = jsdom.jsdom(pageHtml).defaultView
          anotherWSON = new WSON connectors: connectors anotherWindow, anotherWindow.document
          anotherNode = getTestedNode anotherWindow
          deserialized = anotherWSON.parse serialized
          (deserialized is anotherNode).should.be.true

