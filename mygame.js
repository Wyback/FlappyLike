var csv = document.getElementById("canvas");
var ctx = csv.getContext("2d");


// images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "flappyBird/images/bird.png";
bg.src = "flappyBird/images/bg.png";
fg.src = "flappyBird/images/fg.png";
pipeUp.src = "flappyBird/images/pipeNorth.png";
pipeDown.src = "flappyBird/images/pipeSouth.png";

var gap = 120;
var constant = pipeUp.height+gap;

var birdX = 10;
var birdY = 150;

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
	birdY -= 28;
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
		if(birdX + bird.width >= pipe[i].x && 
			birdX <= pipe[i].x + pipeUp.width && 
			(birdY <= pipe[i].y + pipeUp.height || 
			birdY+bird.height >= pipe[i].y+constant) || birdY + bird.height >= csv.height - fg.height){
			location.reload();
		}

		if(pipe[i].x == 5){
			score++;
			scor.play();
		}

	}

	ctx.drawImage(fg,0,csv.height - fg.height);

	ctx.drawImage(bird,birdX,birdY);

	birdY += gravity ;

	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : "+score,10,csv.height-20);

	requestAnimationFrame(draw);
}

draw();