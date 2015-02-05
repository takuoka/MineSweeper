(function() {
  var BOARD, BOMB_CHAR, BOMB_NUM, FLAG_CHAR, FRONT_BOARD, SIZE_X, SIZE_Y, dumpBoard, initBoards;

  console.log("gameManager.coffee");

  SIZE_X = 5;

  SIZE_Y = 6;

  BOMB_NUM = 5;

  BOARD = [];

  FRONT_BOARD = [];

  BOMB_CHAR = 'B';

  FLAG_CHAR = 'F';

  initBoards = function(vSize, hSize, bomNum) {
    var addBomb, getRandomPlace, h, i, incrementSorroundingNumbers, rand, v, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3, _results;
    rand = function(max) {
      return Math.round(Math.random() * max);
    };
    getRandomPlace = function() {
      var place;
      place = {};
      place.v = rand(vSize - 1);
      place.h = rand(hSize - 1);
      return place;
    };
    addBomb = function() {
      var p;
      p = getRandomPlace();
      if (BOARD[p.v][p.h] !== BOMB_CHAR) {
        return BOARD[p.v][p.h] = BOMB_CHAR;
      } else {
        return addBomb();
      }
    };
    incrementSorroundingNumbers = function(v, h) {
      var increment;
      increment = function(v, h) {
        if (BOARD[v] !== void 0) {
          if (BOARD[v][h] !== void 0) {
            if (BOARD[v][h] !== BOMB_CHAR) {
              return BOARD[v][h] += 1;
            }
          }
        }
      };
      increment(v - 1, h - 1);
      increment(v - 1, h);
      increment(v - 1, h + 1);
      increment(v, h - 1);
      increment(v, h + 1);
      increment(v + 1, h - 1);
      increment(v + 1, h);
      return increment(v + 1, h + 1);
    };
    console.log("initBOARD");
    for (v = _i = 0, _ref = vSize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; v = 0 <= _ref ? ++_i : --_i) {
      BOARD.push([]);
      FRONT_BOARD.push([]);
      for (h = _j = 0, _ref1 = hSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; h = 0 <= _ref1 ? ++_j : --_j) {
        BOARD[v].push(0);
        FRONT_BOARD[v].push('');
      }
    }
    for (i = _k = 0, _ref2 = bomNum - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
      addBomb();
    }
    _results = [];
    for (v = _l = 0, _ref3 = vSize - 1; 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; v = 0 <= _ref3 ? ++_l : --_l) {
      _results.push((function() {
        var _m, _ref4, _results1;
        _results1 = [];
        for (h = _m = 0, _ref4 = hSize - 1; 0 <= _ref4 ? _m <= _ref4 : _m >= _ref4; h = 0 <= _ref4 ? ++_m : --_m) {
          if (BOARD[v][h] === BOMB_CHAR) {
            _results1.push(incrementSorroundingNumbers(v, h));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })());
    }
    return _results;
  };

  dumpBoard = function(board) {
    var h, hSize, str, v, vSize, _i, _j, _ref, _ref1, _results;
    vSize = board.length;
    hSize = board[0].length;
    _results = [];
    for (v = _i = 0, _ref = vSize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; v = 0 <= _ref ? ++_i : --_i) {
      str = "";
      for (h = _j = 0, _ref1 = hSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; h = 0 <= _ref1 ? ++_j : --_j) {
        str += board[v][h] + " ";
      }
      _results.push(console.log(str));
    }
    return _results;
  };

  initBoards(SIZE_X, SIZE_Y, 5);

  dumpBoard(BOARD);

  dumpBoard(FRONT_BOARD);

}).call(this);
