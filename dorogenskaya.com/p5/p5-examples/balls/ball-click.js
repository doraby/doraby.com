let bubbles = [];
let lines = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    for(let i = 0; i < 50; i++){
        let x = random(width);
        let y = random(height);
        let r = random(2,10)
        noFill();
        bubbles[i] = new Ball(x, y, r, 255);

    }
}

function parallax() {
    front = map(mouseX, 0, width, width / 2 - 333, width / 2 + 333);
    back = map(mouseX, 0, width, width / 2 - 133, width / 2 + 133);
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
        bubbles[i].show();
        bubbles[i].flicker();
    }
}