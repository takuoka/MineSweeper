console.log "gameManager.coffee"

#盤面のサイズ
SIZE_X = 5
SIZE_Y = 6

#地雷の数
BOMB_NUM = 5

#盤面
UNDER_BOARD = []#盤面の中身
FRONT_BOARD = []#ユーザーに見えてる盤面

#配列上での記号の定義
BOMB_CHAR = 'B'
FLAG_CHAR = 'F'#地雷があると確信したときに置くマーク


initBoards =  (xSize, ySize, bomNum)->
	console.log "initBoards"
	initFrontBoard(xSize, ySize)
	initUnderBoard(xSize, ySize, bomNum)


initFrontBoard = (xSize, ySize) ->
	for y in [0..ySize-1]
		FRONT_BOARD.push []
		for x in [0..xSize-1]
			FRONT_BOARD[y].push ''


initUnderBoard = (xSize, ySize, bomNum) ->
	addBomb = ->
		p = getRandomPlace xSize, ySize
		if UNDER_BOARD[p.y][p.x] isnt BOMB_CHAR
			UNDER_BOARD[p.y][p.x] = BOMB_CHAR
		else
			addBomb()
	incrementSorroundingNumbers = (x, y) ->
		getSorroundingPlace UNDER_BOARD, x, y, (sx, sy)->
			UNDER_BOARD[sy][sx] += 1

	#２つの盤面の初期化
	for y in [0..ySize-1]
		UNDER_BOARD.push []
		for x in [0..xSize-1]
			UNDER_BOARD[y].push 0

	#地雷の追加
	for i in [0..bomNum-1]
		addBomb()

	#番号の追加
	for y in [0..ySize-1]
		for x in [0..xSize-1]
			if UNDER_BOARD[y][x] is BOMB_CHAR
				incrementSorroundingNumbers x, y







# --------------- util methods ------------------

rand = (max) -> Math.round Math.random() * max

getRandomPlace = (xSize, ySize)->
	place = {}
	place.x = rand xSize - 1
	place.y = rand ySize - 1
	return place


getSorroundingPlace = (board, x, y, callback) ->
	checkAndDo = (x, y) ->
		if board[y] isnt undefined
			if board[y][x] isnt undefined
				if board[y][x] isnt BOMB_CHAR
					callback(x, y)
	checkAndDo x-1, y-1
	checkAndDo x-1, y
	checkAndDo x-1, y+1
	checkAndDo x  , y-1
	checkAndDo x  , y+1
	checkAndDo x+1, y-1
	checkAndDo x+1, y
	checkAndDo x+1, y+1



dumpBoard = (board)->
	ySize = board.length
	xSize = board[0].length

	for y in [0..ySize-1]
		str = ""
		for x in [0..xSize-1]
			str += board[y][x] + "-"
		console.log str



initBoards SIZE_X, SIZE_Y, 5
dumpBoard UNDER_BOARD
dumpBoard FRONT_BOARD
















