console.log "script.coffee"



game = generateGame 10, 10, 50



game.open 0,0
game.dumpBoards()

wait = (time, callback)-> setTimeout callback, time

wait 1000, ->
	game.putFlag 2,2
	game.dumpBoards()

	wait 1000, ->
		game.putFlag 2,2
		game.dumpBoards()
