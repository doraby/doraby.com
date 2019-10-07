const Delaunay = d3.Delaunay;
let context;
let n = 30
let margin = 60;


function setup() {
    // let canvasP5 = createCanvas(windowWidth, windowHeight);
    // let context = canvasP5.drawingContext;
    frameRate(3);

    var vcolors = [
        color(197,27,125), color(222,119,174), color(241,182,218),
        color(253,224,239), color(247,247,247), color(230,245,208),
        color(184,225,134), color(127,188,65), color(77,146,33)
    ];
}

function renderVoronoi(context){
    const particles = Array.from({length: n}, () => [Math.random() * width, Math.random() * height, 0, 0]);
    const delaunay = d3.Delaunay.from(particles);
    const voronoi = delaunay.voronoi([0, 0, width, height]);


    context.beginPath();
    voronoi.render(context);
    context.strokeStyle = "#86C4B3";
    context.stroke();

    // moves
    for (const p of particles) {
        p[0] += p[2];
        p[1] += p[3];
        if (p[0] < -margin) p[0] += width + margin * 3;
        else if (p[0] > width + margin) p[0] -= width + margin * 3;
        if (p[1] < -margin) p[1] += height + margin * 3;
        else if (p[1] > height + margin) p[1] -= height + margin * 3;
        p[2] += 0.02 * (Math.random() - 0.5) - 0.01 * p[2];
        p[3] += 0.02 * (Math.random() - 0.5) - 0.01 * p[3];
    }
}

function draw() {

    let canvasP5 = createCanvas(windowWidth, windowHeight);
    let context = canvasP5.drawingContext;

    if(context) renderVoronoi(context);
    console.log(context);
}

