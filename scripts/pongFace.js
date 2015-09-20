//http://code.tutsplus.com/tutorials/learn-createjs-by-building-an-html5-pong-game--active-11845

(function (Tween, Ticker) {
	'use strict';
	
	var _self = {
		canvas : null, // linked to the canvas element
		stage: null, // add elements to the stage
		bg: null,
		titleBg: null,
		startBtn: null, // start button
		//creditsBtn, // credits button
		//credits, // the credits screen
		player: null, // the player paddle
		ball: null, // ball graphic
		cpu: null, // computer paddle
		win: null, // winning popup
		lose: null,
		totalLoaded: 0,		
		playerScore: 0,
		cpuScore: 0,
		cpuSpeed:6,			
		xSpeed : 5,
		ySpeed : 5,		
		ticker : new Object(),		
		preloader: null,
		manifest: null,			
		titleView: new Container(),
		rallyLength: 0,
		speedAdjustment: 0,
		cpuWonLastPoint : false
	};
		
	window.addEventListener('error');
	
	window.main = main;
		
	function logError(err){
		console.error(err);		
	}
		
	function main() {
		_self.canvas = document.getElementById('PongStage');
		_self.stage = new Stage(_self.canvas);
		
		_self.stage.mouseEventsEnabled = true;
		
		// SoundJS.FlashPlugin.BASE_PATH = "assets/";
		// if(!SoundJS.checkPlugin(true)){
		// 	throw new Error("Unable to load sound plugin");
		// }
		// 
		_self.manifest = [
			{src:"assets/bg.png", id:"bg"},
            {src:"assets/title.png", id:"titleBg"},
            {src:"assets/startBtn.png", id:"startBtn"},
            // {src:"creditsB.png", id:"creditsB"},
            // {src:"credits.png", id:"credits"},
            {src:"assets/paddle.png", id:"cpu"},
            {src:"assets/paddle.png", id:"player"},
            {src:"assets/ball.png", id:"ball"},
            {src:"assets/win.png", id:"win"},
            {src:"assets/lose.png", id:"lose"},
            // {src:"playerScore.mp3|playerScore.ogg", id:"playerScore"},
            // {src:"enemyScore.mp3|enemyScore.ogg", id:"enemyScore"},
            // {src:"hit.mp3|hit.ogg", id:"hit"},
            // {src:"wall.mp3|wall.ogg", id:"wall"}
		];
		
		
		_self.preloader = new PreloadJS();
		_self.preloader.installPlugin(SoundJS);
		_self.preloader.onProgress = handleProgress;
		_self.preloader.onComplete = handleComplete;
		_self.preloader.onFileLoad = handleFileLoad;
		_self.preloader.loadManifest(_self.manifest);
		
		Ticker.setFPS(30);
		Ticker.addListener(_self.stage);
	}	
	
	function handleProgress(event) {
		
	}
	
	function handleComplete(event) {
		
	}
	
	function handleFileLoad(event) {
		
		switch(event.type) {
			case PreloadJS.IMAGE:
				var img = new Image();
				img.src = event.src;
				img.onload = handleLoadComplete;
				_self[event.id] = new Bitmap(img);
				break;
			case PreloadJS.SOUND:
				handleLoadComplete();
				break;			
		}
	}
	
	function handleLoadComplete() {
		_self.totalLoaded++;
		if(_self.manifest.length === _self.totalLoaded) {
			addTitleView();
		}
	}
	
	function addTitleView(){
		_self.startBtn.x = 240 -32;
		_self.startBtn.y = 160;
		_self.startBtn.name = "startBtn";
				
		_self.titleView.addChild(_self.titleBg, _self.startBtn);
		_self.stage.addChild(_self.bg, _self.titleView);
		
		_self.startBtn.onPress = tweenTitleView;
	}
	
	function tweenTitleView(){
		Tween.get(_self.titleView).to({y: -320}, 300).call(addGameView);
	}
	
	function addGameView(){
		_self.stage.removeChild(_self.titleView);
		_self.titleView = null;
		
		_self.player.x = 2;
		_self.player.y = 320 - 40;
		_self.cpu.x = 960 - 18
		_self.cpu.y = 320 - 40;
		
		_self.ball.x = 240 - 12;
		_self.ball.y = 160 -15;
		
		_self.playerScore = new Text("0", "bold 20px Impact", "#FFF");
		_self.playerScore.x = 211;
		_self.playerScore.y = 20;
		_self.cpuScore = new Text("0", "bold 20px Impact", "#FFF");
		_self.cpuScore.x = 640;
		_self.cpuScore.y = 20;
		
		_self.stage.addChild(_self.playerScore, _self.cpuScore, _self.player, _self.cpu, _self.ball);
		_self.stage.update();
		
		_self.bg.onPress = startGame;		
	}
	
	function startGame() {
		_self.bg.onPress = null;
		_self.stage.onMouseMove = movePaddle;
		
		Ticker.addListener(_self.ticker, false);
		_self.ticker.tick = update;
	}
	
	function movePaddle(evt){
		_self.player.y = evt.stageY;
	}
	
	
	function reset() {		
		_self.ball.y = 160 -15;
		_self.playerScore.y = 20;
		_self.cpuScore.y = 20;
		_self.ySpeed = 5;
		
		if(_self.cpuWonLastPoint){			
			_self.xSpeed = -5;	
			_self.ball.x = 720 + 12;
		} else {
			_self.xSpeed = 5;	
			_self.ball.x = 240 - 12;
		}
		_self.rallyLength = 0;
		
		_self.stage.onMouseMove = null;
		Ticker.removeListener(_self.ticker);
		_self.bg.onPress = startGame;		
	}
	
	function alert(evt) {
		Ticker.removeListener(_self.ticker);
		_self.stage.onMouseMove = null;
		_self.bg.onPress = null;
		
		if(evt === "win") {
			_self.win.x = 0;
			_self.win.y = -640;
			
			_self.stage.addChild(_self.win);
			Tween.get(_self.win).to({y:0}, 300);
			_self.win.onPress = restartGame;				
		} else {			
			_self.lose.x = 0;
			_self.lose.y = -640;
			
			_self.stage.addChild(_self.lose);
			Tween.get(_self.lose).to({y:0}, 300);
			
			_self.lose.onPress = restartGame;	
		}
	}
	
	function restartGame () {
		_self.titleView = new Container();
		_self.stage.removeChild(_self.win);
		_self.stage.removeChild(_self.lose);
		_self.ySpeed = 5;
		_self.xSpeed = 5;
		addTitleView();
	}
	
	function update() {
		_self.ball.x = _self.ball.x + _self.xSpeed;
		_self.ball.y = _self.ball.y +_self.ySpeed;
		
		_self.speedAdjustment = _self.rallyLength || Math.ceil(_self.rallyLength / 5);
		
		// cpu movement
		if((_self.cpu.y+40) < (_self.ball.y - 14)) {
			_self.cpu.y = _self.cpu.y + _self.cpuSpeed;
		} else if ((_self.cpu.y+40) > (_self.ball.y + 14)) {
			_self.cpu.y = _self.cpu.y - _self.cpuSpeed;
		}
				
		// wall collision
		if((_self.ball.y) < 0) { 
			_self.ySpeed = - _self.ySpeed;
			// play sound
			//SoundJS.play('wall');
		}
		
		if((_self.ball.y + 24) > 640) { 
			_self.ySpeed = -_self.ySpeed;
			// play sound
			//SoundJS.play('wall');
		}
		
		if((_self.ball.x )< 0) {
			_self.xSpeed = -_self.xSpeed;
			_self.cpuScore.text = parseInt(_self.cpuScore.text+1);			
			_self.cpuWonLastPoint = true;
			reset();
			//SoundJS.play('enemyScore');
		}
		
		if ((_self.ball.x + (30)) > 960){
			_self.xSpeed = -_self.xSpeed;
			_self.playerScore.text = parseInt(_self.playerScore.text + 1);			
			_self.cpuWonLastPoint = false;
			reset();
			//SoundJS.play('playerScore');
		}
		
		// cpu collision
		if (_self.xSpeed > 0) {
			if((_self.ball.x + 18 > _self.cpu.x || (_self.ball.x + 18 + _self.xSpeed) > _self.cpu.x) && _self.ball.y + 12 >= _self.cpu.y && _self.ball.y + 12 < _self.cpu.y + 80){
				_self.ySpeed = calculateYSpeed(_self.ball.y, _self.cpu.y, _self.speedAdjustment);
				_self.xSpeed = calculateXSpeed(_self.xSpeed, _self.speedAdjustment, _self.ySpeed);
				_self.rallyLength++;
				// SoundJS.play('hit');
			}
		}
		
		// player collision
		if (_self.xSpeed < 0){
			if((_self.ball.x <= _self.player.x + 16 || (_self.ball.x + _self.xSpeed) <= _self.player.x + 16) && _self.ball.y + 12 >= _self.player.y && _self.ball.y + 12 < _self.player.y + 80){			
				_self.ySpeed = calculateYSpeed(_self.ball.y, _self.player.y, _self.speedAdjustment);
				_self.xSpeed = calculateXSpeed(_self.xSpeed, _self.speedAdjustment, _self.ySpeed);
				_self.rallyLength++;
				// SoundJS.play('hit');
			}
		}
		
		// stop paddle from going out of canvas
		if(_self.player.y >= 559){
			_self.player.y = 559;
		}
		
		// check for win
		if(_self.playerScore.text === 10) {
			alert("win");
		}
		if(_self.cpuScore.text === 10) {
			alert("lose");
		}
	}
	
	function calculateYSpeed(ball, player, speedAdjustment){		
		var impact = ball - player;
		var zone = Math.ceil(impact / 8);
		var ret;
		
		if (zone < 5) {
			ret = (zone *-1) - speedAdjustment;
		} else {
			ret = (zone - 4) + speedAdjustment;			
		}
		return ret;
	}
	
	function calculateXSpeed(currentSpeed, speedAdjustment, directionAdjustment) {
		var speed = 10 - Math.abs(directionAdjustment);
		
		if (currentSpeed > 0){
			return (speed *= -1) - speedAdjustment; 
		}		
		return speed + speedAdjustment;				
	}
	
})(Tween, Ticker);


function Paddle (posX, posY, width, height) {
	this.x = posX;
	this.y = posY;
	this.width = width;
	this.height = height;		
}

Paddle.prototype.checkColision = function (ball) {
	var self = this;
	if (self.x > ball.x + ball.width &&
		self.x + self.width < ball.x &&
		
		) {
		
	}		
};

function Ball(posX, posY, radius) {
	this.x = posX;
	this.y = posY;
	this.radus = radius;
	this.speed = 0;	
}
