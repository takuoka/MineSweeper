(function() {
  console.log("main.coffee");

  window.onload = function() {
    return generateGame("game", 10, 10, 20);
  };

  window.onGameOver = function() {
    return alert("gameOver!!");
  };

  window.onCleared = function() {
    return alert("cleared!!");
  };

}).call(this);
