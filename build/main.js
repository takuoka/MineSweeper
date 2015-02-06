(function() {
  var hide, onGameClear, onGameOver, wait;

  console.log("main.coffee");

  window.onClickStart = function() {
    var bombNum, startScreen, xSize, ySize;
    startScreen = document.getElementById("startScreen");
    xSize = document.getElementById("xSize").value;
    ySize = document.getElementById("ySize").value;
    bombNum = document.getElementById("bombNum").value;
    generateGame("game", xSize, ySize, bombNum, onGameOver, onGameClear);
    return hide(startScreen);
  };

  onGameOver = function() {
    return alert("gameOver!!");
  };

  onGameClear = function() {
    return alert("cleared!!");
  };

  hide = function(elm) {
    elm.style.opacity = 0;
    return wait(500, function() {
      return elm.style.display = "none";
    });
  };

  wait = function(time, callback) {
    return setTimeout(callback, time);
  };

}).call(this);
