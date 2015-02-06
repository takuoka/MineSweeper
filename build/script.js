(function() {
  var CLASS_BOMB, CLASS_CLOSED, CLASS_FLAG, CLASS_NUMBER, CLASS_ZERO, ID_TABLE, bombNum, createTable, gameManager, generateGame, getAllCell, getClassName, onLeftClickOnCell, onRightClickOnCell, parentId, updateTable, xSize, ySize;

  console.log("script.coffee");

  window.BOMB_CHAR = 'B';

  window.FLAG_CHAR = 'F';

  window.COVER_CHAR = 'C';

  ID_TABLE = "game_table";

  CLASS_CLOSED = "closed";

  CLASS_NUMBER = "number";

  CLASS_ZERO = "zero";

  CLASS_FLAG = "flag";

  CLASS_BOMB = "bomb";

  parentId = null;

  xSize = null;

  ySize = null;

  bombNum = null;

  gameManager = null;

  window.onload = function() {
    return generateGame("game", 4, 5, 3);
  };

  generateGame = function(_parentId, _xSize, _ySize, _bombNum) {
    parentId = _parentId;
    xSize = _xSize;
    ySize = _ySize;
    bombNum = _bombNum;
    gameManager = generateGameManager(xSize, ySize, bombNum);
    createTable();
    return updateTable();
  };

  updateTable = function() {
    var board;
    board = gameManager.getFrontBoard();
    return getAllCell(function(div, x, y) {
      return div.className = getClassName(board[y][x]);
    });
  };

  onLeftClickOnCell = function(e) {
    var c;
    c = e.target;
    gameManager.open(c.x, c.y);
    return updateTable();
  };

  onRightClickOnCell = function(e) {
    var c;
    c = e.target;
    gameManager.putFlag(c.x, c.y);
    return updateTable();
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

}).call(this);
