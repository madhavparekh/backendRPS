var Char = function(char) {
  this.char = char;
  this.guessed = false;
  this.display = '_';
};

// Char.prototype.setDisplay = function() {
//   this.display = this.guessed ? this.char : this.dash;
// };
Char.prototype.getDisplay = function() {
  return this.display;
};
Char.prototype.setGuessed = function(char) {
  this.guessed = this.char === char ? true : false;
  this.display = this.guessed ? this.char : '_';
};

module.exports = Char;
