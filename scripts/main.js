//http://code.tutsplus.com/tutorials/learn-createjs-by-building-an-html5-pong-game--active-11845

(function (createJs) {
	'use strict';
	
	var canvas, // linked to the canvas element
		stage, // add elements to the stage
		backgroundGrphic,
		mainBackground,
		startBtn, // start button
		creditsBtn, // credits button
		credits, // the credits screen
		player, // the player paddle
		ball, // ball graphic
		cpu, // computer paddle
		win, // winning popup
		lose;
		
		var playerScore,
			cpuScore,
			cpuSpeed;
			
		var xSpeed = 5,
			ySpeed = 5;
			
		var ticker = new Object();
		
		var preloader,
			manifest,
			totalLoaded = 0;
			
		var titleView = new Container();
		
	window.addEventListener('error')
		
	function logError(err){
		console.error(err);		
	}
		
	function main() {
		canvas = document.getElementById('PongStage');
		stage = new createjs.Stage(canvas);
		
		stage.mouseEventsEnabled = true;
		
		SoundJS.FlashPlugin.BASE_PATH = "assets/";
		if(!SoundJS.checkPlugin(true)){
			throw new Error("Unable to load sound plugin");
		}
		
		manifest = [
			{src:"bg.png", id:"bg"},
            {src:"main.png", id:"main"},
            {src:"startB.png", id:"startB"},
            {src:"creditsB.png", id:"creditsB"},
            {src:"credits.png", id:"credits"},
            {src:"paddle.png", id:"cpu"},
            {src:"paddle.png", id:"player"},
            {src:"ball.png", id:"ball"},
            {src:"win.png", id:"win"},
            {src:"lose.png", id:"lose"},
            {src:"playerScore.mp3|playerScore.ogg", id:"playerScore"},
            {src:"enemyScore.mp3|enemyScore.ogg", id:"enemyScore"},
            {src:"hit.mp3|hit.ogg", id:"hit"},
            {src:"wall.mp3|wall.ogg", id:"wall"}
		];
		
		
		preloader = new PreloaderJS();
		preloader.installPlugin(SoundJS);
		
	}	
})(createJs);