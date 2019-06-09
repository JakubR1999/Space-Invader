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
	this.type;
	this.image = new Image();
	this.image.src;
	this.x;
	this.y;
	this.wid;
	this.hei;
	this.vx;
	this.vy;
	this.lives;
	this.score = 0;
	this.level = 1;
	this.draw = function(){
		this.x += this.vx;
		this.y += this.vy;
		if( this.type == "image")
		{
			ctx.drawImage(this.image, this.x, this.y, this.wid, this.hei);
		}
		else
		{
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.wid, this.hei);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
			ctx.stroke();
		}
	};
};

var Game = new game;
var width = Game.size.gameWidth;
var height = Game.size.gameHeight;

var player = new game;
player.x = 40;
player.y = 710;
player.wid = 40;
player.hei = 40;
player.vx = 0;
player.vy = 0;
player.score = 0;
player.lives = 3;
player.type = "image";
player.image.src = "player.jpeg";

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
for( var i = 0; i < 5; i++)
{
	alienA[i] = new Array(5) 
	for( var j = 0; j < 6; j++)
	{
		var z;
		alienA[i][j] = new game;
		alienA[i][j].x = 50 + 50 * j;
		alienA[i][j].y = 150 + 50 * i;
		alienA[i][j].wid = 30;
		alienA[i][j].hei = 30;
		alienA[i][j].vy = 0;
		alienA[i][j].vx = 0;
		if( i == 3 )
		{
			z = "alienC.jpg";
		}
		if( i == 1 )
		{
			z = "alienA.jpg";
		}
		if( i == 0 )
		{
			z = "alienB.gif";
		}
		alienA[i][j].image.src = z;
		alienA[i][j].type = "image";
	}
}

var bulletA = new game;
bulletA.x = 0;
bulletA.y = 0;
bulletA.wid = 5;
bulletA.hei = 15;
bulletA.vx = 0;
bulletA.vy = 5;
bulletA.color = "grey";

function alienShooting()
{
	bulletA.x = alienA[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 6)].x + alienA[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 6)].wid / 2 - 2;
	bulletA.y = alienA[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 6)].y + alienA[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 6)].hei - 3;
	bulletA.draw();
};
setInterval(alienShooting(), 1000);


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

function score(){
	ctx.font = "40px Arial";
	ctx.fillStyle = 'white';
	ctx.textBaseline = "top";
	ctx.textAlign = "center";
	ctx.fillText("Score: " + player.score, 200 , 50);
};

function lives(){
	ctx.font = "40px Arial";
	ctx.fillStyle = 'white';
	ctx.textBaseline = "top";
	ctx.textAlign = "center";
	ctx.fillText("Lives: " + player.lives, 650, 50);
};
	
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
	if( kod == LEFT && player.x >= 0 )
	{
		player.vx = -5;
	}
	if( kod == RIGHT && player.x <= 710 )
	{
		player.vx = 5;
	}
};

document.addEventListener("keydown", bulletMove);

function bulletMove(e){
	var kod = e.keyCode;
	if( kod == LSHIFT)
	{
		if( bulletP.y == 0 )
		{ 
			bulletP.x = player.x + player.wid / 2;
			bulletP.y = player.y;
			bulletP.draw();
		}
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
			bulletP.y = 0;
			player.score += 50;
		}
	}
};

function print(){
	player.draw();
	bulletP.draw();
	blocks[0].draw();
	blocks[1].draw();
	blocks[2].draw();
	
	for( var i = 0; i < 5; i++)
	{
		for( var j = 0; j < 6; j++)
		alienA[i][j].draw();
	}
	
	for( var i = 0; i < 5; i++)
	{
		for( var j = 0; j < 6; j++)
		{
			if( alienA[i][j].x == 400 + j * 50)
			{
				alienA[i][j].vx = -2;
				alienA[i][j].y += 5;
			}
		}
	}
	
	for( var i = 0; i < 5; i++)
	{
		for( var j = 0; j < 6; j++)
		{
			if( alienA[i][j].x == 50 + 50 * j)
			{
				alienA[i][j].vx = 2;
				alienA[i][j].y += 5;
			}
		}
	}

	
	for( var i = 0; i < 5; i++)
	{
		for( var j = 0; j < 6; j++)
		{
			collision(alienA[i][j]);
		}
	}
	
	for( var i = 0; i < 4; i++);
	{
		for( var j = 0; j < 5; j++)
		{
			if ( alienA[i][j].x == player.x && alienA[i][j].y == player.y )
			{
				player.lives--;
			}
		}
	}
	
	lives();
	
	score();
	
	if( bulletP.y < 0 )
	{
		bulletP.y = 0;
	}
	
	if( player.x <= 0 )
	{
		player.vx = 0;
	}
	
	if( player.x >= 710 )
	{
		player.vx = 0;
	}
	
};

function callback()
{
	window.requestAnimationFrame(callback);
	ctx.clearRect(0, 0, width, height);
	print();
};
