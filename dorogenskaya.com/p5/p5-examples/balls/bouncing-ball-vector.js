let bubbles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    for(let i = 0; i>4; i++){
        bubbles[i] = new Ball(30*i, 40*i, 23*i, 0);
    }
}

function draw() {
    background(255, 255, 50);
    // bubbles.forEach(bubble => {
    //     bubble.move();
    //     bubble.show();
    // })

    for(let i = 0; i>4; i++){
        bubbles[i].move();
        bubbles[i].show();

    }
}