console.log "main.coffee"

window.onload = ->
	# onClickStart()


window.onClickStart =->

	startScreen = document.getElementById "startScreen"
	xSize       = document.getElementById("xSize").value
	ySize       = document.getElementById("ySize").value
	bombNum     = document.getElementById("bombNum").value
	bombInfoNum = document.getElementById "bombInfoNum"

	generateGame "game", xSize, ySize, bombNum, onGameOver, onGameClear

	console.log bombInfoNum
	bombInfoNum.innerHTML = bombNum

	hide startScreen


onGameOver = ->
	alert "gameOver!!"

onGameClear = ->
	alert "cleared!!"


hide = (elm)->
	elm.style.opacity = 0
	wait 500, -> elm.style.display = "none"



wait = (time, callback)-> setTimeout callback, time