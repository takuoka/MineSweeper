(function() {
  var MAX_SIZE, MIN_SIZE, bombNumInput, checkBombNum, isValidBombNum, isValidSize, onChangeSize, startButton, updateStartButton, xSizeInput, ySizeInput;

  window.isValidConfig = true;

  MIN_SIZE = 3;

  MAX_SIZE = 20;

  startButton = null;

  xSizeInput = null;

  ySizeInput = null;

  bombNumInput = null;

  window.startValidation = function() {
    startButton = document.getElementById("startButton");
    xSizeInput = document.getElementById("xSize");
    ySizeInput = document.getElementById("ySize");
    bombNumInput = document.getElementById("bombNum");
    xSizeInput.addEventListener("keyup", onChangeSize, false);
    ySizeInput.addEventListener("keyup", onChangeSize, false);
    xSizeInput.addEventListener("mouseup", onChangeSize, false);
    ySizeInput.addEventListener("mouseup", onChangeSize, false);
    bombNumInput.addEventListener("keyup", checkBombNum, false);
    return bombNumInput.addEventListener("mouseup", checkBombNum, false);
  };

  isValidSize = true;

  onChangeSize = function(e) {
    var size;
    size = e.target.value;
    if (MIN_SIZE <= size && size <= MAX_SIZE) {
      isValidSize = true;
    } else {
      isValidSize = false;
    }
    return checkBombNum();
  };

  isValidBombNum = true;

  checkBombNum = function() {
    var bombMax, bombNum, xSize, ySize;
    bombNum = bombNumInput.value;
    xSize = xSizeInput.value;
    ySize = ySizeInput.value;
    bombMax = (xSize * ySize) - 1;
    if (bombMax >= bombNum && bombNum >= 1) {
      isValidBombNum = true;
    } else {
      isValidBombNum = false;
    }
    return updateStartButton();
  };

  updateStartButton = function() {
    if (isValidSize && isValidBombNum) {
      window.isValidConfig = true;
    } else {
      window.isValidConfig = false;
    }
    if (window.isValidConfig === false) {
      return startButton.className = "invalid";
    } else {
      return startButton.className = "";
    }
  };

}).call(this);
