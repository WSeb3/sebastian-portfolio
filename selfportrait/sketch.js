function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES)
}

function draw() {
  background(250);
  
  //back hair
  fill(0)
  rect(223,290,150,200)
  ellipse(310,220,270,230)
  ellipse(230,300,200,270)
  ellipse(370,300,190,250)
  ellipse(340,350,190,250)
    
  //neck
  fill(255, 230, 200)
  rect(235,400,130,140)
  
  // HEAD
  fill(255, 230, 200);
  ellipse(300, 300, 260, 320);
  
  //front hair
  fill(0)
  ellipse(370,170,110,70)
  rect(226,130,120,40)
  
  //eye
  fill(250)
  strokeWeight(1)
  ellipse(240,270,40,40);
  ellipse(360,270,40,40)
  fill(110, 79, 50)
  ellipse(240,270,12,12)
  ellipse(360,270,12,12)
  fill(0)
  rect(210,210,60,10)
  rect(330,210,60,10)
  fill(0,0)
  strokeWeight(4)
  arc(240, 263, 50, 30, 180, 0)
  arc(360, 263, 50, 30, 180, 0)
  
  //glasses
  fill(200,40)
  //stroke(220)
  strokeWeight(3)
  rect(190,247,100,60)
  rect(310,247,100,60)
  fill(0)
  rect(290,260,20,10)
  rect(177,247,10,15)
  rect(413,247,10,15)
  
  //nose
  fill(255, 230, 200)
  arc(300, 340, 30, 30, 0, 180)
  
  //mouth
  fill(255)
  strokeWeight(3)
  rect(260,380,80,30)
  line(260,395,340,395)
  line(280,380,280,410)
  line(320,380,320,410)
  line(300,380,300,410)
  
  //body
  fill(25, 25, 112)
  ellipse(300,650,500,300)
  
  }