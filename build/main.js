(function() {
  var gameStart, getElapsedTime, hide, onGameClear, onGameOver, startTimer, stopTimer, tickInterval, wait, zeroPadding_2;

  console.log("main.coffee");

  window.onload = function() {
    return onClickStart();
  };

  window.onClickStart = function() {
    return gameStart();
  };

  onGameOver = function() {
    alert("gameOver!!");
    return stopTimer();
  };

  onGameClear = function() {
    return alert("cleared!!");
  };

  gameStart = function() {
    var bombInfoNum, bombNum, startScreen, xSize, ySize;
    startScreen = document.getElementById("startScreen");
    xSize = document.getElementById("xSize").value;
    ySize = document.getElementById("ySize").value;
    bombNum = document.getElementById("bombNum").value;
    bombInfoNum = document.getElementById("bombInfoNum");
    generateGame("game", xSize, ySize, bombNum, onGameOver, onGameClear);
    bombInfoNum.innerHTML = bombNum;
    hide(startScreen);
    return startTimer();
  };

  tickInterval = null;

  stopTimer = function() {
    return clearInterval(tickInterval);
  };

  startTimer = function() {
    var startDate, tick, timerElm;
    timerElm = document.getElementById("timer");
    startDate = new Date();
    tick = function() {
      var t, timerString;
      t = getElapsedTime(startDate);
      timerString = t.minute + ":" + t.sec;
      return timerElm.innerHTML = timerString;
    };
    return tickInterval = setInterval(tick, 1000);
  };

  getElapsedTime = function(startDate) {
    var elapsedTime, hour, minute, nowDate, sec, totalTime;
    nowDate = new Date();
    totalTime = nowDate.getTime() - startDate.getTime();
    hour = Math.floor(totalTime / (60 * 60 * 1000));
    totalTime = totalTime - (hour * 60 * 60 * 1000);
    minute = Math.floor(totalTime / (60 * 1000));
    totalTime = totalTime - (minute * 60 * 1000);
    sec = Math.floor(totalTime / 1000);
    elapsedTime = {};
    elapsedTime.minute = zeroPadding_2(minute);
    elapsedTime.sec = zeroPadding_2(sec);
    return elapsedTime;
  };

  zeroPadding_2 = function(num) {
    return ("0" + num).slice(-2);
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
