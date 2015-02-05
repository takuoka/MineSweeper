(function() {
  var BOMB_CHAR, FLAG_CHAR, QUESTION_CHAR, contentsBoard, dumpBoard, horizonalSize, initContentsBoard, initUserBoard, numberOfBomb, userBoard, verticalSize;

  console.log("gameManager.coffee");

  verticalSize = 5;

  horizonalSize = 6;

  numberOfBomb = 5;

  userBoard = [];

  contentsBoard = [];

  BOMB_CHAR = 'B';

  QUESTION_CHAR = '?';

  FLAG_CHAR = 'F';

  initUserBoard = function(vSize, hSize) {
    var h, v, _i, _ref, _results;
    _results = [];
    for (v = _i = 0, _ref = vSize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; v = 0 <= _ref ? ++_i : --_i) {
      userBoard.push([]);
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (h = _j = 0, _ref1 = hSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; h = 0 <= _ref1 ? ++_j : --_j) {
          _results1.push(userBoard[v].push(''));
        }
        return _results1;
      })());
    }
    return _results;
  };

  initContentsBoard = function(vSize, hSize, bomNum) {
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
      if (contentsBoard[p.v][p.h] !== BOMB_CHAR) {
        return contentsBoard[p.v][p.h] = BOMB_CHAR;
      } else {
        return addBomb();
      }
    };
    incrementSorroundingNumbers = function(v, h) {
      var increment;
      increment = function(v, h) {
        if (contentsBoard[v] !== void 0) {
          if (contentsBoard[v][h] !== void 0) {
            if (contentsBoard[v][h] !== BOMB_CHAR) {
              return contentsBoard[v][h] += 1;
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
    console.log("initContentsBoard");
    for (v = _i = 0, _ref = vSize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; v = 0 <= _ref ? ++_i : --_i) {
      contentsBoard.push([]);
      for (h = _j = 0, _ref1 = hSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; h = 0 <= _ref1 ? ++_j : --_j) {
        contentsBoard[v].push(0);
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
          if (contentsBoard[v][h] === BOMB_CHAR) {
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
        str += contentsBoard[v][h] + " ";
      }
      _results.push(console.log(str));
    }
    return _results;
  };

  initContentsBoard(verticalSize, horizonalSize, 5);

  dumpBoard(contentsBoard);

}).call(this);
