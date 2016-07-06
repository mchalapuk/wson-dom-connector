mocha = require 'mocha'
should = require 'should'

jsdom = require 'jsdom'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

describe 'connector.HTMLBodyElement', ->
  document = null
  window = null

  testedConnector = null

  before ->
    document = jsdom.jsdom()
    window = document.defaultView
    testedConnector = connectors(window, document).HTMLBodyElement
  after ->
    window.close()

  describe '.by', ->

    it 'should be node\'s constructor', ->
      testedConnector.by.should.be.exactly window.HTMLBodyElement

  describe '.split', ->

    it 'should throw when called with node from another document', ->
      anotherDocument = jsdom.jsdom()

      should(-> testedConnector.split anotherDocument.body)
        .throw 'The supplied node is not contained by the root node.'

    it 'should return proper xpath of document\'s body', ->
      testedConnector.split(document.body).should.be.eql [ '/html[1]/body[1]' ]

  describe '.create', ->

    it 'should return the same node from which xpath was created', ->
      xpath = testedConnector.split document.body
      testedConnector.create(xpath).should.be.exactly document.body

