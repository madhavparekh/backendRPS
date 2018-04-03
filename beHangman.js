var inquirer = require('inquirer');
var Char = require('./objects/Char');
var Word = require('./objects/Word');

var wins = 0;
var loses = 0;
var guessesLeft = 15;
var charGuessed = '';
var game = 1;
var name = '';

var word = new Word();
console.log(word.word);
var gameMsg = ' ';

inquirer
  .prompt([
    {
      type: 'type',
      message: `Welcome to game of Pizza Themed Hangman where all words are related to pizzas and pizza's origin.\n  Press key a thru z or space bar to solve\n  Your name?`,
      name: 'name',
    },
  ])
  .then((data) => {
    name = data.name || `Doe`;
    console.log(`  Welcome ${name}`);
    startGame();
  });

function startGame() {
  inquirer
    .prompt([
      {
        message: `Player: ${name} | Wins : ${wins} | Loses : ${loses} | Guesses Left : ${guessesLeft} | Letters Entered : ${charGuessed}\n  Solve this: ${word.displayWord()}\n `,
        name: 'char',
        type: 'text',
        validate: (char) => {
          if (/.[\w|\s]/.test(char)) return 'Enter single charactor';
          if (charGuessed.indexOf(char.toUpperCase()) !== -1) return `"${char.toUpperCase()}" already entered! Enter new letter`;
          else return true;
        },
      },
    ])
    .then((data) => {
      var char = data.char.toUpperCase();
      guessesLeft--;
      var charIndx = word.word.indexOf(char);
      var lastIndx = word.word.lastIndexOf(char);
      var charIndxArr = [];
      if (charIndx > -1) {
        charIndxArr.push(charIndx);
        for (var i = charIndx; i < lastIndx; i += charIndx) {
          charIndx = word.word.indexOf(char, ++charIndx);
          charIndxArr.push(charIndx);
        }
        charGuessed += char + ',';
        for (var j = 0; j < charIndxArr.length; j++) {
          word.jumble[charIndxArr[j]].setGuessed(char);
        }
        if (!word.isSolved()) startGame();
        else {
          console.log(`  You did it! SOLVED : ${word.displayWord()}`);
          wins++;
          //continue? goes here
        }
      } else {
        guessesLeft--;
        charGuessed += char + ',';
        if (guessesLeft > 0) startGame();
        else{
            console.log(`  You lose! UNSOLVED : ${word.word}`);
            loses++;
            //continue goes here
        }
      }
    });
}
