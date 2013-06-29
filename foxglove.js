// Generated by CoffeeScript 1.6.3
/*
This pulls two words from the dictionary api, smashes them together,
and puts them into our page.

DEPENDENCIES: jQuery.
*/

var Foxglove, root, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.FoxgloveConstructor = function(options) {
  this.initialize.apply(this, arguments);
  return this;
};

Foxglove = (function(_super) {
  __extends(Foxglove, _super);

  function Foxglove() {
    this.success = __bind(this.success, this);
    _ref = Foxglove.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  @param options [Object] An object of initialization options
  @option options [String] container (required) A jQuery element in which we'll place our generated words
  */


  Foxglove.prototype.initialize = function(options) {
    return this.wordContainer = options.container;
  };

  /*
  Generates the URL we use to grab data from our dictionary api
  
  @return [String] A URL string
  */


  Foxglove.prototype.generateAPIUrl = function() {
    var k, params, string, v;
    params = {
      api_key: '8f99033d4a9c15332f00c0e62ae083bbf4c9c998a9c928de2',
      limit: 2,
      minLength: 2,
      maxLength: 6,
      hasDictionaryDef: true,
      includePartOfSpeech: 'noun',
      minCorpusCount: 0,
      maxCorpusCount: -1,
      minDictionaryCount: 1,
      maxDictionaryCount: -1
    };
    string = '';
    for (k in params) {
      if (!__hasProp.call(params, k)) continue;
      v = params[k];
      string += "&" + k + "=" + v;
    }
    return "http://api.wordnik.com/v4/words.json/randomWords?" + string;
  };

  /*
  Use the dictionary API to get two nouns and smash them together
  */


  Foxglove.prototype.generateAndShowResult = function() {
    return $.ajax({
      url: this.generateAPIUrl(),
      type: 'GET'
    }).done(this.success);
  };

  /*
  Process the request's response when we get it, pull out the relevant
  data and inject it into the HTML
  
  @param [Object] The response object
  */


  Foxglove.prototype.success = function(r) {
    var nouns;
    nouns = this.pullDataFromResponse(r);
    return this.insertWordsIntoDocument(nouns);
  };

  /*
  Takes two words and puts them into the document
  
  @param [Array] Two nouns in an array
  */


  Foxglove.prototype.insertWordsIntoDocument = function(nouns) {
    var i, noun, span, spans, _i, _j, _len, _len1, _results;
    spans = [];
    for (i = _i = 0, _len = nouns.length; _i < _len; i = ++_i) {
      noun = nouns[i];
      span = $("<span id='word-" + (i + 1) + "'>");
      span.html(noun);
      spans.push(span);
    }
    this.wordContainer.empty();
    _results = [];
    for (_j = 0, _len1 = spans.length; _j < _len1; _j++) {
      span = spans[_j];
      _results.push(this.wordContainer.append(span));
    }
    return _results;
  };

  /*
  @param [Object] A JSON response object from the dictionary API
  
  @return [Array] Two words pulled from the response object
  */


  Foxglove.prototype.pullDataFromResponse = function(r) {
    if (this.random()) {
      return [r[0].word, r[1].word];
    } else {
      return [r[1].word, r[0].word];
    }
  };

  /*
  Randomly generate either a 0 or 1
  
  @return [Number] 0 or 1
  */


  Foxglove.prototype.random = function() {
    return Math.floor(Math.random() * 2);
  };

  return Foxglove;

})(FoxgloveConstructor);
