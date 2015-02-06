(function() {
  window.generateGame = function(_parentId, _xSize, _ySize, _bombNum, onGameOver, onGameClear) {
    var CLASS_BOMB, CLASS_CLOSED, CLASS_FLAG, CLASS_NUMBER, CLASS_ZERO, ID_TABLE, bombNum, createTable, gameLogic, getAllCell, getClassName, initGame, onLeftClickOnCell, onRightClickOnCell, parentId, updateTable, xSize, ySize;
    if (_parentId === null) {
      alert("generateGame(_parentId) : ゲームを生成する要素のidを指定してください。");
    }
    parentId = null;
    xSize = 5;
    ySize = 5;
    bombNum = 5;
    if (_parentId) {
      parentId = _parentId;
    }
    if (_xSize) {
      xSize = _xSize;
    }
    if (_ySize) {
      ySize = _ySize;
    }
    if (_bombNum) {
      bombNum = _bombNum;
    }
    window.BOMB_CHAR = 'B';
    window.FLAG_CHAR = 'F';
    window.COVER_CHAR = 'C';
    window.CLEAR_SIGN = "CLEAR";
    window.GAMEOVER_SIGN = "GAMEOVER";
    ID_TABLE = "game_table";
    CLASS_CLOSED = "closed";
    CLASS_NUMBER = "number";
    CLASS_ZERO = "zero";
    CLASS_FLAG = "flag";
    CLASS_BOMB = "bomb";
    gameLogic = null;
    initGame = function() {
      gameLogic = generateGameLogic(xSize, ySize, bombNum, onGameOver, onGameClear);
      createTable();
      return updateTable();
    };
    onLeftClickOnCell = function(e) {
      var cell, result;
      cell = e.target;
      result = gameLogic.open(cell.x, cell.y);
      return updateTable();
    };
    onRightClickOnCell = function(e) {
      var cell;
      cell = e.target;
      gameLogic.putFlag(cell.x, cell.y);
      updateTable();
      e.preventDefault();
      return e.stopPropagation();
    };
    updateTable = function() {
      var board;
      board = gameLogic.getFrontBoard();
      return getAllCell(function(div, x, y) {
        return div.className = getClassName(board[y][x]);
      });
    };
    createTable = function() {
      var cell, div, parent, row, table, tbody, x, y, _i, _j, _ref, _ref1;
      parent = document.getElementById(parentId);
      table = document.createElement("table");
      tbody = document.createElement("tbody");
      table.id = ID_TABLE;
      for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        row = document.createElement("tr");
        for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          cell = document.createElement("td");
          div = document.createElement("div");
          div.id = "y" + y + "_x" + x;
          div.className = CLASS_CLOSED;
          div.onclick = onLeftClickOnCell;
          div.oncontextmenu = onRightClickOnCell;
          div.x = x;
          div.y = y;
          cell.appendChild(div);
          row.appendChild(cell);
        }
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
      return parent.appendChild(table);
    };
    getAllCell = function(callback) {
      var cell, div, row, rowList, table, tbody, x, y, _i, _ref, _results;
      table = document.getElementById(ID_TABLE);
      tbody = table.children[0];
      rowList = tbody.children;
      _results = [];
      for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        row = rowList[y];
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
            cell = row.children[x];
            div = cell.children[0];
            _results1.push(callback(div, x, y));
          }
          return _results1;
        })());
      }
      return _results;
    };
    getClassName = function(char) {
      var className;
      if (char === COVER_CHAR) {
        return CLASS_CLOSED;
      } else if (char === FLAG_CHAR) {
        return CLASS_FLAG;
      } else if (char === BOMB_CHAR) {
        return CLASS_BOMB;
      } else if (char === 0) {
        return CLASS_ZERO;
      } else {
        className = CLASS_NUMBER;
        className += " n" + char;
        return className;
      }
    };
    return initGame();
  };

}).call(this);
