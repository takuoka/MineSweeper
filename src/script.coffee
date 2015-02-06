console.log "script.coffee"



#配列上での記号の定義 (gameManagerと共用)
window.BOMB_CHAR  = 'B'#地雷
window.FLAG_CHAR  = 'F'#地雷があると確信したときに置くマーク
window.COVER_CHAR = 'C'#開いていない状態


#生成するtable要素のid
ID_TABLE = "game_table"


# 全状態のクラス名 (すべてのマスはどれかの状態になる。)
# number　のみ、 .n1 ~ .n8 のようなクラス名が追加でつく
CLASS_CLOSED = "closed"
CLASS_NUMBER = "number"
CLASS_ZERO   = "zero"
CLASS_FLAG   = "flag"
CLASS_BOMB   = "bomb"


#script.js 内で使う変数
parentId = null
xSize = null
ySize = null
bombNum = null
gameManager = null



window.onload = ->
	generateGame "game", 4, 5, 3



# ------------- main function ---------------

generateGame = (_parentId, _xSize, _ySize, _bombNum)->
	parentId = _parentId
	xSize    = _xSize
	ySize    = _ySize
	bombNum  = _bombNum

	gameManager = generateGameManager xSize, ySize, bombNum

	createTable()

	updateTable()


# FRONT_BOARD から table の cell の クラス名に 反映
updateTable = ->
	board = gameManager.getFrontBoard()

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




# game = generateGameManager 10, 10, 30

# game.open 0, 0
# game.dumpBoards()

# copy = game.getUnderBoard()
# console.log copy

# wait = (time, callback)-> setTimeout callback, time
# wait 1000, ->
# 	game.putFlag 2,2
# 	game.dumpBoards()
# 	wait 1000, ->
# 		game.putFlag 2,2
# 		game.dumpBoards()
