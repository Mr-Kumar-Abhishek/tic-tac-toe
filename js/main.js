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
		
		boardCorner: [1,3,7,9],
		
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
			TICTACTOE.brain.takeStep();
			TICTACTOE.logEverything();
		}
	};
	
	
TICTACTOE.events = {
	userClick: function(){
		$("#1").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[0] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#2").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[1] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#3").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[2] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#4").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[3] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#5").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[4] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#6").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[5] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#7").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[6] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#8").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[7] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
		$("#9").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[8] = 2;
			TICTACTOE.logEverything();
			TICTACTOE.brain.takeStep();
		});
	},
	computerClick: function(boxNumber) {
		$("#" + boxNumber).html("O");
		TICTACTOE.boardFill[boxNumber - 1] = 1;
	}
}

TICTACTOE.brain = {
	
	takeStep: function(){
		TICTACTOE.events.computerClick(TICTACTOE.brain.decide());
	},
	
	decide: function(){
		if (TICTACTOE.percieve.isEmpty() == true){
			
			TICTACTOE.events.computerClick("5");
		
		}else if ( TICTACTOE.percieve.isCorner() == true ){
			
			console.log("Caught corner !");
			
		}
	}
}

TICTACTOE.percieve = {
	
	isEmpty: function(){
		var assumption = true;
		TICTACTOE.boardFill.forEach(function(block){
				if ( 0 ==! block){
					assumption = false;
				}
			});
		return assumption;
	},
	
	isCorner: function(){
		var assumption = false;
		
		TICTACTOE.boardCorner.some(function(block){
			if ( TICTACTOE.boardFill[ block - 1 ] == 2 ){
				assumption = true;
				return assumption;
			}
		});
		
		return assumption;
	}
}

$(TICTACTOE.initialize());
