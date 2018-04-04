var inquirer = require('inquirer'); //CLI prompt
var clear = require('clear'); //clears console pkg
var colors = require('colors'); //text coloring pkg

var Char = require('./objects/Char');
var Word = require('./objects/Word');

var wins = 0; //win tracker
var loses = 0; //lose tracker
var guessesLeft = 15; // life
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
  clear();
  var timer;

  inquirer
    .prompt([
      {
        message: `Player: ${name.blue} | Wins : ${
          wins.toString().green
        } | Loses : ${loses.toString().red} | Guesses Left : ${
          guessesLeft.toString().yellow
        } | Letters Entered : ${charGuessed}\n  Word ${game} - Solve: ${
          word.displayWord().bgMagenta
        }\n`,
        name: 'char',
        type: 'text',
        //testing timer+++++++
        default: (char) => {
          var i = 0;
          var j = 0;
          var plus = '';
          var loader = [`-`, `\\`, `|`, `/`];
          timer = setInterval(() => {
            if (i >= 5) {
              guessesLeft--;
              plus = '';
              if(guessesLeft === 0){
                //exit from question prompt
                clearInterval(timer);
                return true;
              }

              i = 0;
            } else {
              var loaderStr = `  [${plus}${loader[j % loader.length]}`.padEnd(8, ` `);
              j++;
              process.stdout.write(
                `${loaderStr}] - You have ${5 -
                  i} seconds to pick else you lose 1 guess..`
              );
              process.stdout.cursorTo(0);
            }
            if(j%4 === 0){
              i++;
              plus += '+';
            }
          }, 250);
        },
        //++++++++++++++++++++
        validate: (char) => {
          char = char.toUpperCase();
          if (/.[\w|\s]/.test(char)) {
            return 'Enter single charactor';
          } else if (charGuessed.indexOf(char) !== -1) {
            return `"${char}" already entered! Enter new letter`;
          } else if (char.charCodeAt(0) > 90 || char.charCodeAt(0) < 65) {
            return 'Enter a thru z OR space only as input';
          } else {
            return true;
          }
        },
      },
    ])
    .then((data) => {
      clearInterval(timer);
      var char = data.char.toUpperCase();
      guessesLeft--;
      charGuessed += char + ',';

      var charIndx = word.word.indexOf(char);

      if (charIndx > -1) {
        var charIndxArr = word.getCharIndexes(charIndx, char);

        //set flag true for char.guessed
        for (var j = 0; j < charIndxArr.length; j++) {
          word.jumble[charIndxArr[j]].setGuessed(char);
        }
        //check if jumble is solved
        if (!word.isSolved()) {
          startGame();
        } else {
          console.log(`  You did it! SOLVED : ${word.displayWord()}`.green);
          wins++;
          toContinue();
        }
      } else {
        if (guessesLeft > 0) {
          startGame();
        } else {
          console.log(`  You lose! UNSOLVED : ${word.word}`.red);
          loses++;
          toContinue();
        }
      }
    });
}

function toContinue() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Would you like to continue to next word?',
        name: 'doContinue',
      },
    ])
    .then((data) => {
      if (data.doContinue) {
        word = new Word();
        charGuessed = '';
        guessesLeft = 15;
        game++;
        startGame();
      } else {
        console.log(`  Final Score: Wins - ${wins} | Loses - ${loses}`.yellow);
        console.log('  See you next time!');
      }
    });
}
