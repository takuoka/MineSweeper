console.log "main.coffee"


# -------------- events -----------------

# window.onload = ->
	# onClickStartButton()
	# wait 600, ->
	# 	showGameOverScreen()

window.onClickStartButton = ->
	gameStart()

window.onClickRetryButton = ->
	startScreen = document.getElementById "startScreen"
	fadeIn startScreen, ->
		hideGameOverScreen()



clickedX = null
clickedY = null
onClickCell = (e) ->
	clickedX = e.pageX
	clickedY = e.pageY

onGameOver = ->
	# alert "gameOver!!"
	stopTimer()
	showGameOverScreen()

onGameClear = ->
	alert "cleared!!"


# -------------- main function -----------------


gameStart = ->

	resetTimer()
	deleteGameTable()

	startScreen = document.getElementById "startScreen"
	xSize       = document.getElementById("xSize").value
	ySize       = document.getElementById("ySize").value
	bombNum     = document.getElementById("bombNum").value
	bombInfoNum = document.getElementById "bombInfoNum"

	generateGame "game", xSize, ySize, bombNum, onGameOver, onGameClear, onClickCell
	bombInfoNum.innerHTML = bombNum

	fadeOut startScreen

	startTimer()

deleteGameTable = ->

	game = document.getElementById "game"

	if game.childNodes.length >= 1
		# for (var i =aNode.childNodes.length-1; i>=0; i--)
		for i in [game.childNodes.length-1..0]
			game.removeChild game.childNodes[i]



# ---------------- game end screen -------------------------

showGameOverScreen = ->
	spreadWrapper = document.getElementById "spreadWrapper"
	gameEndArea = document.getElementById "gameEndArea"
	spreadBg = document.getElementById "spreadBg"
	gameEndArea.style.display = "block"
	spreadWrapper.style.display = "block"

	spreadBg.style.top = clickedY + "px"
	spreadBg.style.left = clickedX + "px"

	wait 100, ->
		spreadBg.className = "spread"
		wait 300, ->
			addClass gameEndArea, "show"

hideGameOverScreen = ->
	spreadWrapper = document.getElementById "spreadWrapper"
	spreadBg = document.getElementById "spreadBg"
	gameEndArea = document.getElementById "gameEndArea"
	removeClass spreadBg, "spread"
	removeClass gameEndArea, "show"
	spreadWrapper.style.display = "none"
	gameEndArea.style.display = "none"




# ---------------- timer -------------------------
tickInterval = null;

stopTimer = ->
	clearInterval tickInterval

resetTimer = ->
	stopTimer()
	timerElm = document.getElementById "timer"
	timerElm.innerHTML = "00:00"

startTimer = ->
	timerElm = document.getElementById "timer"
	startDate = new Date()

	tick = ->
		t = getElapsedTime startDate
		timerString = t.minute + ":" + t.sec
		timerElm.innerHTML = timerString
	tickInterval = setInterval tick, 1000



# ---------------- util function -------------------------

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


fadeOut = (elm)->
	elm.style.opacity = 0
	wait 500, -> elm.style.display = "none"

fadeIn = (elm, callback)->
	elm.style.display = "block"
	wait 100, ->
		elm.style.opacity = 1
		wait 500, ->
			callback() if callback

addClass = (elm, className) -> elm.className = elm.className + ' ' + className 
removeClass = (elm, removeClassName) ->
    classString = elm.className
    nameIndex = classString.indexOf removeClassName

    if nameIndex isnt -1
    	classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+removeClassName.length)

    elm.className = classString

wait = (time, callback)-> setTimeout callback, time





