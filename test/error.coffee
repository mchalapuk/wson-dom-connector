mocha = require 'mocha'
should = require 'should'

jsdom = require 'jsdom'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

getDocument = (win)-> win.document
getWindow = (win)-> win
getUndefined = -> undefined

testParams = [
  [ 'window', getWindow, 'undefined', getUndefined, 'Root node argument is required.' ]
  [ 'undefined', getUndefined, 'document', getDocument, 'Namespace argument is required.' ]
  [ 'undefined', getUndefined, 'undefined', getUndefined, 'Namespace argument is required.' ]
]

describe "wson-dom-connector", ->
  window = null

  beforeEach ->
    window = jsdom.jsdom().defaultView
  afterEach ->
    window.close()

  for params in testParams
    do (params)->
      [ namespaceName, getNamespace, rootName, getRootNode, expectedMessage ] = params

      it "should throw when called with arguments (#{namespaceName}, #{rootName})", ->
        should(-> connectors getNamespace(window), getRootNode(window)).throw(expectedMessage)

