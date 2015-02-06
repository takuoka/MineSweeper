console.log "game.coffee"


window.generateGame = (_parentId, _xSize, _ySize, _bombNum) ->

	if _parentId is null
		alert "generateGame(_parentId) : ゲームを生成する要素のidを指定してください。"
	
	parentId = null
	xSize = 5
	ySize = 5
	bombNum = 5

	parentId = _parentId if _parentId
	xSize    = _xSize if _xSize
	ySize    = _ySize if _ySize
	bombNum  = _bombNum if _bombNum


	#配列上での記号の定義 (gameLogicと共用)
	window.BOMB_CHAR  = 'B'#地雷
	window.FLAG_CHAR  = 'F'#地雷があると確信したときに置くマーク
	window.COVER_CHAR = 'C'#開いていない状態
	# openしたときにクリアーだった時にかえってくる文字列
	window.CLEAR_SIGN = "CLEAR"

	#生成するtable要素のid
	ID_TABLE = "game_table"


	# 全状態のクラス名 (すべてのマスはどれかの状態になる。)
	# number　のみ、 .n1 ~ .n8 のようなクラス名が追加でつく
	CLASS_CLOSED = "closed"
	CLASS_NUMBER = "number"
	CLASS_ZERO   = "zero"
	CLASS_FLAG   = "flag"
	CLASS_BOMB   = "bomb"



	gameLogic = null


	initGame = ->
		gameLogic = generateGameLogic xSize, ySize, bombNum
		createTable()
		updateTable()

	# クリックイベント
	onLeftClickOnCell = (e) ->
		cell = e.target
		result = gameLogic.open cell.x, cell.y
		updateTable()

		if result is BOMB_CHAR
			window.onGameOver()

		if result is CLEAR_SIGN
			window.onCleared()



	onRightClickOnCell = (e) ->
		cell = e.target
		gameLogic.putFlag cell.x, cell.y
		updateTable()

		#デフォルトのイベントキャンセル
		e.preventDefault()
		e.stopPropagation()


	# ------------- main function ---------------


	# FRONT_BOARD から table の cell の クラス名に 反映
	updateTable = ->

		board = gameLogic.getFrontBoard()

		getAllCell (div, x, y) ->
			div.className = getClassName board[y][x]




	# ------------- util function ---------------

	createTable = ->

		parent   = document.getElementById parentId
		table    = document.createElement "table"
		tbody    = document.createElement "tbody"

		table.id = ID_TABLE


		for y in [0..ySize-1]

			row = document.createElement "tr"


			for x in [0..xSize-1]
				cell = document.createElement "td"
				div  = document.createElement "div"

				# div.innerHTML = (y * x) + x
				div.id = "y" + y + "_x" + x
				div.className = CLASS_CLOSED
				div.onclick = onLeftClickOnCell
				div.oncontextmenu = onRightClickOnCell
				div.x = x
				div.y = y

				cell.appendChild div
				row.appendChild cell

			tbody.appendChild row


		table.appendChild tbody
		parent.appendChild table


	getAllCell = (callback) ->
		table   = document.getElementById ID_TABLE
		tbody   = table.children[0]
		rowList = tbody.children

		for y in [0..ySize-1]
			row = rowList[y]

			for x in [0..xSize-1]
				cell = row.children[x]
				div  = cell.children[0]
				callback div, x, y


	getClassName = (char)->
		if char is COVER_CHAR
			return CLASS_CLOSED
		else if char is FLAG_CHAR
			return CLASS_FLAG
		else if char is BOMB_CHAR
			return CLASS_BOMB
		else if char is 0
			return CLASS_ZERO
		else
			className = CLASS_NUMBER
			className += " n" + char
			return className




	initGame()





