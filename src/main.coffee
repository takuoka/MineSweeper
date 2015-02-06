console.log "main.coffee"

window.onload = ->
	generateGame "game", 6, 5, 3

window.onGameOver = ->
	alert "gameOver!!"
