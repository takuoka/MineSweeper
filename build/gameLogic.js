(function() {
  window.generateGameLogic = function(sizeX, sizeY, bomNum, onGameOver, onGameClear) {
    var API, BOMB_NUM, FRONT_BOARD, SIZE_X, SIZE_Y, UNDER_BOARD, dumpBoard, dumpBoards, getRandomPlace, getSorroundingPlace, initBoards, initFrontBoard, initUnderBoard, isClearedGame, open, openAll, putFlag, rand;
    SIZE_X = 5;
    SIZE_Y = 5;
    BOMB_NUM = 5;
    if (sizeX) {
      SIZE_X = parseInt(sizeX);
    }
    if (sizeY) {
      SIZE_Y = parseInt(sizeY);
    }
    if (bomNum) {
      BOMB_NUM = parseInt(bomNum);
    }
    UNDER_BOARD = [];
    FRONT_BOARD = [];
    initBoards = function(xSize, ySize, bomNum) {
      initFrontBoard(xSize, ySize);
      return initUnderBoard(xSize, ySize, bomNum);
    };
    initFrontBoard = function(xSize, ySize) {
      var x, y, _i, _ref, _results;
      _results = [];
      for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        FRONT_BOARD.push([]);
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(FRONT_BOARD[y].push(COVER_CHAR));
          }
          return _results1;
        })());
      }
      return _results;
    };
    initUnderBoard = function(xSize, ySize, bomNum) {
      var addBomb, i, incrementSorroundingNumbers, x, y, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3, _results;
      addBomb = function() {
        var p;
        p = getRandomPlace(xSize, ySize);
        if (UNDER_BOARD[p.y][p.x] !== BOMB_CHAR) {
          return UNDER_BOARD[p.y][p.x] = BOMB_CHAR;
        } else {
          return addBomb();
        }
      };
      incrementSorroundingNumbers = function(x, y) {
        return getSorroundingPlace(x, y, function(sx, sy) {
          if (UNDER_BOARD[sy][sx] !== BOMB_CHAR) {
            return UNDER_BOARD[sy][sx] += 1;
          }
        });
      };
      for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        UNDER_BOARD.push([]);
        for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          UNDER_BOARD[y].push(0);
        }
      }
      for (i = _k = 0, _ref2 = bomNum - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        addBomb();
      }
      _results = [];
      for (y = _l = 0, _ref3 = ySize - 1; 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; y = 0 <= _ref3 ? ++_l : --_l) {
        _results.push((function() {
          var _m, _ref4, _results1;
          _results1 = [];
          for (x = _m = 0, _ref4 = xSize - 1; 0 <= _ref4 ? _m <= _ref4 : _m >= _ref4; x = 0 <= _ref4 ? ++_m : --_m) {
            if (UNDER_BOARD[y][x] === BOMB_CHAR) {
              _results1.push(incrementSorroundingNumbers(x, y));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };
    open = function(x, y) {
      var isCleared, isGameover, result;
      result = UNDER_BOARD[y][x];
      FRONT_BOARD[y][x] = result;
      isGameover = result === BOMB_CHAR;
      isCleared = isClearedGame();
      if (isGameover) {
        onGameOver();
        openAll();
        return;
      }
      if (isCleared) {
        onGameClear();
        openAll();
        return;
      }
      if (result === 0) {
        getSorroundingPlace(x, y, function(sx, sy) {
          if (FRONT_BOARD[sy][sx] === COVER_CHAR) {
            return open(sx, sy);
          }
        });
      }
    };
    isClearedGame = function() {
      var cell, numOfCoverCell, x, xSize, y, ySize, _i, _j, _ref, _ref1;
      ySize = FRONT_BOARD.length;
      xSize = FRONT_BOARD[0].length;
      numOfCoverCell = 0;
      for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          cell = FRONT_BOARD[y][x];
          if (cell === COVER_CHAR || cell === FLAG_CHAR) {
            numOfCoverCell += 1;
          }
        }
      }
      if (numOfCoverCell === BOMB_NUM) {
        return true;
      } else {
        return false;
      }
    };
    openAll = function() {
      var x, xSize, y, ySize, _i, _ref, _results;
      ySize = FRONT_BOARD.length;
      xSize = FRONT_BOARD[0].length;
      _results = [];
      for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(FRONT_BOARD[y][x] = UNDER_BOARD[y][x]);
          }
          return _results1;
        })());
      }
      return _results;
    };
    putFlag = function(x, y) {
      if (FRONT_BOARD[y][x] === COVER_CHAR) {
        return FRONT_BOARD[y][x] = FLAG_CHAR;
      } else if (FRONT_BOARD[y][x] === FLAG_CHAR) {
        return FRONT_BOARD[y][x] = COVER_CHAR;
      }
    };
    dumpBoards = function() {
      dumpBoard(UNDER_BOARD);
      dumpBoard(FRONT_BOARD);
      return console.log("==============");
    };
    rand = function(max) {
      return Math.round(Math.random() * max);
    };
    getRandomPlace = function(xSize, ySize) {
      var place;
      place = {};
      place.x = rand(xSize - 1);
      place.y = rand(ySize - 1);
      return place;
    };
    getSorroundingPlace = function(x, y, callback) {
      var checkAndCallBack;
      checkAndCallBack = function(x, y) {
        if (UNDER_BOARD[y] !== void 0) {
          if (UNDER_BOARD[y][x] !== void 0) {
            return callback(x, y);
          }
        }
      };
      checkAndCallBack(x - 1, y - 1);
      checkAndCallBack(x - 1, y);
      checkAndCallBack(x - 1, y + 1);
      checkAndCallBack(x, y - 1);
      checkAndCallBack(x, y + 1);
      checkAndCallBack(x + 1, y - 1);
      checkAndCallBack(x + 1, y);
      return checkAndCallBack(x + 1, y + 1);
    };
    dumpBoard = function(board) {
      var str, x, xSize, y, ySize, _i, _j, _ref, _ref1;
      console.log("---------");
      ySize = board.length;
      xSize = board[0].length;
      for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        str = "";
        for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          str += board[y][x] + " ";
        }
        console.log(str);
      }
      return console.log("---------");
    };
    initBoards(SIZE_X, SIZE_Y, BOMB_NUM);
    API = {};
    API.open = open;
    API.putFlag = putFlag;
    API.dumpBoards = dumpBoards;
    API.getUnderBoard = function() {
      return $.extend(true, [], UNDER_BOARD);
    };
    API.getFrontBoard = function() {
      return $.extend(true, [], FRONT_BOARD);
    };
    return API;
  };

}).call(this);
