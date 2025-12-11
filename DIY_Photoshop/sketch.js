var img;
var initials ='sc';
var choice = '1';
var screenbg = 250;
var lastscreenshot=61;

function preload() {
  img = loadImage('https://dma-git.github.io/images/74.png');
  img2 = loadImage('https://thumbs.dreamstime.com/b/bit-pixel-art-green-leaf-png-background-monstera-which-commonly-used-as-room-decoration-213823536.jpg')
}

function setup() {
createCanvas(600, 400); 
background(screenbg);

}

function draw() {
  if (keyIsPressed) {
    choice = key;
    clear_print();
  }
  if (mouseIsPressed){
    newkeyChoice(choice);
  }
}

function newkeyChoice(toolChoice) { 

 if (toolChoice == '1' ) {
    stroke(01);
    strokeWeight(1);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
  } else if (toolChoice == '2') { 
    stroke(20);
    strokeWeight(5);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
  } else if (toolChoice == '3') {
    stroke(300, 100, 0, 80);
    strokeWeight(2);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
  } else if (toolChoice == '4') {
    stroke(0, 0, 255);
    strokeWeight(2);
    line(mouseX, mouseY, pmouseX, pmouseY);

      } else if (toolChoice == '5') {
    stroke(196, 30, 586);
    strokeWeight(5);
    line(mouseX, mouseY, pmouseX, pmouseY); 
        
 
  } else if (key == '6') {
    fill(100, 2050, 100);
    noStroke();
    beginShape();
    vertex(mouseX, mouseY);
    bezierVertex(mouseX + 30, mouseY - 50, mouseX + 0, mouseY + 30, mouseX + 25, mouseY + 0, mouseX - 20, mouseY + 25, mouseX + 0);
    bezierVertex(mouseX + 0, mouseY - 30, mouseX + 0, mouseY + 10, mouseX - 25, mouseY + 0, mouseX - 20, mouseY - 30, mouseX + 0);
    endShape(CLOSE);
    
  } else if (toolChoice == '7') {
    fill(100, 2050, 100);
    stroke(0);
    strokeWeight(1);
    quad(mouseX, mouseY, mouseX - 90, mouseY + 27, mouseX + 20, mouseY + 57, mouseX + 80, mouseY + 45);
    
  } else if (toolChoice == '8') {
    fill(300, 100, 07, 80);
    stroke(0);
    strokeWeight(1);
    triangle(mouseX, mouseY, mouseX + 50, mouseY - 60, mouseX - 70, mouseY - 50);
    
  } else if (toolChoice == '9') {
    fill(253, 218, 13, 80);
    stroke(0);
    strokeWeight(1);
    rect(mouseX, mouseY, 40, 40);
    
  } else if (toolChoice == '0') {
    stroke(0, 0);
    strokeWeight(0);
    fill(random(255), random(255), random(255), random(255));
    rect(mouseX, mouseY, 200, 150);
    
  } else if (toolChoice == 'g' || toolChoice == 'G') {
    image(img, mouseX, mouseY, 50, 50);
    
  }
  
 }
 
function testbox(r, g, b) {
  x = mouseX;
  y = mouseY;
  fill(r, g, b);
  rect(x-50, y-50, 100, 100);

}

function clear_print() {
  if (key == 'x' || key == 'X') {
    background(screenbg);
  } else if (key == 'p' || key == 'P') {
     saveme();
  }
}

function saveme(){
  filename=initials+day() + hour() + minute() +second();
  if (second()!=lastscreenshot) {
    saveCanvas(filename, 'jpg');
    key="";
  }
  lastscreenshot=second();
  
}
