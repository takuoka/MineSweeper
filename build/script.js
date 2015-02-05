(function() {
  var game, wait;

  console.log("script.coffee");

  game = generateGame(10, 10, 50);

  game.open(0, 0);

  game.dumpBoards();

  wait = function(time, callback) {
    return setTimeout(callback, time);
  };

  wait(1000, function() {
    game.putFlag(2, 2);
    game.dumpBoards();
    return wait(1000, function() {
      game.putFlag(2, 2);
      return game.dumpBoards();
    });
  });

}).call(this);
