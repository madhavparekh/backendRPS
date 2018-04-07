const pizzaWords = [
  'pepperoni',
  'crust',
  'cheese',
  'slice',
  'olives',
  'sauce',
  'mushrooms',
  'salami',
  'pie',
  'pizza',
  'napoli',
  'italian',
  'italy',
  'sausage',
  'chicago',
  'combination',
  'margherita',
  'new york',
  'stromboli',
  'calzone',
  'marinara',
  'sicilian',
  'mama mia',
  'mozzarella',
  'chicago style',
];

var Char = require('./Char');

var Word = function() {
  this.word = pizzaWords[
    Math.floor(Math.random() * (pizzaWords.length - 1))
  ].toUpperCase();
  this.jumble = setJumble(this.word);
};

Word.prototype.displayWord = function() {
  var dispWord = '';
  this.jumble.forEach((char) => {
    dispWord += ' ' + char.display;
  });
  dispWord += ' ';
  return dispWord;
};

Word.prototype.getCharIndexes = function(charIndx, char) {
  var charIndxArr = [];
  var lastIndx = this.word.lastIndexOf(char);
  charIndxArr.push(charIndx);
  if (lastIndx !== charIndx) {
    charIndxArr.push(lastIndx);
    for (var i = charIndx; i < lastIndx; i += charIndx) {
      charIndx = this.word.indexOf(char, ++charIndx);
      charIndxArr.push(charIndx);
    }
  }
  return charIndxArr;
};

function setJumble(word) {
  var jumble = [];
  for (var i = 0; i < word.length; i++) {
    var char = new Char(word.charAt(i));
    jumble.push(char);
  }
  return jumble;
}

Word.prototype.isSolved = function() {
  var solved = true;
  this.jumble.forEach((char) => {
    if (!char.guessed) solved = false;
  });
  return solved;
};

module.exports = Word;
