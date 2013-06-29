###
This pulls two words from the dictionary api, smashes them together,
and puts them into our page.
###
class Foxglove


  ###
  Generates the URL we use to grab data from our dictionary api

  @return [String] A URL string
  ###
  generateAPIUrl: ->
    params =
      api_key: '8f99033d4a9c15332f00c0e62ae083bbf4c9c998a9c928de2'
      limit: 2
      minLength: 2
      maxLength: 6
      hasDictionaryDef: true
      includePartOfSpeech: 'noun'
      minCorpusCount: 0
      maxCorpusCount: -1
      minDictionaryCount: 1
      maxDictionaryCount: -1

    string = ''

    for own k, v of params
      string += "&#{k}=#{v}"

    "http://api.wordnik.com/v4/words.json/randomWords?#{string}"


  ###
  Use the dictionary API to get two nouns and smash them together
  ###
  generateAndShowResult: ->
    $.ajax
      url: @generateAPIUrl()
      type: 'GET'
    .done(@success)


  ###
  Process the request's response when we get it, pull out the relevant
  data and inject it into the HTML

  @param [Object] The response object
  ###
  success: (r) =>
    nouns = @pullDataFromResponse r
    @insertWordsIntoDocument nouns


  ###
  Takes two words and puts them into the document

  @param [Array] Two nouns in an array
  ###
  insertWordsIntoDocument: (nouns) ->
    spans = []

    for noun, i in nouns
      span = $("<span id='word-#{i + 1}'>")
      span.html noun
      spans.push span

    wordContainer = $('blockquote')
    wordContainer.empty()

    for span in spans
      wordContainer.append span


  ###
  @param [Object] A JSON response object from the dictionary API

  @return [Array] Two words pulled from the response object
  ###
  pullDataFromResponse: (r) ->
    if @random()
      [r[0].word, r[1].word]
    else
      [r[1].word, r[0].word]


  ###
  Randomly generate either a 0 or 1

  @return [Number] 0 or 1
  ###
  random: ->
    Math.floor(Math.random() * 2)
