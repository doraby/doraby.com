function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    strokeWeight(1);
    // stroke(255);

    for (var x=0; x<=mouseX; x +=50){
        for (var y=0; y<=mouseY; y +=50){
            fill (random(25), 0, random(245));
            ellipse (x, y, 25, 25 )
        }
    }

}