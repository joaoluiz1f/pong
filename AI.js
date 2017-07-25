function AI(){
  this.w = Ppaddle.w;
  this.h = Ppaddle.h;
  this.pos = createVector(width-this.w*2, height/2-this.h/2);
  this.acc = createVector(0,0);
  this.spd = 5;

  this.show = function(){
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  this.update = function(){
    var d1 = dist(ball.pos.x, ball.pos.y, this.pos.x, this.pos.y);
    var d2 = dist(ball.pos.x, ball.pos.y, this.pos.x, this.pos.y+this.h);
    var d = (d1+d2)/2;

    this.pos.add(this.acc);
    this.pos.y = constrain(this.pos.y, 0, height-this.h);

    if(d<450){
      if(ball.pos.y<this.pos.y+this.h/2){
        this.acc.y-=this.spd;
      }else{
        this.acc.y+=this.spd;
      }

      this.acc.y = constrain(this.acc.y, -10, 10);
      //console.log(this.acc.y);
    }else{
        this.acc.y+=random(-this.spd*0.9, this.spd);
    }
  }
}
