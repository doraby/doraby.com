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

    for(let i = 0; i < 25; i++){
        let y = -100*i-random(10,50);
        let r = random(5,50);
        let x = random(0,width)+r;
        bubbles[i] = new Ball(x, y, r, 255);
    }
}


function draw() {
    background(187, 202, 253);

    for(let i = 0; i < bubbles.length; i++){
        let gravity = createVector(0,2);
        bubbles[i].applyForce(gravity);
        gravity.mult(bubbles[i].mass);

        if (mouseIsPressed){
            let wind = createVector(0.3,0);
            bubbles[i].applyForce(wind);
        }
        bubbles[i].bounced();
        bubbles[i].show();
        bubbles[i].checkEdges();
    }
}