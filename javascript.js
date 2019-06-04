var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');

var SPACE = 32;
var LEFT = 37;
var RIGHT = 39;
var LSHIFT = 16;

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
	this.vy;
	this.lives = 3;
	this.score = 0;
	this.level = 1;
	this.draw = function(){
		this.x += this.vx;
		this.y += this.vy;
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
player.vy = 0;
player.color = "green";

var bulletP = new game;
bulletP.x = 0;
bulletP.y = 0;
bulletP.wid = 5;
bulletP.hei = 15;
bulletP.vy = -5;
bulletP.vx = 0;
bulletP.color = "grey";

var blocks = new Array;
for( var i=0; i < 3; i++)
{
	blocks[i] = new game;
	blocks[i].x = 100 + 250 * i;
	blocks[i].y = 600;
	blocks[i].wid = 50;
	blocks[i].hei = 50;
	blocks[i].vy = 0;
	blocks[i].vx = 0;
	blocks[i].color = "brown";
}

var alienA = new Array;
for( var i = 0; i < 6; i++)
{
	for( var j = 0; j < 5; j++)
	{
	alienA[i] = new game;
	alienA[i].x = 100 + 50 * i;
	alienA[i].y = 150;
	alienA[i].wid = 30;
	alienA[i].hei = 30;
	alienA[i].vy = 0;
	alienA[i].vx = 0;
	alienA[i].color = "orange";
	}
}
	
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
		player.vx = -5;
	}
	if( kod == RIGHT && player.x <= 740){
		player.vx = 5;
	}
};

document.addEventListener("keydown", bulletMove);

function bulletMove(e){
	var kod = e.keyCode;
	if( kod == LSHIFT){
		bulletP.x = player.x + 8;
		bulletP.y = player.y;
		bulletP.draw();
	}
};

document.addEventListener("keyup", keyUp);

function keyUp(){
	player.vx = 0;
};

function print(){
	player.draw();
	bulletP.draw();
	blocks[0].draw();
	blocks[1].draw();
	blocks[2].draw();
	for( var i = 0; i < 6; i++)
	{
		alienA[i].draw();
	}
	if( alienA[5].x == 600) {
		for( var i = 0; i < 6; i++)
		{
			alienA[i].vx = -2;
			alienA[i].y += 5;
		}
	}
	if( alienA[0].x == 100) {
		for( var i = 0; i < 6; i++)
		{
			alienA[i].vx = 2;
			alienA[i].y += 5;
		}
	}
};

function callback()
{
	window.requestAnimationFrame(callback);
	ctx.clearRect(0, 0, width, height);
	print();
};
