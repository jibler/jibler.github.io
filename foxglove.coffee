###
This pulls two words from the dictionary api, smashes them together
###
class Foxglove


  generateAPIUrl: ->
    apiKey = '8f99033d4a9c15332f00c0e62ae083bbf4c9c998a9c928de2'
    limit = 2
    minLength = 2
    maxLength = 6
    url = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=#{minLength}&maxLength=#{maxLength}&limit=#{limit}&api_key=#{apiKey}"



  generateAndAppend: ->
    @generate()


  ###
  Use the dictionary API to get two nouns and smash them together
  ###
  generate: ->
    $.ajax
      url: @generateAPIUrl()
      type: 'GET'
    .done(@success)


  success: (r) =>
    nouns = @pullDataFromResponse r
    @nouns = @smash nouns
    @appendToDocument @nouns


  appendToDocument: (nouns) ->
    span = $('#results')
    span.html nouns


  pullDataFromResponse: (r) ->
    [r[0].word, r[1].word]


  ###
  Our current format is just to take two words and put them together
  with no spaces
  ###
  smash: (nouns) ->
    nouns.join ''
