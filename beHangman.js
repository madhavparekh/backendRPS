var inquirer = require('inquirer');
var Char = require('./objects/Char');
var Word = require('./objects/Word');

var word = new Word();
console.log(word.displayWord());

inquirer.prompt([
    {   type: 'confirm',
        message: `Welcome to game of Pizza Themed Hangman where all words are related to pizzas and pizza's origin.\n  Press key a thru z or space bar to solve\n  Would you like to start?`,
        name: 'start',
    },
    {
        message: `Solve this: ${word.displayWord()}\n `,
        name: 'char',
        type: 'text',
        validate: (char)=>{
            if(/.[\w|\s]/.test(char))
                return 'Enter single charactor';
            if()

        },
    }

]).then(()=>{

});