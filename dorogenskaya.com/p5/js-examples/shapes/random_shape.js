class Block {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.isOverRectangle = false;
        this.randomKey = Math.floor(random(0,8));
        this.halfSize = size/2;
        this.color1 = '#FFFFFF';
        this.listOfColors= [ color('#FFDC4E'), color('#A6F5E2'), color('#FF8D4C')];
        this.color2 = this.listOfColors[int(random(0, this.listOfColors.length))];
        this.color3 = this.listOfColors[int(random(0, this.listOfColors.length))];
        this.color4 = this.listOfColors[int(random(0, this.listOfColors.length))];
    }

    pressed() {
        if (mouseX > (this.x) - (this.halfSize) &&
            mouseX < (this.x) + (this.halfSize) &&
            mouseY > (this.y) - (this.halfSize) &&
            mouseY < (this.y) + (this.halfSize)) {
            this.randomKey = this.randomKey + 1;
            if (this.randomKey === 9) {
                this.randomKey = 0;
            }
        }
    }

    over() {
        if (mouseX > (this.x) - (this.halfSize) &&
            mouseX < (this.x) + (this.halfSize) &&
            mouseY > (this.y) - (this.halfSize) &&
            mouseY < (this.y) + (this.halfSize)) {
            this.isOverRectangle = true;
        } else {
            this.isOverRectangle = false;
        }
    }

    forms (){

        if (this.randomKey == 0) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
        }
        if (this.randomKey == 1) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
            fill(this.color2);
            triangle(this.halfSize, this.halfSize, -this.halfSize, this.halfSize, -this.halfSize, -this.halfSize);
        }
        if (this.randomKey == 2) {
            fill(this.color2);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);

        }
        if (this.randomKey === 3) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
            fill(this.color4);
            arc(this.halfSize, 0, this.halfSize * 2, this.halfSize * 2, HALF_PI, -HALF_PI);
            arc(-this.halfSize, 0, this.halfSize * 2, this.halfSize * 2, -HALF_PI, HALF_PI);

        }
        if (this.randomKey === 4) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
            fill(this.color2);
            arc(0, 0, this.halfSize, this.halfSize, HALF_PI/2, HALF_PI/2);
            fill(this.color3);
            triangle(-this.halfSize, -this.halfSize, this.halfSize, this.halfSize, this.halfSize, -this.halfSize);
        }
        if (this.randomKey === 5) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
        }

        if (this.randomKey === 6) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
            fill(this.color3);
            arc(this.halfSize, this.halfSize, this.halfSize * 4, this.halfSize * 4, PI, -HALF_PI);
        }

        if (this.randomKey === 7) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
            fill(this.color3);
            arc(this.halfSize, this.halfSize, this.halfSize * 4, this.halfSize * 4, PI, -HALF_PI);
        }
        if (this.randomKey === 8) {
            fill(this.color1);
            rect(0, 0, this.halfSize * 2, this.halfSize * 2);
        }

    }

    generate() {
        push();
        translate(this.x, this.y);
        rectMode(CENTER);
        noStroke();
        fill(this.color1);
        this.forms();

        if(this.isOverRectangle === true)
        {
            fill('rgba(255, 255, 255, 0.2)');
        } else {
            noFill();
        }
        rectMode(CENTER);

        rect(0,0,this.halfSize*2,this.halfSize*2);
        pop();
    }
}