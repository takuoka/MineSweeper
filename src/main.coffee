console.log "main.coffee"

window.onload = ->
	generateGame "game", 13, 7, 20

window.onGameOver = ->
	alert "gameOver!!"
