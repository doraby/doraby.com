let u;
let count;
let shapes = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    u = width/5;
    var highCount = (height/u)+2;
    var wideCount = u+2;
    count = int(highCount * wideCount);

    let i = 0;
    for (var xc = 0; xc < wideCount; xc++) {
        for (var yc = 0; yc < highCount; yc++) {
            shapes[i++] = new Block(int(xc)*u,int(yc)*u, u);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    for (var i = 0; i <= count; i++) {
        shapes[i].pressed();
    }
}

function draw() {
    for (var i = 0; i <= count; i++) {
        shapes[i].generate();
        // shapes[i].over();
    }
}