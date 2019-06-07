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
	this.lifes;
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
player.lifes = 3;
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

var alienA = new Array(6);
for( var i = 0; i < 6; i++)
{
	alienA[i] = new Array(5) 
	for( var j = 0; j < 5; j++)
	{
	alienA[i][j] = new game;
	alienA[i][j].x = 50 + 50 * i;
	alienA[i][j].y = 150 + 50 * j;
	alienA[i][j].wid = 30;
	alienA[i][j].hei = 30;
	alienA[i][j].vy = 0;
	alienA[i][j].vx = 0;
	alienA[i][j].color = "orange";
	
	
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

function collision(otherobj) {
	if( bulletP.x + bulletP.wid > otherobj.x && bulletP.x + bulletP.wid < otherobj.x + otherobj.wid)
	{
		if( bulletP.y + bulletP.hei > otherobj.y && bulletP.y + bulletP.hei < otherobj.y + otherobj.hei)
		{
			otherobj.x = 0;
			otherobj.y = 0;
			otherobj.wid = 0;
			otherobj.hei = 0;
			otherobj.vy = 0;
			otherobj.vx = 0;
		}
	}
};

function print(){
	player.draw();
	bulletP.draw();
	blocks[0].draw();
	blocks[1].draw();
	blocks[2].draw();
	
	for( var i = 0; i < 6; i++)
	{
		for( var j = 0; j < 5; j++)
		alienA[i][j].draw();
	}
	
	for( var i = 0; i < 6; i++)
	{
		for( var j = 0; j < 5; j++)
		{
			if( alienA[i][j].x == 400 + i * 50)
			{
				alienA[i][j].vx = -2;
				alienA[i][j].y += 5;
			}
		}
	}
	
	for( var i = 0; i < 6; i++)
	{
		for( var j = 0; j < 5; j++)
		{
			if( alienA[i][j].x == 50 + 50 * i)
			{
				alienA[i][j].vx = 2;
				alienA[i][j].y += 5;
			}
		}
	}

	
	for( var i = 0; i < 6; i++)
	{
		for( var j = 0; j < 5; j++)
		{
			collision(alienA[i][j]);
		}
	}
	
	for( var i = 0; i < 5; i++);
	{
		for( var j = 0; j < 4; j++)
		{
			if ( alienA[i][j].x == player.x && alienA[i][j].y == player.y )
			{
				player.lifes--;
			}
		}
	}
};

function callback()
{
	window.requestAnimationFrame(callback);
	ctx.clearRect(0, 0, width, height);
	print();
};
