class Ball {
    constructor(x, y, r, distance, fill) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.fill = fill;
        this.loc = createVector(x, y);
        this.velocity = createVector(1, 5);
        this.firstX = x;
        this.distance = distance;
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

    clicked (x,y) {
        let d = dist (x, y, this.x, this.y);
        if(d < this.r){
            this.r = this.r + 10;
            this.choosen = true;
        }
    }

    hovered (x,y) {
        let d = dist (x, y, this.x, this.y);
        if(d < this.r){
            rectMode(CENTER);
            ellipse(this.x, this.y, 30,30);
        }
    }

    flicker (){
        this.x = this.x + random(-0.1,0.1);
        this.y = this.y +  random(-0.1,0.1);
        this.r = this.r + random(-0.4,0.4);
    }

    parallax (x, y) {
        let halfWidth = width/2,
            // do the same for y
            isNegative = x - halfWidth > 0 ? 1 : -1,
            mapDistance = Math.abs(x - halfWidth) / halfWidth * this.distance;
            this.x = this.firstX + mapDistance * isNegative;
    }

    show (x, y) {
        stroke(187, 202, 253);
        fill(this.fill);

        ellipse (this.x, this.y, this.r, this.r);
        ellipse (mouseX, mouseY, 4, 4);
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d<200){
            stroke(255,90);
            line(mouseX, mouseY, this.x, this.y);
        }
    }
}