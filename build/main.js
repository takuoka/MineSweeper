(function() {
  var hide, onGameClear, onGameOver, wait;

  console.log("main.coffee");

  window.onload = function() {};

  window.onClickStart = function() {
    var bombInfoNum, bombNum, startScreen, xSize, ySize;
    startScreen = document.getElementById("startScreen");
    xSize = document.getElementById("xSize").value;
    ySize = document.getElementById("ySize").value;
    bombNum = document.getElementById("bombNum").value;
    bombInfoNum = document.getElementById("bombInfoNum");
    generateGame("game", xSize, ySize, bombNum, onGameOver, onGameClear);
    console.log(bombInfoNum);
    bombInfoNum.innerHTML = bombNum;
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
