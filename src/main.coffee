console.log "main.coffee"

window.onload = ->
	generateGame "game", 10, 10, 20

window.onGameOver = ->
	alert "gameOver!!"

window.onCleared = ->
	alert "cleared!!"