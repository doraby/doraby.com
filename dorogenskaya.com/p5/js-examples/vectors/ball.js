class Ball {
    constructor(x, y, r, fill) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.fill = fill;
        this.loc = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this. mass = r*1;

    }

    bounced () {
        this.velocity.add(this.acceleration);
        this.loc.add(this.velocity);
        this.acceleration.mult(0);
    }

    checkEdges() {
        if (this.loc.x > width) {
            this.loc.x = width;
            this.velocity.x *= -1;
        } else if (this.loc.x < 0) {
            this.velocity.x *= -1;
            this.loc.x = 0;
        }

        if (this.loc.y > height-this.r/2) {
            this.velocity.y *= -1;
            this.loc.y = height-this.r/2;
        }
    }

    applyForce (force){
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    hovered (x,y) {
        let d = dist (x, y, this.x, this.y);
        if(d < this.r){
            rectMode(CENTER);
            ellipse(this.x, this.y, 20,20);
        }
    }

    show (x, y) {
        stroke(187, 202, 253);
        fill(this.fill);
        ellipse (this.loc.x, this.loc.y, this.r, this.r);
    }
}