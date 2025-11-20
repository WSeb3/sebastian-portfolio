let objects = [];       
let explosions = [];    
let pops = [];          

let score = 0;
let totalObjects = 15;
let winScore = 100;
let lives = 5;

let gameWon = false;
let gameLost = false;

// Countdown timer (in seconds)
let timer = 90;
const MAX_TIME = 90;
const TIME_BONUS = 10;

let playAgainButton;
let resetButton;

// Screen shake variables
let shakeAmount = 0;
let shakeDuration = 0;

function setup() {
  createCanvas(600, 400);

  // Create PLAY AGAIN button
  playAgainButton = createButton("PLAY AGAIN");
  playAgainButton.position(width / 2 - 60, height / 2 + 80);
  playAgainButton.style("font-size", "18px");
  playAgainButton.style("padding", "10px 20px");
  playAgainButton.mousePressed(restartGame);
  playAgainButton.hide();

  // Create RESET button
  resetButton = createButton("RESET");
  resetButton.position(width / 2 - 35, height / 2 + 80);
  resetButton.style("font-size", "18px");
  resetButton.style("padding", "10px 20px");
  resetButton.mousePressed(restartGame);
  resetButton.hide();

  startGame();
}

function startGame() {
  objects = [];
  explosions = [];
  pops = [];
  score = 0;
  lives = 5;
  gameWon = false;
  gameLost = false;
  timer = MAX_TIME;
  shakeAmount = 0;
  shakeDuration = 0;

  for (let i = 0; i < totalObjects; i++) {
    objects.push(new GameObject());
  }

  playAgainButton.hide();
  resetButton.hide();
}

function draw() {
  background(30, 30, 50);

  if (!gameWon && !gameLost) {
    timer -= deltaTime / 1000; // countdown
    if (timer <= 0) {
      timer = 0;
      gameLost = true;
    }
  }

  push();
  if (shakeDuration > 0) {
    let shakeX = random(-shakeAmount, shakeAmount);
    let shakeY = random(-shakeAmount, shakeAmount);
    translate(shakeX, shakeY);
    shakeDuration--;
  }

  if (gameWon) {
    displayWinScreen();
    pop();
    return;
  }

  if (gameLost) {
    displayLoseScreen();
    pop();
    return;
  }

  fill(255);
  textSize(20);
  text("Score: " + score, 10, 25);
  text("Lives: " + lives, 10, 50);
  text("Time: " + Math.ceil(timer) + "s", 10, 75);

  for (let obj of objects) {
    obj.move();
    obj.show();
  }

  for (let i = explosions.length - 1; i >= 0; i--) {
    if (explosions[i].update()) explosions.splice(i, 1);
  }

  for (let i = pops.length - 1; i >= 0; i--) {
    if (pops[i].update()) pops.splice(i, 1);
  }

  pop();
}

function mousePressed() {
  if (gameWon || gameLost) return;

  for (let i = objects.length - 1; i >= 0; i--) {
    if (objects[i].isClicked(mouseX, mouseY)) {
      if (objects[i].isBomb) {
        explosions.push(new Explosion(objects[i].x, objects[i].y));
        lives--;
        score = max(0, score - 5);
        shakeAmount = 10;
        shakeDuration = 15;

        if (lives <= 0) {
          gameLost = true;
        }
      } else {
        pops.push(new PopEffect(objects[i].x, objects[i].y));

        if (objects[i].isBonus) {
          score += 2;
          timer += TIME_BONUS; // add extra time
          timer = min(timer, MAX_TIME); // cap at max time
        } else {
          score++;
        }

        if (score >= winScore) {
          gameWon = true;
        }
      }

      objects.splice(i, 1);
      objects.push(new GameObject());
    }
  }
}

function restartGame() {
  startGame();
}

function displayWinScreen() {
  fill(255);
  textSize(28);
  textAlign(CENTER, CENTER);

  let bombsHit = 5 - lives;
  let accuracy = bombsHit === 0 ? "100%" : `${100 - bombsHit * 10}%`;

  text(
    `YOU POPPED ${score} BUBBLES!\nYOU WIN! 🎉\nBombs clicked: ${bombsHit}\nAccuracy: ${accuracy}\nTime left: ${Math.ceil(timer)}s`,
    width / 2,
    height / 2 - 20
  );

  playAgainButton.show();
  resetButton.hide();
}

