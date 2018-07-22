var csv = document.getElementById("canvas");
var ctx = csv.getContext("2d");


// images

var car = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

car.src = "images/car.png";
bg.src = "images/bg";
fg.src = "images/fg";
pipeUp.src = "images/pipeNorth";
pipeDown.src = "images/pipeSouth";

var gap = 120;
var constant = pipeUp.height+gap;

var carX = 10;
var carY = 150;

var score = 0;

var gravity = 1.25 ;

// audio

var fly = new Audio();
var scor = new Audio();

fly.src = "flappyBird/sounds/fly.mp3"
scor.src = "flappyBird/sounds/score.mp3"
// action

document.addEventListener("keydown",moveUp);

function moveUp(){
	carY -= 28;
	fly.play();
}

// pipe coordinate

var pipe = [];

pipe[0] = {
	x : csv.width,
	y : 0
}

// draw

function draw(){

	ctx.drawImage(bg,0,0);

	for(var i = 0; i < pipe.length ; i++){
		ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y)
		ctx.drawImage(pipeDown,pipe[i].x,pipe[i].y+constant)

		pipe[i].x--;

		if(pipe[i].x == 125){
			pipe.push({
				x : csv.width,
				y : Math.floor(Math.random()*pipeUp.height)-
				pipeUp.height
			});
		}

		// collision
		if(carX + car.width >= pipe[i].x && 
			carX <= pipe[i].x + pipeUp.width && 
			(carY <= pipe[i].y + pipeUp.height || 
			carY+car.height >= pipe[i].y+constant) || carY + car.height >= csv.height - fg.height){
			location.reload();
		}

		if(pipe[i].x == 5){
			score++;
			scor.play();
		}

	}

	//ctx.drawImage(fg,0,csv.height - fg.height);

	ctx.drawImage(car,carX,carY);

	carY += gravity ;

	ctx.fillStyle = "#777";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : "+score,10,csv.height-20);

	requestAnimationFrame(draw);
}

draw();