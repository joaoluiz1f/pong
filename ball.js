function Ball(){
  do{
    this.acc = p5.Vector.random2D();
    this.acc.setMag(random(4,6));
  }while(abs(this.acc.x)<3 || abs(this.acc.y)<3);

  this.pos = createVector(width/2, height/2);
  this.r = 10;
  this.maxSpd = createVector(20, 15);
  this.colision = false;
  this.colidedObj;

  this.show = function(){
    noStroke(); //No edge
    fill(255);  //Fill white
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2); //Draw the circle
  }

  this.update = function(){
    this.pos.add(this.acc); //Move

    //Check if need to bounce (upper and lower borders)
    if(this.pos.y<this.r || this.pos.y>height-this.r){
      this.acc.y*=-1;
    }
  }

  this.res = function(){
    AIpaddle.pos = createVector(width-AIpaddle.w*2, height/2-AIpaddle.h/2);
    Ppaddle.pos = createVector(Ppaddle.w*2, height/2-Ppaddle.h/2);

    this.pos = createVector(width/2, height/2);

    go = false;

    do{
      this.acc = p5.Vector.random2D();
      this.acc.setMag(random(4,6));
    }while(abs(this.acc.x)<3 || abs(this.acc.y)<3);
  }

  this.edges = function(){
    var colided = false;
    var obj;
    var d1, d2;
    //var min = 999;
    for(var sum = 0; sum<AIpaddle.h; sum++){
      d1 = dist(this.pos.x, this.pos.y, AIpaddle.pos.x, AIpaddle.pos.y+sum);
      d2 = dist(this.pos.x, this.pos.y, Ppaddle.pos.x+Ppaddle.w, Ppaddle.pos.y+sum);

      //if(d2<min){min = d2;};

      if(d1<=this.r){
        colided = true;
        obj = AIpaddle;
        break;
      }

      if(d2<=this.r){
        colided = true;
        obj = Ppaddle;
        break;
      }
    }

    //console.log(min);

    if(colided && !this.colision){
      this.colision = true;
      this.colidedObj = obj;
      // console.log("COLIDED!");
      this.acc.add(createVector(0.5, obj.acc.y*0.25));
      this.acc.x*=-1;
      this.acc.x = constrain(this.acc.x, -this.maxSpd.x, this.maxSpd.x);
      this.acc.y = constrain(this.acc.y, -this.maxSpd.y, this.maxSpd.y);
    }else if(this.colision){
        d = dist(this.pos.x, this.pos.y, this.colidedObj.pos.x, this.colidedObj.pos.y);
        if(d>100){this.colision = false;}
    }
  }

  this.limits = function(){
    if(this.pos.x<-this.r){
      AIScore++;
      this.res();
    }else if(this.pos.x>width+this.r){
      playerScore++;
      this.res();
    }
  }
}
