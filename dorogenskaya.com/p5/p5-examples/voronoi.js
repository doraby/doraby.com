const Delaunay = d3.Delaunay;
const voronoi = d3.voronoi();
let context;
let n = 30
let margin = 60;


function setup() {
    let canvasP5 = createCanvas(windowWidth, windowHeight);
    let context = canvasP5.drawingContext;
    frameRate(3);

    console.log(voronoi);

    var diagram = voronoi(sites);
        links = diagram.links();
        triangles = diagram.triangles();
        polygons = diagram.polygons();

    var vcolors = [
        color(197,27,125), color(222,119,174), color(241,182,218),
        color(253,224,239), color(247,247,247), color(230,245,208),
        color(184,225,134), color(127,188,65), color(77,146,33)
    ];
}

function draw() {
    let canvasP5 = createCanvas(windowWidth, windowHeight);
    let context = canvasP5.drawingContext;

// background(244,244,244);
    if(context) renderVoronoi(context);
    console.log(context);
}

