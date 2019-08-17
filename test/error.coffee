mocha = require 'mocha'
should = require 'should'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

class Document

class Window
  constructor:->
    @Window = Window
    @Document = Document
    @document = new Document()
  without: (key)->
    @with(key, undefined)
  with: (key, value)->
    @changed = key
    @[@changed] = value
    @
  toString: ()->
    str = "#{@constructor.name} {"
    str += " #{@changed}: #{@[@changed]}, " if @changed?
    str += "... }"
    str

class UnknownType
  Window: Window
  Document: Document

testParams = [
  [ undefined, 'window must not be null or undefined (got undefined)' ]
  [ new Window().without('document'), 'window.document must be an instance of Document (got undefined)' ]
  [ new Window().without('Window'), 'window.Window must be a function (got undefined)' ]
  [ new Window().without('Document'), 'window.Document must be a function (got undefined)' ]
  [ new Window().with('Window', {}), 'window.Window must be a function (got {})' ]
  [ new Window().with('Document', {}), 'window.Document must be a function (got {})' ]
  [ new UnknownType(), 'window must be an instance of Window (got {})' ]
  [ new Window().with('document', {}), 'window.document must be an instance of Document (got {})' ]
]

describe "wson-dom-connector called with illegal argument", ->
  for params in testParams
    do (params)->
      [ arg, expectedMessage ] = params

      describe "( #{arg} )", ->
        it "should throw Error('#{expectedMessage}')", ->
          should(-> connectors arg).throw(expectedMessage)


