var TICTACTOE = TICTACTOE || {
	
		winRoutes: [
			[1,2,3],
			[4,5,6],
			[7,8,9],
			[7,5,2],
			[1,5,9]
		],
		
		computerScore: 0,
		playerScore: 0,
		boardFill: [0,0,0,0,0,0,0,0,0],
		logEverything: function(){
			console.log("winning routes : " + TICTACTOE.winRoutes);
			console.log("player score : " + TICTACTOE.playerScore);
			console.log("computer score : " + TICTACTOE.computerScore);
			console.log("Filled spaces in board : " + TICTACTOE.boardFill);
		} 
	};

$(TICTACTOE.logEverything());
