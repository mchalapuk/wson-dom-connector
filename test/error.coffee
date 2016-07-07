mocha = require 'mocha'
should = require 'should'

delete require.cache[ require.resolve '../' ]
connectors = require '../'

testParams = [
  [ undefined, 'window is required' ]
  [ null, 'window is required' ]
  [ {}, 'window.document is required' ]
]

describe "wson-dom-connector", ->
  for params in testParams
    do (params)->
      [ arg, expectedMessage ] = params

      describe "( #{arg} )", ->
        it "should throw Error('#{expectedMessage}')", ->
          should(-> connectors arg).throw(expectedMessage)

