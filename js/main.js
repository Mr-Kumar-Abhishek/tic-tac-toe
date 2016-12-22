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
		}
	};
	
	
TICTACTOE.events = {
	userClick: function(){
		$("#1").click(function(){
			$(this).html("X");
		});
		$("#2").click(function(){
			$(this).html("X");
		});
		$("#3").click(function(){
			$(this).html("X");
		});
		$("#4").click(function(){
			$(this).html("X");
		});
		$("#5").click(function(){
			$(this).html("X");
		});
		$("#6").click(function(){
			$(this).html("X");
		});
		$("#7").click(function(){
			$(this).html("X");
		});
		$("#8").click(function(){
			$(this).html("X");
		});
		$("#9").click(function(){
			$(this).html("X");
		});
	},
	computerClick: function(boxNumber) {
		$("#" + boxNumber).html("O");
	}
}

$(TICTACTOE.initialize());
