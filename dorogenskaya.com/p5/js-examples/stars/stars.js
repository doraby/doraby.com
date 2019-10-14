let bubbles = [];
var canvas;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(30);

    for(let i = 0; i < 50; i++){
        let x = random(width);
        let y = random(height);
        let r = random(4,10);
        let distance = random(25, 100);
        bubbles[i] = new Star(x, y, r, distance, 255);
    }
}

function mousePressed() {
    for(let i = 0; i < bubbles.length; i++){
        bubbles[i].clicked(mouseX, mouseY);
    }
}

function draw() {
    background(187, 202, 253);

    for(let i = 0; i < bubbles.length; i++){
        bubbles[i].hovered(mouseX, mouseY);
        bubbles[i].show(mouseX, mouseY);
        bubbles[i].flicker();
        bubbles[i].parallax(mouseX, mouseY);
    }
}