

# -------------- events -----------------

window.onload = ->
	window.startValidation()# startPage.coffeeの初期化
	getElements()

window.onClickStartButton = ->
	if window.isValidConfig# startPage.coffeeにて判定されている
		gameStart()

window.onClickRetryButton = ->
	startScreen = document.getElementById "startScreen"
	fadeIn startScreen, ->
		hideEndScreen()



clickedX = null
clickedY = null
onClickCell = (e) ->
	clickedX = e.pageX - 50#謎のズレ
	clickedY = e.pageY - 50#謎のズレ


onGameOver = ->
	stopTimer()
	showGameOverScreen()
onGameClear = ->
	stopTimer()
	showGameClearScreen()


# ------------ element variables --------------

spreadWrapper = null
gameEndArea = null
startScreen　= null
bombInfoNum = null
spreadBg = null
timerElm = null
getElements = ->
	startScreen = document.getElementById "startScreen"
	spreadWrapper = document.getElementById "spreadWrapper"
	gameEndArea = document.getElementById "gameEndArea"
	bombInfoNum = document.getElementById "bombInfoNum"
	spreadBg = document.getElementById "spreadBg"
	timerElm = document.getElementById "timer"




# -------------- game start and reset -----------------

gameStart = ->
	resetTimer()
	deleteGame()
	xSize       = document.getElementById("xSize").value
	ySize       = document.getElementById("ySize").value
	bombNum     = document.getElementById("bombNum").value

	generateGame "game", xSize, ySize, bombNum, onGameOver, onGameClear, onClickCell
	bombInfoNum.innerHTML = bombNum

	fadeOut startScreen

	startTimer()

deleteGame = ->
	game = document.getElementById "game"
	if game.childNodes.length >= 1
		for i in [game.childNodes.length-1..0]
			game.removeChild game.childNodes[i]



# ---------------- gameover & clear Screen -------------------------

showGameClearScreen = ->
	removeClass spreadWrapper, "gameOver"
	removeClass gameEndArea, "gameOver"
	removeClass spreadWrapper, "gameClear"
	removeClass gameEndArea, "gameClear"

	addClass spreadWrapper, "gameClear"
	addClass gameEndArea, "gameClear"
	showEndScreen()
showGameOverScreen = ->
	removeClass spreadWrapper, "gameClear"
	removeClass gameEndArea, "gameClear"
	removeClass spreadWrapper, "gameOver"
	removeClass gameEndArea, "gameOver"

	addClass spreadWrapper, "gameOver"
	addClass gameEndArea, "gameOver"
	showEndScreen()



showEndScreen = ->
	gameEndArea.style.display = "block"
	spreadWrapper.style.display = "block"
	spreadBg.style.top = clickedY + "px"
	spreadBg.style.left = clickedX + "px"
	wait 100, ->
		spreadBg.className = "spread"
		wait 300, ->
			addClass gameEndArea, "show"
hideEndScreen = ->
	removeClass spreadBg, "spread"
	removeClass gameEndArea, "show"
	spreadWrapper.style.display = "none"
	gameEndArea.style.display = "none"




# ---------------- timer -------------------------

tickInterval = null;

startTimer = ->
	startDate = new Date()
	tick = ->
		t = getElapsedTime startDate
		timerString = t.minute + ":" + t.sec
		timerElm.innerHTML = timerString
	tickInterval = setInterval tick, 1000

stopTimer = -> clearInterval tickInterval
resetTimer = ->
	stopTimer()
	timerElm.innerHTML = "00:00"



# ---------------- util function -------------------------

wait = (time, callback)-> setTimeout callback, time


window.addClass = (elm, className) -> elm.className = elm.className + ' ' + className 

window.removeClass = (elm, removeClassName) ->
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

zeroPadding_2 = (num) -> return ("0" + num).slice(-2)







