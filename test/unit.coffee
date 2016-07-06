mocha = require 'mocha'
should = require 'should'

jsdom = require 'jsdom'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

document = null
window = null

before ->
  document = jsdom.jsdom()
  window = document.defaultView
after ->
  window.close()

getBody = (doc)-> doc.body
getDocument = (doc)-> doc

testParams = [
  [ 'HTMLBodyElement', getBody, [ '/html[1]/body[1]' ] ]
  [ 'Document', getDocument, [] ]
]

for params in testParams
  do (params)->
    [ name, getTestedNode, expectedSplit ] = params

    describe "connector.#{name}", ->
      testedConnector = null

      before ->
        testedConnector = connectors(window, document)[name]

      describe ".by", ->
        it "should be #{name}'s constructor", ->
          testedConnector.by.should.be.exactly window[name]

      describe ".split", ->
        it "should throw when called with node from another document", ->
          anotherDocument = jsdom.jsdom()
          should(-> testedConnector.split getTestedNode anotherDocument)
            .throw 'The supplied node is not contained by the root node.'

        it "should return proper xpath of #{name}", ->
          node = getTestedNode document
          actualSplit = testedConnector.split node
          actualSplit.should.be.eql expectedSplit

      describe ".create", ->
        it "should return the same node from which xpath was created", ->
          node = getTestedNode document
          xpath = testedConnector.split node
          testedConnector.create(xpath).should.be.exactly node

