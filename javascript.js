var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');

function blok() {
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
blok();
const image = new Image(900, 520);
image.src = 'alien_1.jpg';
ctx.drawImage( image, 0, 0);
	