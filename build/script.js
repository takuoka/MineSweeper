(function() {
  var copy, game;

  console.log("script.coffee");

  game = generateGame(10, 10, 50);

  game.open(0, 0);

  game.dumpBoards();

  copy = game.getUnderBoard();

  console.log(copy);

}).call(this);
