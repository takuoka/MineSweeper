(function() {
  var addClass, clickedX, clickedY, deleteGame, el_bombInfoNum, el_gameEndArea, el_spreadBg, el_spreadWrapper, el_startScreen, el_timerElm, fadeIn, fadeOut, gameStart, getElapsedTime, getElements, hideEndScreen, onClickCell, onGameClear, onGameOver, removeClass, resetTimer, showEndScreen, showGameClearScreen, showGameOverScreen, startTimer, stopTimer, tickInterval, wait, zeroPadding_2;

  el_spreadWrapper = null;

  el_gameEndArea = null;

  el_startScreen = null;

  el_bombInfoNum = null;

  el_spreadBg = null;

  el_timerElm = null;

  getElements = function() {
    el_startScreen = document.getElementById("startScreen");
    el_spreadWrapper = document.getElementById("spreadWrapper");
    el_gameEndArea = document.getElementById("gameEndArea");
    el_bombInfoNum = document.getElementById("bombInfoNum");
    el_spreadBg = document.getElementById("spreadBg");
    return el_timerElm = document.getElementById("timer");
  };

  window.onload = function() {
    window.startValidation();
    return getElements();
  };

  window.onClickStartButton = function() {
    if (window.isValidConfig) {
      return gameStart();
    }
  };

  window.onClickRetryButton = function() {
    return fadeIn(el_startScreen, function() {
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

  gameStart = function() {
    var bombNum, xSize, ySize;
    resetTimer();
    deleteGame();
    xSize = document.getElementById("xSize").value;
    ySize = document.getElementById("ySize").value;
    bombNum = document.getElementById("bombNum").value;
    generateGame("game", xSize, ySize, bombNum, onGameOver, onGameClear, onClickCell);
    el_bombInfoNum.innerHTML = bombNum;
    fadeOut(el_startScreen);
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
    removeClass(el_spreadWrapper, "gameOver");
    removeClass(el_gameEndArea, "gameOver");
    removeClass(el_spreadWrapper, "gameClear");
    removeClass(el_gameEndArea, "gameClear");
    addClass(el_spreadWrapper, "gameClear");
    addClass(el_gameEndArea, "gameClear");
    return showEndScreen();
  };

  showGameOverScreen = function() {
    removeClass(el_spreadWrapper, "gameClear");
    removeClass(el_gameEndArea, "gameClear");
    removeClass(el_spreadWrapper, "gameOver");
    removeClass(el_gameEndArea, "gameOver");
    addClass(el_spreadWrapper, "gameOver");
    addClass(el_gameEndArea, "gameOver");
    return showEndScreen();
  };

  showEndScreen = function() {
    el_gameEndArea.style.display = "block";
    el_spreadWrapper.style.display = "block";
    el_spreadBg.style.top = clickedY + "px";
    el_spreadBg.style.left = clickedX + "px";
    return wait(100, function() {
      el_spreadBg.className = "spread";
      return wait(300, function() {
        return addClass(el_gameEndArea, "show");
      });
    });
  };

  hideEndScreen = function() {
    removeClass(el_spreadBg, "spread");
    removeClass(el_gameEndArea, "show");
    el_spreadWrapper.style.display = "none";
    return el_gameEndArea.style.display = "none";
  };

  tickInterval = null;

  startTimer = function() {
    var startDate, tick;
    startDate = new Date();
    tick = function() {
      var t, timerString;
      t = getElapsedTime(startDate);
      timerString = t.minute + ":" + t.sec;
      return el_timerElm.innerHTML = timerString;
    };
    return tickInterval = setInterval(tick, 1000);
  };

  stopTimer = function() {
    return clearInterval(tickInterval);
  };

  resetTimer = function() {
    stopTimer();
    return el_timerElm.innerHTML = "00:00";
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
