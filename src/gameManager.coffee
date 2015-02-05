console.log "gameManager.coffee"

#盤面のサイズ
SIZE_X = 5
SIZE_Y = 6

#地雷の数
BOMB_NUM = 5

#盤面
BOARD = []#盤面の中身
FRONT_BOARD = []#ユーザーに見えてる盤面

#配列上での記号の定義
BOMB_CHAR = 'B'
FLAG_CHAR = 'F'#地雷があると確信したときに置くマーク



initBoards = (vSize, hSize, bomNum) ->

	rand = (max) -> Math.round Math.random() * max

	getRandomPlace = ->
		place = {}
		place.v = rand vSize - 1
		place.h = rand hSize - 1
		return place

	addBomb = ->
		p = getRandomPlace()
		if BOARD[p.v][p.h] isnt BOMB_CHAR
			BOARD[p.v][p.h] = BOMB_CHAR
		else
			addBomb()

	incrementSorroundingNumbers = (v, h) ->
		increment = (v, h) ->
			if BOARD[v] isnt undefined
				if BOARD[v][h] isnt undefined
					if BOARD[v][h] isnt BOMB_CHAR
						BOARD[v][h] += 1
		increment v-1, h-1
		increment v-1, h
		increment v-1, h+1
		increment v, h-1
		increment v, h+1
		increment v+1, h-1
		increment v+1, h
		increment v+1, h+1


	console.log "initBOARD"

	for v in [0..vSize-1]
		BOARD.push []
		FRONT_BOARD.push []
		for h in [0..hSize-1]
			BOARD[v].push 0
			FRONT_BOARD[v].push ''

	for i in [0..bomNum-1]
		addBomb()

	for v in [0..vSize-1]
		for h in [0..hSize-1]
			if BOARD[v][h] is BOMB_CHAR
				incrementSorroundingNumbers v, h




dumpBoard = (board)->
	vSize = board.length
	hSize = board[0].length

	for v in [0..vSize-1]
		str = ""
		for h in [0..hSize-1]
			str += board[v][h] + " "
		console.log str



initBoards SIZE_X, SIZE_Y, 5
dumpBoard BOARD
dumpBoard FRONT_BOARD
















