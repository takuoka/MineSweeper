console.log "main.coffee"

window.onload = ->
	generateGame "game", 3, 3, 1

window.onGameOver = ->
	alert "gameOver!!"

window.onCleared = ->
	alert "cleared!!"