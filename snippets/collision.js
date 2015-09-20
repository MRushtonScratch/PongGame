https://github.com/MikeBeasterfeld/easeljs/blob/master/keypad.html

function main (){
	
	var KEYCODE_UP = 38;	
	var KEYCODE_DOWN = 40;
	var KEYCODE_LEFT = 37;
	var KEYCODE_RIGHT = 39;
	
	var upHeld = false;
	var downHeld = false;
	var leftHeld = false;
	var rightHeld = false;
	
	var canvas = document.getElementById("board");
	var stage = new createjs.Stage(canvas);
	var circle = new createjs.Shape();
	
	circle.graphics.beginFill("green").drawCircle(120, 120, 10);
	circle.x = circle.y = 50;
	
	var paddle = new createjs.Shape();
	paddle.graphics.beginFill("blue").drawRect(0, 0, 20, 80);
	paddle.x = 2;
	paddle.y = 150;
	
	stage.addChild(paddle);
	stage.addChild(circle);
	stage.update();
	
		
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	
	createjs.Ticker.addEventListener("tick", tick);
	
	
	function tick(event) {
		
		if (leftHeld){
			circle.x = circle.x -= 1;
		}
		
		if (rightHeld){
			circle.x = circle.x += 1;
		}
		
		if (upHeld){
			circle.y = circle.y -= 1;
		}
		
		if (downHeld){
			circle.y = circle.y += 1;
		}
		
	}
	
	function handleKeyDown (evt) {
		//cross browser issues exist
		if (!evt) {
			var evt = window.event;
		}		
		switch (evt.keyCode) {
			case KEYCODE_LEFT:
				leftHeld = true;
				return false;
			case KEYCODE_UP:
				upHeld = true;
				return false;
			case KEYCODE_RIGHT:			
				rightHeld = true;
				return false;
			case KEYCODE_DOWN:				
				downHeld = true;
				return false;
		}
	}
	
	function handleKeyUp(evt) {
		//cross browser issues exist
		if (!evt) {
			var evt = window.event;
		}
		switch (evt.keyCode) {
			case KEYCODE_LEFT:
				leftHeld = false;
				break;
			case KEYCODE_UP:
				upHeld = false;
				break;
			case KEYCODE_RIGHT:
				rightHeld = false;
				break;
			case KEYCODE_DOWN:				
				downHeld = false;
				break;
		}
	}
}