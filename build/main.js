(function() {
  var onGameClear, onGameOver;

  console.log("main.coffee");

  window.onload = function() {
    return generateGame("game", 3, 3, 1, onGameOver, onGameClear);
  };

  onGameOver = function() {
    return alert("gameOver!!");
  };

  onGameClear = function() {
    return alert("cleared!!");
  };

}).call(this);
