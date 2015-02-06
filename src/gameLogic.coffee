
window.generateGameLogic = (sizeX, sizeY, bomNum) ->

	#盤面のサイズ, 地雷の数 (デフォルトは 5 )
	SIZE_X   = 5
	SIZE_Y   = 5
	BOMB_NUM = 5
	#引数があれば代入
	SIZE_X   = sizeX if sizeX
	SIZE_Y   = sizeY if sizeY
	BOMB_NUM = bomNum if bomNum



	#盤面
	UNDER_BOARD = []#盤面の中身
	FRONT_BOARD = []#ユーザーに見えてる盤面


	initBoards =  (xSize, ySize, bomNum)->
		initFrontBoard(xSize, ySize)
		initUnderBoard(xSize, ySize, bomNum)


	initFrontBoard = (xSize, ySize) ->
		for y in [0..ySize-1]
			FRONT_BOARD.push []
			for x in [0..xSize-1]
				FRONT_BOARD[y].push COVER_CHAR


	initUnderBoard = (xSize, ySize, bomNum) ->
		addBomb = ->
			p = getRandomPlace xSize, ySize
			if UNDER_BOARD[p.y][p.x] isnt BOMB_CHAR
				UNDER_BOARD[p.y][p.x] = BOMB_CHAR
			else
				addBomb()
		incrementSorroundingNumbers = (x, y) ->
			getSorroundingPlace x, y, (sx, sy)->
				if UNDER_BOARD[sy][sx] isnt BOMB_CHAR
					UNDER_BOARD[sy][sx] += 1

		#盤面の初期化
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


	open = (x, y) ->
		value = UNDER_BOARD[y][x]
		FRONT_BOARD[y][x] = value
		# もし 0 なら 周りのマスも開ける
		if value is 0
			getSorroundingPlace x, y, (sx, sy)->
				if FRONT_BOARD[sy][sx] is COVER_CHAR
					open sx, sy
		return value


	putFlag = (x, y) ->
		if FRONT_BOARD[y][x] is COVER_CHAR
			FRONT_BOARD[y][x] = FLAG_CHAR
		else if FRONT_BOARD[y][x] is FLAG_CHAR
			FRONT_BOARD[y][x] = COVER_CHAR


	dumpBoards = ->
		dumpBoard UNDER_BOARD
		dumpBoard FRONT_BOARD
		console.log "=============="


	# --------------- util methods ------------------

	rand = (max) ->
		return Math.round Math.random() * max
	getRandomPlace = (xSize, ySize)->
		place = {}
		place.x = rand xSize - 1
		place.y = rand ySize - 1
		return place


	getSorroundingPlace = (x, y, callback) ->
		checkAndCallBack = (x, y) ->
			if UNDER_BOARD[y] isnt undefined
				if UNDER_BOARD[y][x] isnt undefined
					callback(x, y)
		checkAndCallBack x-1, y-1
		checkAndCallBack x-1, y
		checkAndCallBack x-1, y+1
		checkAndCallBack x  , y-1
		checkAndCallBack x  , y+1
		checkAndCallBack x+1, y-1
		checkAndCallBack x+1, y
		checkAndCallBack x+1, y+1



	dumpBoard = (board)->
		console.log "---------"
		ySize = board.length
		xSize = board[0].length
		for y in [0..ySize-1]
			str = ""
			for x in [0..xSize-1]
				str += board[y][x] + " "
			console.log str
		console.log "---------"



	initBoards SIZE_X, SIZE_Y, BOMB_NUM


	API = {}
	API.open = open
	API.putFlag = putFlag
	API.dumpBoards = dumpBoards	
	API.getUnderBoard = -> return $.extend true, [], UNDER_BOARD
	API.getFrontBoard = -> return $.extend true, [], FRONT_BOARD
	return API

