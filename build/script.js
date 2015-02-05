(function() {
  var game;

  console.log("script.coffee");

  game = generateGame(10, 10, 30);

  game.open(0, 0);

  game.dumpBoards();

}).call(this);
