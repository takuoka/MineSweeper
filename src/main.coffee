console.log "main.coffee"

window.onload = ->
	generateGame "game", 7, 6, 3, onGameOver, onGameClear

onGameOver = ->
	alert "gameOver!!"

onGameClear = ->
	alert "cleared!!"
