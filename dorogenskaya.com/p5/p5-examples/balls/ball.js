class Ball {
    constructor(x, y, r, fill) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.fill = fill;
        this.loc = createVector(100, 100);
        this.velocity = createVector(1, 5);
    }

    move () {
        this.loc.add(this.velocity);
        if ((this.loc.x > width - this.r/2) || (this.loc.x < 0 + this.r/2)) {
            this.velocity.x = this.velocity.x * -1;
        }
        if ((this.loc.y > height - this.r/2) || (this.loc.y < 0+this.r/2)) {
            this.velocity.y = this.velocity.y * -1;
        }
    }

    show () {
        noStroke();
        fill(this.fill);
        ellipse (this.loc.x, this.loc.y, this.r, this.r);
    }
}