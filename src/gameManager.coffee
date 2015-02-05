console.log "gameManager.coffee"

#盤面のサイズ
verticalSize = 5
horizonalSize = 6

#地雷の数
numberOfBomb = 5

#盤面
userBoard = []#ユーザーに見えてる盤面
contentsBoard = []#盤面の中身


#配列上での記号の定義
BOMB_CHAR = 'B'
QUESTION_CHAR = '?'#地雷があるかもしれないときに置くマーク
FLAG_CHAR = 'F'#地雷があると確信したときに置くマーク



initUserBoard = (vSize, hSize) ->
	for v in [0..vSize-1]
		userBoard.push []
		for h in [0..hSize-1]
			userBoard[v].push ''



initContentsBoard = (vSize, hSize, bomNum) ->
	console.log "initContentsBoard"
	for v in [0..vSize-1]
		contentsBoard.push []
		for h in [0..hSize-1]
			contentsBoard[v].push 0

	rand = (max) -> Math.round Math.random() * max

	getRandomPlace = ->
		place = {}
		place.v = rand vSize - 1
		place.h = rand hSize - 1
		return place

	addBomb = ->
		p = getRandomPlace()
		if contentsBoard[p.v][p.h] isnt BOMB_CHAR
			contentsBoard[p.v][p.h] = BOMB_CHAR
		else
			addBomb()

	incrementSorroundingNumbers = (v, h) ->
		increment = (v, h) ->
			if contentsBoard[v] isnt undefined
				if contentsBoard[v][h] isnt undefined
					if contentsBoard[v][h] isnt BOMB_CHAR
						contentsBoard[v][h] += 1
		increment v-1, h-1
		increment v-1, h
		increment v-1, h+1
		increment v, h-1
		increment v, h+1
		increment v+1, h-1
		increment v+1, h
		increment v+1, h+1


	for i in [0..bomNum-1]
		addBomb()

	for v in [0..vSize-1]
		for h in [0..hSize-1]
			if contentsBoard[v][h] is BOMB_CHAR
				incrementSorroundingNumbers v, h




dumpBoard = (board)->
	vSize = board.length
	hSize = board[0].length

	for v in [0..vSize-1]
		str = ""
		for h in [0..hSize-1]
			str += contentsBoard[v][h] + " "
		console.log str



initContentsBoard verticalSize, horizonalSize, 5
dumpBoard contentsBoard
















