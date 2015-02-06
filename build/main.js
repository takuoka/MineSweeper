(function() {
  console.log("main.coffee");

  window.onload = function() {
    return generateGame("game", 6, 5, 3);
  };

  window.onGameOver = function() {
    return alert("gameOver!!");
  };

}).call(this);
