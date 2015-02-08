

# スタートページのバリデーションが書いてある


#main.jsでスタートボタンのクリック時のイベントにて判定につかう
window.isValidConfig = true

#main.jsでwindow.onload時に呼ばれる
window.startValidation = ->
	startButton  = document.getElementById "startButton"
	xSizeInput   = document.getElementById "xSize"
	ySizeInput   = document.getElementById "ySize"
	bombNumInput = document.getElementById "bombNum"


	MIN_SIZE = 3
	MAX_SIZE = 20


	# ------------ validation -----------------

	isValidSize = true

	onChangeSize = (e)->
		size = e.target.value

		if MIN_SIZE <= size and size <= MAX_SIZE
			isValidSize = true
		else
			isValidSize = false

		checkBombNum()



	isValidBombNum = true

	checkBombNum =->
		bombNum     = bombNumInput.value
		xSize       = xSizeInput.value
		ySize       = ySizeInput.value

		bombMax     = (xSize * ySize) - 1

		if bombMax >= bombNum and bombNum >= 1
			isValidBombNum = true
		else
			isValidBombNum = false

		updateStartButton()




	# ---------------- update ------------------

	updateStartButton = ->

		if isValidSize and isValidBombNum
			window.isValidConfig = true
		else
			window.isValidConfig = false


		if window.isValidConfig is false
			startButton.className = "invalid"
		else
			startButton.className = ""




	# add Event
	xSizeInput.addEventListener "keyup", onChangeSize, false
	xSizeInput.addEventListener "mouseup", onChangeSize, false

	ySizeInput.addEventListener "keyup", onChangeSize, false
	ySizeInput.addEventListener "mouseup", onChangeSize, false

	bombNumInput.addEventListener "keyup", checkBombNum, false
	bombNumInput.addEventListener "mouseup", checkBombNum, false


