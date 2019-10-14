function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(1)}

function draw() {
    var ball = {
        x: 0,
        y: 0,
        w: 400
    };

    background(255, 255, 50);

    for (ball.x; ball.x <= width; ball.x += ball.w){
        for (let y = 0; y <= height; y += ball.w){
            fill (255, 255, random(255));
            noStroke();
            let circle = ellipse (ball.x, y, ball.w, ball.w );
        }
    }
}