class Foxglove


  generate: ->
    # Pull two nouns from DictionaryAPI
    nouns = DictionaryAPI.pull 'nouns', 2

    # Smash the nouns together
    @result = smash nouns


  smash: (nouns) ->
    nouns.join ''
