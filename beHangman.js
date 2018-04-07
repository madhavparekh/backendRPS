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
var timer; // setInterval

var word = new Word();

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
          return startTimer(char);
        },
        //++++++++++++++++++++
        validate: (char) => {
          return validateInput(char);
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
        if (word.isSolved()) {
          console.log(`  You did it! SOLVED : ${word.displayWord()}`.green);
          wins++;
          toContinue();
        } else {
          startGame();
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

function validateInput(char) {
  //clearInterval(timer);
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

function startTimer(char) {
  var i = 0;
  var j = 0;
  var plus = '';
  var loader = [`-`, `\\`, `|`, `/`];
  timer = setInterval(() => {
    if (i === 5) {
      guessesLeft--;
      plus = '';
      i = 0;
      j = 0;

      if (guessesLeft === 0) clearInterval(timer);

      process.stdout.cursorTo(0);
      process.stdout.clearLine();
      process.stdout.write(
        `  D'uh, you lost 1 guess. Enter letter and 'Enter' continue`
      );
      process.stdout.cursorTo(0);
    } else {
      var loaderStr =
        `[${plus}${loader[j % loader.length]}`.padEnd(11, ` `) + ']';
      loaderStr = loaderStr.inverse;
      j++;
      process.stdout.cursorTo(0);
      process.stdout.clearLine();
      process.stdout.write(
        `  ${loaderStr} - You have ${5 -
          i} seconds to pick else you lose 1 guess..`
      );
    }

    if (j % 2 === 0) plus += '+';
    if (j % 4 === 0) i++;
  }, 250);
}
