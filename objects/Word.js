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
  this.word = pizzaWords[Math.floor(Math.random() * (pizzaWords.length - 1))];
  this.jumble = setJumble(this.word);
};

function setJumble(word) {
  var jumble = [];
  for (var i = 0; i < word.length; i++) {
    var char = new Char(word.charAt(i));
    jumble.push(char);
  }
//   console.log(jumble);
  return jumble;
}

module.exports = Word;
