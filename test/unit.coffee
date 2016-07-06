mocha = require 'mocha'
should = require 'should'

jsdom = require 'jsdom'
_ = require 'underscore'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

describe 'DomXPathConnector', ->
  document = null
  testedConnector = null

  before ->
    document = jsdom.jsdom '<body><div></div></body>'
    testedConnector = connectors(document.defaultView, document).Node

  describe '.by', ->

    it 'should be node\'s constructor', ->
      testedConnector.by.should.be.exactly document.defaultView.Node

  describe '.split', ->

    it 'should throw when called with node from another document', ->
      anotherDocument = jsdom.jsdom '<body><div></div></body>'

      should(-> testedConnector.split anotherDocument.body)
        .throw 'The supplied node is not contained by the root node.'

    it 'should return proper xpath of document\'s body', ->
      testedConnector.split(document.body).should.be.eql [ '/html[1]/body[1]' ]

    it 'should return proper xpath of body\'s firstChild', ->
      testedConnector.split(document.body.firstChild).should.be.eql [ '/html[1]/body[1]/div[1]' ]

  describe '.create', ->

    it 'should return the same node from which xpath was created', ->
      xpath = testedConnector.split(document.body)
      testedConnector.create(xpath).should.be.exactly(document.body)

