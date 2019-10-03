let bubbles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    background(255, 255, 50);

    for(let i = 0; i < 3; i++){
        let x = 10 + 100 * i;
        let y = 40 + 100 * i*i;
        noFill();
        bubbles[i] = new Ball(x, y, 20, 255);
        print(bubbles[i]);
    }
}

function draw() {
    // background(255, 255, 50);

    for(let i = 0; i < bubbles.length; i++){
        bubbles[i].move();
        bubbles[i].show();
    }
}
