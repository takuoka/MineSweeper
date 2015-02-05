(function() {
  var BOMB_CHAR, BOMB_NUM, FLAG_CHAR, FRONT_BOARD, SIZE_X, SIZE_Y, UNDER_BOARD, dumpBoard, getRandomPlace, getSorroundingPlace, initBoards, initFrontBoard, initUnderBoard, rand;

  console.log("gameManager.coffee");

  SIZE_X = 5;

  SIZE_Y = 6;

  BOMB_NUM = 5;

  UNDER_BOARD = [];

  FRONT_BOARD = [];

  BOMB_CHAR = 'B';

  FLAG_CHAR = 'F';

  initBoards = function(xSize, ySize, bomNum) {
    console.log("initBoards");
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
          _results1.push(FRONT_BOARD[y].push(''));
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
      return getSorroundingPlace(UNDER_BOARD, x, y, function(sx, sy) {
        return UNDER_BOARD[sy][sx] += 1;
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

  getSorroundingPlace = function(board, x, y, callback) {
    var checkAndDo;
    checkAndDo = function(x, y) {
      if (board[y] !== void 0) {
        if (board[y][x] !== void 0) {
          if (board[y][x] !== BOMB_CHAR) {
            return callback(x, y);
          }
        }
      }
    };
    checkAndDo(x - 1, y - 1);
    checkAndDo(x - 1, y);
    checkAndDo(x - 1, y + 1);
    checkAndDo(x, y - 1);
    checkAndDo(x, y + 1);
    checkAndDo(x + 1, y - 1);
    checkAndDo(x + 1, y);
    return checkAndDo(x + 1, y + 1);
  };

  dumpBoard = function(board) {
    var str, x, xSize, y, ySize, _i, _j, _ref, _ref1, _results;
    ySize = board.length;
    xSize = board[0].length;
    _results = [];
    for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      str = "";
      for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        str += board[y][x] + "-";
      }
      _results.push(console.log(str));
    }
    return _results;
  };

  initBoards(SIZE_X, SIZE_Y, 5);

  dumpBoard(UNDER_BOARD);

  dumpBoard(FRONT_BOARD);

}).call(this);
