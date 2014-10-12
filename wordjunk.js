module.exports = {

  stopWords: [ "a", "i", "it", "am", "at", "on", "in", "to", "too", "very", "of", "from", "here", "even", "the", "but", "and", "is", "my", "them", "then", "this", "that", "than", "though", "so", "are" ],

  //first: Take the text to lowercase.
  //second: remove punctuation.
  //convert to Array and remove duplicates.
  //remove useless words like connectors.
  removePunctuation: function (someText) {
    var finalString;
    var punctuationless;
    punctuationless = someText.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    finalString = punctuationless.replace(/\s{2,}/g, " ");
    return finalString;
  },

  convertToArray: function(someText) {
    someText = someText.split(" ");
    return someText;
  },

  removeDuplicates: function(someArray) {
    uniqueObject = {};
    for (var i = 0; i < someArray.length; i++) {
      uniqueObject[someArray[i]] = someArray[i];
      }
      uniqueArray = [];
      for (var key in uniqueObject) {
          uniqueArray.push(key);
      }
      return uniqueArray;
  },

  removeWords: function(someArray) {
      for (var i = 0; i < this.stopWords.length; i++) {
          var arrlen = someArray.length;
          for (var j = 0; j < arrlen; j++) {
              if (this.stopWords[i] == someArray[j]) {
                  someArray = someArray.slice(0, j).concat(someArray.slice(j + 1, arrlen));
              }
          }
      }
      return(someArray);
  }

};