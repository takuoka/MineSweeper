(function() {
  var onGameClear, onGameOver;

  console.log("main.coffee");

  window.onload = function() {
    return generateGame("game", 7, 6, 3, onGameOver, onGameClear);
  };

  onGameOver = function() {
    return alert("gameOver!!");
  };

  onGameClear = function() {
    return alert("cleared!!");
  };

}).call(this);
