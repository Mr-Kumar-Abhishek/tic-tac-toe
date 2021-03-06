var TICTACTOE = TICTACTOE || {
	
		winRoutes: [
			[1,2,3],
			[4,5,6],
			[7,8,9],
			[3,5,7],
			[1,5,9],
			[1,4,7],
			[2,5,8],
			[3,6,9],
			
		],
		
		boardCorner: [1,3,7,9],
		boardSide: [2,4,6,8],
		computerScore: 0,
		playerScore: 0,
		playerSign: null,
		computerSign: null,
		boardFill: [0,0,0,0,0,0,0,0,0],
		initialize: function(){
			TICTACTOE.logEverything();
			TICTACTOE.stageManage.startGame();
			
			/* tests for checking the workings of TICTACTOE game */
			//TICTACTOE.tests();
		},
		logEverything: function(){
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
	
TICTACTOE.stageManage = {
		startGame: function(){
			console.log("startGame is running ...");
			$("#start").click(function(){
				
				console.log("user initiated the game ...");
				
				var playerMark = $('input[name="player-mark"]:checked').val();
				console.log("playerMark got ..." + playerMark);
				
				var computerMark = TICTACTOE.stageManage.setComputerMark(playerMark);
				console.log("computerMark got ..." + computerMark);
				
				if (computerMark != 0) {
					TICTACTOE.playerSign = playerMark;
					console.log("playerSign got ...." + TICTACTOE.playerSign);
					
					TICTACTOE.computerSign = computerMark;
					console.log("computerSign got ..." + TICTACTOE.computerSign);
					
					TICTACTOE.stageManage.setStage();
					TICTACTOE.stageManage.disableGameSettings();
					
				}else{
					alert("Please Choose 'X' or 'Y' and then press 'start' button");
				}  
			});
		},
		setComputerMark: function(mark){
			if(mark == 'X'){
				return 'O';
			}else if(mark == 'O'){
				return 'X';
			}else {
				return 0;
			}
		},
		setStage: function(){
			if(TICTACTOE.computerSign == "X"){
				TICTACTOE.events.userClick();
				TICTACTOE.brain.takeStep();
			}else if(TICTACTOE.computerSign == "O"){
				TICTACTOE.events.userClick();
			}else {
				alert("Problem in setting stage...");
			}
		},
		resetStage: function(){
			if(TICTACTOE.computerSign == "X"){
				TICTACTOE.brain.takeStep();
			}else if (TICTACTOE.computerSign == "O"){
				// do nothing
			}else {
				alert("Problem in resetting the stage ..");
			}
		},
		disableGameSettings: function(){
			 document.getElementById("O").disabled = true;
			 document.getElementById("X").disabled = true;
			 document.getElementById("start").disabled = true;
		}
};

TICTACTOE.events = {
	userClick: function(){
		
		$(".tic-tac-box").click(function(){
            var blockIndex = $(this).index();
            if( TICTACTOE.percieve.isBlockEmpty(blockIndex + 1 ) == true ){
				$(this).html(TICTACTOE.playerSign);
				TICTACTOE.boardFill[blockIndex] = 2;
				TICTACTOE.events.afterUserClick();
			}
		});
	},
	computerClick: function(boxNumber) {
		$("#" + boxNumber).html(TICTACTOE.computerSign);
		TICTACTOE.boardFill[boxNumber - 1] = 1;
		TICTACTOE.judge.anyWon();
	},
	afterUserClick: function(){
		TICTACTOE.logEverything();
		TICTACTOE.brain.takeStep();
		TICTACTOE.judge.anyWon();
	},
	clearBoard: function() {
		$(".tic-tac-box").html("");
		TICTACTOE.boardFill.forEach(function(blockToClear, index, board){
			board[index] = 0;
		});
		TICTACTOE.stageManage.resetStage();
	},
	updateScoreUI: function() {
		$("#machine-score").html(TICTACTOE.computerScore);
		$("#user-score").html(TICTACTOE.playerScore);
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
	},
	isFull: function(){
		
		return TICTACTOE.boardFill.every(function(filledBlock){
					return filledBlock == 1 || filledBlock == 2;
				});
	}
}

TICTACTOE.judge = {
	
	anyWon: function(){
		if (TICTACTOE.judge.didUserWon() == true){
			alert("You won !");
			++TICTACTOE.playerScore;
			TICTACTOE.events.clearBoard();
			TICTACTOE.events.updateScoreUI();
		}else if ( TICTACTOE.judge.didComputerWon() == true ){
			alert("Machine Won !");
			++TICTACTOE.computerScore;
			TICTACTOE.events.clearBoard();
			TICTACTOE.events.updateScoreUI();
		}else if( TICTACTOE.percieve.isFull() == true ){
			alert("It is a Draw !");
			TICTACTOE.events.clearBoard();
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
