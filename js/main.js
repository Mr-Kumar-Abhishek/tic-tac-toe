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
		boardSide: [2,4,6,8],
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
			TICTACTOE.events.afterUserClick();
		});
		$("#2").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[1] = 2;
			TICTACTOE.events.afterUserClick();
		});
		$("#3").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[2] = 2;
			TICTACTOE.events.afterUserClick();
		});
		$("#4").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[3] = 2;
			TICTACTOE.events.afterUserClick();
		});
		$("#5").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[4] = 2;
			TICTACTOE.events.afterUserClick();
		});
		$("#6").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[5] = 2;
			TICTACTOE.events.afterUserClick();
		});
		$("#7").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[6] = 2;
			TICTACTOE.events.afterUserClick();
		});
		$("#8").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[7] = 2;
			TICTACTOE.events.afterUserClick();
		});
		$("#9").click(function(){
			$(this).html("X");
			TICTACTOE.boardFill[8] = 2;
			TICTACTOE.events.afterUserClick();
		});
	},
	computerClick: function(boxNumber) {
		$("#" + boxNumber).html("O");
		TICTACTOE.boardFill[boxNumber - 1] = 1;
	},
	afterUserClick: function(){
		TICTACTOE.logEverything();
		TICTACTOE.brain.takeStep();
		TICTACTOE.judge.anyWon();
	}
}

TICTACTOE.brain = {
	
	// this will hold the algorithm to beat the user, currently it is dumb.
	
	takeStep: function(){
		TICTACTOE.events.computerClick(TICTACTOE.brain.decide());
	},
	
	decide: function(){
		if (TICTACTOE.percieve.isEmpty() == true){
			
			var success = TICTACTOE.brain.strategyPlayCenter();
			
			if (success == false ){
				
				console.log("Can't play center :/ . User is cheating !");
				
			}else if ( success == true ){
				
				console.log("Played center ! Your move user :D ");
				
			}
		
		}
		else if(TICTACTOE.percieve.isAnyCornerEmpty() == true ){
			
			console.log("Empty corners found ! Making my move in it .");
			
			var cornerSelected = Math.floor(Math.random()*TICTACTOE.boardCorner.length);
			
			console.log("First corner array position selected : " + cornerSelected );
			console.log("First corner Selected: " + TICTACTOE.boardCorner[cornerSelected] );
			
			while( TICTACTOE.percieve.isBlockEmpty(TICTACTOE.boardCorner[cornerSelected]) == false ){
				
				cornerSelected = Math.floor(Math.random()*TICTACTOE.boardCorner.length);
				
				console.log("Corner array position selection updated : " + cornerSelected );
				console.log("Corner Selection updated: " + TICTACTOE.boardCorner[cornerSelected] );
			}
			
			TICTACTOE.events.computerClick(TICTACTOE.boardCorner[cornerSelected]);
		}
		else if(TICTACTOE.percieve.isAnySideEmpty() == true){
			
			console.log("Empty sides found ! Making my move in it !");
			
			var sideSelected = Math.floor(Math.random()*TICTACTOE.boardSide.length);
			
			console.log("First side array position selected : " + sideSelected );
			console.log("First side Selected: " + TICTACTOE.boardCorner[sideSelected] );
			
			while ( TICTACTOE.percieve.isBlockEmpty(TICTACTOE.boardSide[sideSelected]) == false ){
				
				sideSelected = Math.floor(Math.random()*TICTACTOE.boardSide.length);
				
				console.log("Corner array position selection updated : " + sideSelected );
				console.log("Corner Selection updated: " + TICTACTOE.boardSide[sideSelected] );
			}
			
			TICTACTOE.events.computerClick(TICTACTOE.boardSide[sideSelected]);
		}
	},
	
	strategyPlayCenter: function(){
		
		var centerBox = 5;
		
		if ( TICTACTOE.percieve.isBlockEmpty(centerBox) == true ) {
			
			TICTACTOE.events.computerClick(centerBox);
			
			return true;
		}
		
		return false;
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
	
	isAnyCornerFilled: function(){
		
		var assumption = false;
		
		TICTACTOE.boardSide.some(function(block){
			if ( TICTACTOE.boardFill[ block - 1 ] == 2 ){
				assumption = true;
				return assumption;
			}
		});
		
		return assumption;
	},
	
	isAnyCornerEmpty: function(){
		
		var assumption = false;
		
		TICTACTOE.boardCorner.some(function(block){
			if ( TICTACTOE.boardFill[ block - 1 ] == 0 ){
				assumption = true;
				return assumption;
			}
		});
		
		return assumption;
	},
	isAnySideEmpty: function(){
		
		var assumption = false;
		
		TICTACTOE.boardSide.some(function(block){
			if ( TICTACTOE.boardFill[ block - 1 ] == 0 ){
				assumption = true;
				return assumption;
			}
		});
		
		return assumption;
	},
	
	isBlockEmpty: function(selectedBlock){
		
		if ( TICTACTOE.boardFill[selectedBlock - 1 ] == 0 ){
			
			return true;
		}
		else{
			
			return false;
		}
	},
	isBlockByComputer: function(CBlock){
		 return TICTACTOE.boardFill[CBlock  - 1 ] == 1;
	},
	isBlockByUser: function(UBlock){
		return TICTACTOE.boardFill[UBlock - 1 ] == 2;
	} 
}

TICTACTOE.judge = {
	
	anyWon: function(){
		var winLoose  = TICTACTOE.winRoutes.some(function(route){
			
							return route.every(TICTACTOE.percieve.isBlockByComputer) || route.every(TICTACTOE.percieve.isBlockByComputer);
						});
		
		if (winLoose == true){
			console.log("Someone won");
		}
	},
	didComputerWon: function(){
		var computerWon = TICTACTOE.winRoutes.some(function ( cRoute ){
							
							return cRoute.every(TICTACTOE.percieve.isBlockByComputer);
						});
		return computerWon;
	},
	didUserWon: function(){
		var userWon = TICTACTOE.winRoutes.some(function (uRoute) {
			
							return uRoute.every(TICTACTOE.percieve.isBlockByUser);
					});
		return userWon;
	}
}

$(TICTACTOE.initialize());
