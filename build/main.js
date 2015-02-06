(function() {
  console.log("main.coffee");

  window.onload = function() {
    return generateGame("game", 13, 7, 20);
  };

  window.onGameOver = function() {
    return alert("gameOver!!");
  };

}).call(this);
