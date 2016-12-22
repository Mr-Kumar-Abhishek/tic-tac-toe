var TICTACTOE = TICTACTOE || {
	
		winRoutes: [
			[1,2,3],
			[4,5,6],
			[7,8,9],
			[7,5,2],
			[1,5,9],
			[1,4,7],
			[2,3,8],
			[3,6,9]
		],
		
		computerScore: 0,
		playerScore: 0,
		boardFill: [0,0,0,0,0,0,0,0,0],
		initialize: function(){
			TICTACTOE.logEverything();
			TICTACTOE.tests();
		},
		logEverything: function(){
			console.log("winning routes : " + TICTACTOE.winRoutes);
			console.log("player score : " + TICTACTOE.playerScore);
			console.log("computer score : " + TICTACTOE.computerScore);
			console.log("Filled spaces in board : " + TICTACTOE.boardFill);
		},
		tests: function(){
			TICTACTOE.events.userClick();
			TICTACTOE.events.computerClick("1");
			TICTACTOE.events.computerClick("2");
			TICTACTOE.events.computerClick("3");
			TICTACTOE.events.computerClick("4");
			TICTACTOE.events.computerClick("5");
			TICTACTOE.events.computerClick("6");
			TICTACTOE.events.computerClick("7");
			TICTACTOE.events.computerClick("8");
			TICTACTOE.events.computerClick("9");
			TICTACTOE.logEverything();
		}
	};
	
	
TICTACTOE.events = {
	userClick: function(){
		$("#1").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[0] = 2;
			TICTACTOE.logEverything();
		});
		$("#2").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[1] = 2;
			TICTACTOE.logEverything();
		});
		$("#3").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[2] = 2;
			TICTACTOE.logEverything();
		});
		$("#4").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[3] = 2;
			TICTACTOE.logEverything();
		});
		$("#5").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[4] = 2;
			TICTACTOE.logEverything();
		});
		$("#6").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[5] = 2;
			TICTACTOE.logEverything();
		});
		$("#7").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[6] = 2;
			TICTACTOE.logEverything();
		});
		$("#8").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[7] = 2;
			TICTACTOE.logEverything();
		});
		$("#9").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[8] = 2;
			TICTACTOE.logEverything();
		});
	},
	computerClick: function(boxNumber) {
		$("#" + boxNumber).html("O");
		TICTACTOE.boardFill[boxNumber - 1] = 1;
	}
}

$(TICTACTOE.initialize());
