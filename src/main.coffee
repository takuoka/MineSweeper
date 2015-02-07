console.log "main.coffee"


# -------------- events -----------------

window.onload = ->
	onClickStart()

window.onClickStart = ->
	gameStart()

onGameOver = ->
	alert "gameOver!!"
	stopTimer()

onGameClear = ->
	alert "cleared!!"


# -------------- main function -----------------


gameStart = ->
	startScreen = document.getElementById "startScreen"
	xSize       = document.getElementById("xSize").value
	ySize       = document.getElementById("ySize").value
	bombNum     = document.getElementById("bombNum").value
	bombInfoNum = document.getElementById "bombInfoNum"

	generateGame "game", xSize, ySize, bombNum, onGameOver, onGameClear
	bombInfoNum.innerHTML = bombNum

	fadeOut startScreen

	startTimer()




# ---------------- timer -------------------------
tickInterval = null;

stopTimer = ->
	clearInterval tickInterval

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

wait = (time, callback)-> setTimeout callback, time