function displayLoseScreen() {
  fill(255, 70, 70);
  textSize(20);
  textAlign(CENTER, CENTER);

  let bombsHit = 5 - lives;
  let accuracy = bombsHit === 0 ? "100%" : `${max(0, 100 - bombsHit * 20)}%`; // slightly harsher penalty

  text(
    `YOU POPPED ${score} BUBBLES!\nYOU HIT TOO MANY BOMBS OR TIME RAN OUT 💥\nBombs clicked: ${bombsHit}\nAccuracy: ${accuracy}\nTime left: ${Math.ceil(timer)}s`,
    width / 2,
    height / 2 - 20
  );

  // Show PLAY AGAIN button and hide RESET button
  playAgainButton.show();
  resetButton.hide();
}


// ============================
// GameObject Class
// ============================
class GameObject {
  constructor() {
    this.reset();
  }

  move() {
    this.y -= this.speed;
    if (this.y < -this.r) this.reset();
  }

  show() {
    noStroke();
    if (this.isBomb) {
      fill(this.col);
      ellipse(this.x, this.y, this.r * 2);
      fill(0);
      ellipse(this.x, this.y, this.r * 1.2);
    } else {
      fill(this.col);
      if (this.isSparkle) this.sparkle();
      ellipse(this.x, this.y, this.r * 2);

      if (this.isBonus) {
        fill(255);
        textAlign(CENTER, CENTER);
        text("+10s", this.x, this.y);
      }
    }
  }

  sparkle() {
    push();
    noFill();
    stroke(255, 215, 0, 150);
    strokeWeight(2);
    let sparkleSize = this.r * random(1.2, 1.5);
    ellipse(this.x, this.y, sparkleSize);
    pop();
  }

  isClicked(px, py) {
    let radius = this.isSparkle || this.isBonus ? this.r * 1.5 : this.r;
    return dist(px, py, this.x, this.y) < radius;
  }

  reset() {
    this.r = random(20, 40);
    this.x = random(this.r, width - this.r);
    this.y = random(height + this.r, height + 200);
    this.speed = random(1, 3);

    // Assign type randomly
    this.isBomb = random(1) < 0.2; // 20% chance

    if (!this.isBomb) {
      let p = random(1);
      if (p < 0.05) { // 5% chance: both sparkle + bonus
        this.isSparkle = true;
        this.isBonus = true;
      } else if (p < 0.15) { // 10% sparkle-only
        this.isSparkle = true;
        this.isBonus = false;
      } else if (p < 0.25) { // 10% +10 timer-only
        this.isSparkle = false;
        this.isBonus = true;
      } else { // normal bubble
        this.isSparkle = false;
        this.isBonus = false;
      }
    } else {
      this.isSparkle = false;
      this.isBonus = false;
    }

    if (this.isBomb) {
      this.col = color(255, 50, 50);
    } else {
      this.col = color(random(100, 255), random(100, 255), random(100, 255), 180);
    }
  }
}

// ============================
// Explosion Class
// ============================
class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frames = 0;
    this.maxFrames = 12;
  }

  update() {
    this.frames++;
    let size = this.frames * 6;

    noStroke();
    fill(255, 150, 0, 200 - this.frames * 15);
    ellipse(this.x, this.y, size);

    fill(255, 50, 0, 200 - this.frames * 20);
    ellipse(this.x, this.y, size * 0.7);

    return this.frames > this.maxFrames;
  }
}

// ============================
// PopEffect Class
// ============================
class PopEffect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frames = 0;
    this.maxFrames = 10;
  }

  update() {
    this.frames++;
    let size = this.frames * 3;

    noFill();
    stroke(255, 255 - this.frames * 20);
    strokeWeight(2);
    ellipse(this.x, this.y, size);

    stroke(200, 255 - this.frames * 25);
    ellipse(this.x, this.y, size * 1.5);

    return this.frames > this.maxFrames;
  }
}
