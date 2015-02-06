console.log "script.coffee"


window.onload = ->
	createTable "game", 4, 4




createTable = (id, xSize, ySize)->

	gameDiv = document.getElementById id
	table   = document.createElement "table"
	tbody   = document.createElement "tbody"

	for y in [0..ySize-1]
		row = document.createElement "tr"

		for x in [0..xSize-1]
			cell = document.createElement "td"
			div  = document.createElement "div"
			div.innerHTML = (y * x) + x
			cell.appendChild div
			row.appendChild cell

		tbody.appendChild row

	table.appendChild tbody
	gameDiv.appendChild table




# game = generateGame 10, 10, 30

# game.open 0, 0
# game.dumpBoards()

# copy = game.getUnderBoard()
# console.log copy

# wait = (time, callback)-> setTimeout callback, time
# wait 1000, ->
# 	game.putFlag 2,2
# 	game.dumpBoards()
# 	wait 1000, ->
# 		game.putFlag 2,2
# 		game.dumpBoards()
