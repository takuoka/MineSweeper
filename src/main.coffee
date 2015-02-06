console.log "main.coffee"

window.onload = ->
	generateGame "game", 3, 3, 1, onGameOver, onGameClear

onGameOver = ->
	alert "gameOver!!"

onGameClear = ->
	alert "cleared!!"
