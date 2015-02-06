(function() {
  var createTable;

  console.log("script.coffee");

  window.onload = function() {
    return createTable("game", 4, 4);
  };

  createTable = function(id, xSize, ySize) {
    var cell, div, gameDiv, row, table, tbody, x, y, _i, _j, _ref, _ref1;
    gameDiv = document.getElementById(id);
    table = document.createElement("table");
    tbody = document.createElement("tbody");
    for (y = _i = 0, _ref = ySize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      row = document.createElement("tr");
      for (x = _j = 0, _ref1 = xSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        cell = document.createElement("td");
        div = document.createElement("div");
        div.innerHTML = (y * x) + x;
        cell.appendChild(div);
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    return gameDiv.appendChild(table);
  };

}).call(this);
