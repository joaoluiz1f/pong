//This variable controlls whether or not 
var go = false;
var playerScore = 0;
var AIScore = 0;

var Ppaddle;
var AIpaddle;
var ball;

var dots = [];
var dSize = 10;

function settings(){
	let aspect = 5/8;
	let maxS = min(window.innerWidth, window.innerHeight);

	createCanvas(maxS, maxS*aspect);
}

function setup(){
	settings();

	 for(var y = dSize/2; y<height; y+=dSize*2){
		 dots.push(createVector(width/2-dSize/2, y));
	 }

	 Ppaddle = new Player();
	 AIpaddle = new AI();
	 ball = new Ball();
}

function draw(){
	background(0);

	if(mouseX > 0 && mouseX < width &&
		 mouseY > 0 && mouseY < height){
			Ppaddle.move(movedY*0.05);
	}

	if(go){
		AIpaddle.update();
		Ppaddle.update();
		ball.update();
		ball.edges();
		ball.limits();
	}

	AIpaddle.show();
	Ppaddle.show();
	ball.show();

	for(var i = 0; i<dots.length; i++){
		var x = dots[i].x;
		var y = dots[i].y;
		noStroke();
		fill(255);
		rect(x, y, dSize, dSize);
	}
	drawScores(50);
}

function mousePressed(){
	go=true;
}

function keyPressed(){
	if(key == 'W' || keyCode == UP_ARROW){
		Ppaddle.up();
		go = true;
	}else if(key == 'S' || keyCode == DOWN_ARROW){
		Ppaddle.down();
		go = true;
	}else if(keyCode == ESCAPE){go = !go;}
}

function keyReleased(){
	if(key == 'W' || key == 'S' || keyCode == UP_ARROW || keyCode == DOWN_ARROW){Ppaddle.stp();}
}

function drawScores(txtSize){
	noStroke();
	fill(255);
	textAlign(CENTER);
	textSize(txtSize);
	text((playerScore), width/2-txtSize, txtSize);
	text((AIScore), width/2+txtSize, txtSize);
}
