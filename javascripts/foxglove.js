!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Foxglove=e():"undefined"!=typeof global?global.Foxglove=e():"undefined"!=typeof self&&(self.Foxglove=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Foxglove, WordTypeWheel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty;

WordTypeWheel = require('./word_type_wheel.coffee');

/*
This pulls two words from the dictionary api, smashes them together,
and puts them into our page.

DEPENDENCIES: jQuery, Kinect.js
*/


Foxglove = (function() {
  /*
  @param options [Object] An object of initialization options
  @option options [String] container (required) A jQuery element in which we'll place our generated words
  */

  function Foxglove(options) {
    this.success = __bind(this.success, this);
    this.wordContainer = options.container;
  }

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

})();

Foxglove.WordTypeWheel = WordTypeWheel;

module.exports = Foxglove;


},{"./word_type_wheel.coffee":2}],2:[function(require,module,exports){
/*
A {WordTypeWheel} contains a number of `@wordTypes` that can be re-ordered at will.
The {WordTypeWheel} will emit an event when the wheel is clicked, declaring the currently
selected wordType.  It will also allow the user to scroll between currently active wordTypes
with the flick of a finger, move of the mouse, etc.
*/

var WordTypeWheel;

WordTypeWheel = (function() {
  function WordTypeWheel() {
    this.wordTypes = ['noun', 'verb', 'adjective', 'pronoun', 'predicate'];
  }

  WordTypeWheel.prototype.getCurrent = function() {
    return this.currentWordType = this.wordTypes[2];
  };

  WordTypeWheel.prototype.up = function() {
    var type;
    type = this.wordTypes.shift();
    return this;
  };

  return WordTypeWheel;

})();

module.exports = WordTypeWheel;


},{}]},{},[1])
(1)
});
;