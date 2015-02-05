(function() {
  var BOMB_CHAR, BOMB_NUM, FLAG_CHAR, FRONT_BOARD, SIZE_X, SIZE_Y, UNDER_BOARD, doSomethingAtSorroundingPlace, dumpBoard, initBoards;

  console.log("gameManager.coffee");

  SIZE_X = 5;

  SIZE_Y = 6;

  BOMB_NUM = 5;

  UNDER_BOARD = [];

  FRONT_BOARD = [];

  BOMB_CHAR = 'B';

  FLAG_CHAR = 'F';

  initBoards = function(ySize, xSize, bomNum) {
    var addBomb, getRandomPlace, i, incrementSorroundingNumbers, rand, x, y, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3, _results;
    console.log("initBoards");
    rand = function(max) {
      return Math.round(Math.random() * max);
    };
    getRandomPlace = function() {
      var place;
      place = {};
      place.y = rand(ySize - 1);
      place.x = rand(xSize - 1);
      return place;
    };
    addBomb = function() {
      var p;
      p = getRandomPlace();
      if (UNDER_BOARD[p.y][p.x] !== BOMB_CHAR) {
        return UNDER_BOARD[p.y][p.x] = BOMB_CHAR;
      } else {
        return addBomb();
      }
    };
    incrementSorroundingNumbers = function(y, x) {
      return doSomethingAtSorroundingPlace(UNDER_BOARD, y, x, function(y, x) {
        return UNDER_BOARD[y][x] += 1;
      });
    };
    for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      UNDER_BOARD.push([]);
      FRONT_BOARD.push([]);
      for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        UNDER_BOARD[y].push(0);
        FRONT_BOARD[y].push('');
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
            _results1.push(incrementSorroundingNumbers(y, x));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })());
    }
    return _results;
  };

  doSomethingAtSorroundingPlace = function(board, y, x, todo) {
    var checkAndDo;
    checkAndDo = function(y, x) {
      if (board[y] !== void 0) {
        if (board[y][x] !== void 0) {
          if (board[y][x] !== BOMB_CHAR) {
            return todo(y, x);
          }
        }
      }
    };
    checkAndDo(y - 1, x - 1);
    checkAndDo(y - 1, x);
    checkAndDo(y - 1, x + 1);
    checkAndDo(y, x - 1);
    checkAndDo(y, x + 1);
    checkAndDo(y + 1, x - 1);
    checkAndDo(y + 1, x);
    return checkAndDo(y + 1, x + 1);
  };

  dumpBoard = function(board) {
    var str, x, xSize, y, ySize, _i, _j, _ref, _ref1, _results;
    ySize = board.length;
    xSize = board[0].length;
    _results = [];
    for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      str = "";
      for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        str += board[y][x] + " ";
      }
      _results.push(console.log(str));
    }
    return _results;
  };

  initBoards(SIZE_X, SIZE_Y, 5);

  dumpBoard(UNDER_BOARD);

  dumpBoard(FRONT_BOARD);

}).call(this);
