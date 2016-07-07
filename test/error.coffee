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

class UnknownType extends Window

testParams = [
  [ undefined, 'window is required' ]
  [ new Window().without('document'), 'window.document is required' ]
  [ new Window().without('Window'), 'window.Window is required' ]
  [ new Window().without('Document'), 'window.Document is required' ]
  [ new Window().with('Window', {}), 'window.Window must be a function' ]
  [ new Window().with('Document', {}), 'window.Document must be a function' ]
  [ new UnknownType(), 'window must be of type window.Window' ]
  [ new Window().with('document', {}), 'window.document must be of type window.Document' ]
]

describe "wson-dom-connector called with illegal argument", ->
  for params in testParams
    do (params)->
      [ arg, expectedMessage ] = params

      describe "( #{arg} )", ->
        it "should throw Error('#{expectedMessage}')", ->
          should(-> connectors arg).throw(expectedMessage)


