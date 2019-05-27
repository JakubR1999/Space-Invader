var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');

var SPACE = 32;
var LEFT = 37;
var RIGHT = 39;

function game(){
	this.size = {
		gameWidth: 750,
		gameHeight: 750
	};

	this.lives = 3;
	this.score = 0;
	this.level = 1;
	
}

function start(){
	ctx.clearRect( 0, 0, gameWidth, gameHeight);
	ctx.font = "50px Arial";
	ctx.fillStyle = '#ffffff';
	ctx.textBaseline = "center";
	ctx.textAlign = "center";
	ctx.fillText("Space Invaders", gameWidth / 2 , gameHeight / 2);
	ctx.font = "25px Arial";
	ctx.fillText("Press 'Space' to start the game.", gameWidth / 2 , gameHeight / 2 - 80);
	
};

start();

function draw() {
	ctx.beginPath();
	ctx.moveTo(25, 600);
	ctx.lineTo(25, 583);
	ctx.lineTo(30, 583);
	ctx.lineTo(30, 570);
	ctx.lineTo(35, 570);
	ctx.lineTo(35, 565);
	ctx.lineTo(50, 565);
	ctx.lineTo(50, 570);
	ctx.lineTo(55, 570);
	ctx.lineTo(55, 583);
	ctx.lineTo(60, 583);
	ctx.lineTo(60, 600);
	ctx.lineTo(52, 600);
	ctx.lineTo(52, 595);
	ctx.lineTo(33, 595);
	ctx.lineTo(33, 600);
	ctx.lineTo(25, 600);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}

document.addEventListener("keydown", keySpace);

function keySpace(e){
	if( e == SPACE ){
		ctx.clearRect( 0, 0, gameWidth, gameHeight);
	}
};
	
