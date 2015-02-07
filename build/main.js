(function() {
  var addClass, bombInfoNum, clickedX, clickedY, deleteGame, fadeIn, fadeOut, gameEndArea, gameStart, getElapsedTime, getElements, hideEndScreen, onClickCell, onGameClear, onGameOver, removeClass, resetTimer, showEndScreen, showGameClearScreen, showGameOverScreen, spreadBg, spreadWrapper, startScreen, startTimer, stopTimer, tickInterval, timerElm, wait, zeroPadding_2;

  console.log("main.coffee");

  window.onload = function() {
    return getElements();
  };

  window.onClickStartButton = function() {
    return gameStart();
  };

  window.onClickRetryButton = function() {
    var startScreen;
    startScreen = document.getElementById("startScreen");
    return fadeIn(startScreen, function() {
      return hideEndScreen();
    });
  };

  clickedX = null;

  clickedY = null;

  onClickCell = function(e) {
    clickedX = e.pageX - 50;
    return clickedY = e.pageY - 50;
  };

  onGameOver = function() {
    stopTimer();
    return showGameOverScreen();
  };

  onGameClear = function() {
    stopTimer();
    return showGameClearScreen();
  };

  spreadWrapper = null;

  gameEndArea = null;

  startScreen = null;

  bombInfoNum = null;

  spreadBg = null;

  timerElm = null;

  getElements = function() {
    startScreen = document.getElementById("startScreen");
    spreadWrapper = document.getElementById("spreadWrapper");
    gameEndArea = document.getElementById("gameEndArea");
    bombInfoNum = document.getElementById("bombInfoNum");
    spreadBg = document.getElementById("spreadBg");
    return timerElm = document.getElementById("timer");
  };

  gameStart = function() {
    var bombNum, xSize, ySize;
    resetTimer();
    deleteGame();
    xSize = document.getElementById("xSize").value;
    ySize = document.getElementById("ySize").value;
    bombNum = document.getElementById("bombNum").value;
    generateGame("game", xSize, ySize, bombNum, onGameOver, onGameClear, onClickCell);
    bombInfoNum.innerHTML = bombNum;
    fadeOut(startScreen);
    return startTimer();
  };

  deleteGame = function() {
    var game, i, _i, _ref, _results;
    game = document.getElementById("game");
    if (game.childNodes.length >= 1) {
      _results = [];
      for (i = _i = _ref = game.childNodes.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
        _results.push(game.removeChild(game.childNodes[i]));
      }
      return _results;
    }
  };

  showGameClearScreen = function() {
    addClass(spreadWrapper, "gameClear");
    addClass(gameEndArea, "gameClear");
    return showEndScreen();
  };

  showGameOverScreen = function() {
    addClass(spreadWrapper, "gameOver");
    addClass(gameEndArea, "gameOver");
    return showEndScreen();
  };

  showEndScreen = function() {
    gameEndArea.style.display = "block";
    spreadWrapper.style.display = "block";
    spreadBg.style.top = clickedY + "px";
    spreadBg.style.left = clickedX + "px";
    return wait(100, function() {
      spreadBg.className = "spread";
      return wait(300, function() {
        return addClass(gameEndArea, "show");
      });
    });
  };

  hideEndScreen = function() {
    removeClass(spreadBg, "spread");
    removeClass(gameEndArea, "show");
    spreadWrapper.style.display = "none";
    return gameEndArea.style.display = "none";
  };

  tickInterval = null;

  startTimer = function() {
    var startDate, tick;
    startDate = new Date();
    tick = function() {
      var t, timerString;
      t = getElapsedTime(startDate);
      timerString = t.minute + ":" + t.sec;
      return timerElm.innerHTML = timerString;
    };
    return tickInterval = setInterval(tick, 1000);
  };

  stopTimer = function() {
    return clearInterval(tickInterval);
  };

  resetTimer = function() {
    stopTimer();
    return timerElm.innerHTML = "00:00";
  };

  wait = function(time, callback) {
    return setTimeout(callback, time);
  };

  addClass = function(elm, className) {
    return elm.className = elm.className + ' ' + className;
  };

  removeClass = function(elm, removeClassName) {
    var classString, nameIndex;
    classString = elm.className;
    nameIndex = classString.indexOf(removeClassName);
    if (nameIndex !== -1) {
      classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + removeClassName.length);
    }
    return elm.className = classString;
  };

  fadeOut = function(elm) {
    elm.style.opacity = 0;
    return wait(500, function() {
      return elm.style.display = "none";
    });
  };

  fadeIn = function(elm, callback) {
    elm.style.display = "block";
    return wait(100, function() {
      elm.style.opacity = 1;
      return wait(500, function() {
        if (callback) {
          return callback();
        }
      });
    });
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

}).call(this);
