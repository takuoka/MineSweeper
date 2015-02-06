(function() {
  console.log("main.coffee");

  window.onload = function() {
    return generateGame("game", 3, 3, 1);
  };

  window.onGameOver = function() {
    return alert("gameOver!!");
  };

  window.onCleared = function() {
    return alert("cleared!!");
  };

}).call(this);
