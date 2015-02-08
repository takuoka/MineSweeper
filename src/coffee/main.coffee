

# ゲームの開始と終了の処理


# ---------- DOM element variables ------------

el_spreadWrapper = null
el_gameEndArea = null
el_startScreen = null
el_bombInfoNum = null
el_spreadBg = null
el_timerElm = null
getElements = ->
	el_startScreen = document.getElementById "startScreen"
	el_spreadWrapper = document.getElementById "spreadWrapper"
	el_gameEndArea = document.getElementById "gameEndArea"
	el_bombInfoNum = document.getElementById "bombInfoNum"
	el_spreadBg = document.getElementById "spreadBg"
	el_timerElm = document.getElementById "timer"






# -------------- events ----------------------

window.onload = ->
	window.startValidation()# startPage.js の実行
	getElements()

window.onClickStartButton = ->
	if window.isValidConfig# startPage.js にて判定されている
		gameStart()

window.onClickRetryButton = ->
	fadeIn el_startScreen, ->
		hideEndScreen()




# セルをクリックしたカーソルの位置を保持して、
# クリア時とゲームオーバー時に使用する
clickedX = null
clickedY = null

# この３つのイベントハンドラ は gameFront.js に 渡して コールバックをうける
onClickCell = (e) ->
	clickedX = e.pageX - 50#謎のズレ
	clickedY = e.pageY - 50#謎のズレ
onGameOver = ->
	stopTimer()
	showGameOverScreen()
onGameClear = ->
	stopTimer()
	showGameClearScreen()







# -------------- game start 関数 ---------------------

gameStart = ->
	resetTimer()
	deleteGame()
	xSize       = document.getElementById("xSize").value
	ySize       = document.getElementById("ySize").value
	bombNum     = document.getElementById("bombNum").value

	# gameFront.js の 実行
	generateGame "game", xSize, ySize, bombNum, onGameOver, onGameClear, onClickCell

	el_bombInfoNum.innerHTML = bombNum

	fadeOut el_startScreen

	startTimer()

deleteGame = ->
	game = document.getElementById "game"
	if game.childNodes.length >= 1
		for i in [game.childNodes.length-1..0]
			game.removeChild game.childNodes[i]





# ----------- GameOver & GameClear の show と hide 関数 ------------

showGameClearScreen = ->
	removeClass el_spreadWrapper, "gameOver"
	removeClass el_gameEndArea, "gameOver"
	removeClass el_spreadWrapper, "gameClear"
	removeClass el_gameEndArea, "gameClear"

	addClass el_spreadWrapper, "gameClear"
	addClass el_gameEndArea, "gameClear"
	showEndScreen()
showGameOverScreen = ->
	removeClass el_spreadWrapper, "gameClear"
	removeClass el_gameEndArea, "gameClear"
	removeClass el_spreadWrapper, "gameOver"
	removeClass el_gameEndArea, "gameOver"

	addClass el_spreadWrapper, "gameOver"
	addClass el_gameEndArea, "gameOver"
	showEndScreen()



showEndScreen = ->
	el_gameEndArea.style.display = "block"
	el_spreadWrapper.style.display = "block"
	el_spreadBg.style.top = clickedY + "px"
	el_spreadBg.style.left = clickedX + "px"
	wait 100, ->
		el_spreadBg.className = "spread"
		wait 300, ->
			addClass el_gameEndArea, "show"
hideEndScreen = ->
	removeClass el_spreadBg, "spread"
	removeClass el_gameEndArea, "show"
	el_spreadWrapper.style.display = "none"
	el_gameEndArea.style.display = "none"




# ---------------- timer の start & stop 関数 -----------------

tickInterval = null;

startTimer = ->
	startDate = new Date()
	tick = ->
		t = getElapsedTime startDate
		timerString = t.minute + ":" + t.sec
		el_timerElm.innerHTML = timerString
	tickInterval = setInterval tick, 1000

stopTimer = -> clearInterval tickInterval
resetTimer = ->
	stopTimer()
	el_timerElm.innerHTML = "00:00"



# ---------------- util function -------------------------

wait = (time, callback)->
	setTimeout callback, time

addClass = (elm, className) ->
	elm.className = elm.className + ' ' + className 


removeClass = (elm, removeClassName) ->
    classString = elm.className
    nameIndex = classString.indexOf removeClassName

    if nameIndex isnt -1
    	classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+removeClassName.length)

    elm.className = classString


fadeOut = (elm)->
	elm.style.opacity = 0
	wait 500, -> elm.style.display = "none"

fadeIn = (elm, callback)->
	elm.style.display = "block"
	wait 100, ->
		elm.style.opacity = 1
		wait 500, ->
			callback() if callback


getElapsedTime = (startDate)->
	nowDate   = new Date()
	totalTime = nowDate.getTime() - startDate.getTime()

	hour      = Math.floor(totalTime/(60*60*1000))
	totalTime = totalTime-(hour*60*60*1000)

	minute    = Math.floor(totalTime/(60*1000))
	totalTime = totalTime-(minute*60*1000)

	sec       = Math.floor(totalTime/1000)

	elapsedTime        = {}
	elapsedTime.minute = zeroPadding_2 minute
	elapsedTime.sec    = zeroPadding_2 sec
	return elapsedTime


zeroPadding_2 = (num) ->
	return ("0" + num).slice(-2)







