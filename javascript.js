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
	this.x;
	this.y;
	this.wid;
	this.hei;
	this.vx;
	this.lives = 3;
	this.score = 0;
	this.level = 1;
	this.draw = function(){
		this.x += this.vx;
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.wid, this.hei);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	};
};

var Game = new game;
var width = Game.size.gameWidth;
var height = Game.size.gameHeight;

var player = new game;
player.x = 20;
player.y = 730;
player.wid = 20;
player.hei = 20;
player.vx = 0;
player.color = "green";

function start(){
	ctx.clearRect( 0, 0, width, height);
	ctx.font = "50px Arial";
	ctx.fillStyle = 'white';
	ctx.textBaseline = "center";
	ctx.textAlign = "center";
	ctx.fillText("Space Invaders", width / 2 , height / 2);
	ctx.font = "25px Arial";
	ctx.fillText("Press 'Space' to start the game.", width / 2 , height / 2 - 80);
};

start();

document.addEventListener("keydown", keySpace);

function keySpace(e){
	var kod = e.keyCode;
	if( kod == SPACE ){
		ctx.clearRect( 0, 0, width, height);
		window.requestAnimationFrame(callback);
	}
};

document.addEventListener("keydown", move);

function move(e){
	var kod = e.keyCode;
	if( kod == LEFT && player.x >= 10){
		player.vx = -10;
	}
	if( kod == RIGHT && player.x <= 740){
		player.vx = 10;
	}
};

document.addEventListener("keyup", keyUp);

function keyUp(){
	player.vx = 0;
};

function block() {
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
	ctx.fillStyle = "brown";
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
};

function print(){
	player.draw();
	block();
};

function callback()
{
	window.requestAnimationFrame(callback);
	ctx.clearRect(0, 0, width, height);
	print();
};
