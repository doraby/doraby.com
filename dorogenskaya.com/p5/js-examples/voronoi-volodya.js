function lineLineIntersect([x0, y0], [x1, y1], [x2, y2], [x3, y3]) {
    const x02 = x0 - x2, y02 = y0 - y2;
    const x10 = x1 - x0, y10 = y1 - y0;
    const x32 = x3 - x2, y32 = y3 - y2;
    const t = (x32 * y02 - y32 * x02) / (y32 * x10 - x32 * y10);
    return [x0 + t * x10, y0 + t * y10];
}

function lineLineBisect([x0, y0], [x1, y1], [x2, y2], [x3, y3]) {
    const x02 = x0 - x2, y02 = y0 - y2;
    const x10 = x1 - x0, y10 = y1 - y0, l10 = Math.sqrt(x10 ** 2 + y10 ** 2);
    const x32 = x3 - x2, y32 = y3 - y2, l32 = Math.sqrt(x32 ** 2 + y32 ** 2);
    const ti = (x32 * y02 - y32 * x02) / (y32 * x10 - x32 * y10);
    const xi = x0 + ti * x10, yi = y0 + ti * y10;
    return [[xi, yi], [xi + x10 / l10 + x32 / l32, yi + y10 / l10 + y32 / l32]];
}

function pointLineDistance([x0, y0], [x2, y2], [x1, y1]) {
    const x21 = x2 - x1, y21 = y2 - y1;
    return (y21 * x0 - x21 * y0 + x2 * y1 - y2 * x1) / Math.sqrt(y21 * y21 + x21 * x21);
}

function circleTangent(p0, p1, p2, p3, p4, p5) {
    const b0 = lineLineBisect(p0, p1, p3, p2);
    const b1 = lineLineBisect(p2, p3, p5, p4);

    // calc tangent point coordinate
    const i = lineLineIntersect(...b0, ...b1);

    // tangent and radius?
    return [...i, pointLineDistance(i, p0, p1)];
}

function polygonIncircle(polygon) {
    let circle = [NaN, NaN, 0];
    for (let i = 0, n = polygon.length - 1; i < n; ++i) {

        // how were these polygons sorted

        const pi0 = polygon[i], pi1 = polygon[i + 1];
        for (let j = i + 1; j < n; ++j) {
            const pj0 = polygon[j], pj1 = polygon[j + 1];
            //search ?
            search: for (let k = j + 1; k < n; ++k) {
                const pk0 = polygon[k], pk1 = polygon[k + 1];
                const c = circleTangent(pi0, pi1, pj0, pj1, pk0, pk1);
                if (!(c[2] > circle[2])) continue;
                for (let l = 0; l < n; ++l) {
                    if (l === i || l === j || l === k) continue;
                    const d = pointLineDistance(c, polygon[l], polygon[l + 1]);
                    if (d + 1e-6 < c[2]) continue search;
                }
                circle = c;
            }
        }
    }
    return circle;
}

function movements(width, height, margin, particles) {
    return particles.map((x) => {
        const p = [...x];
        p[0] += p[2];
        p[1] += p[3];
        if (p[0] < -margin) {
            p[0] += width + margin * 3;
        } else if (p[0] > width + margin) {
            p[0] -= width + margin * 3;
        }

        if (p[1] < -margin) {
            p[1] += height + margin * 3;
        } else if (p[1] > height + margin) {
            p[1] -= height + margin * 3;
        }
        p[2] += 0.02 * (Math.random() - 0.5) - 0.01 * p[2];
        p[3] += 0.02 * (Math.random() - 0.5) - 0.01 * p[3];
        return p;
    });
}

function isPointInCircle(point, circle) {
    const [px, py] = point;
    const [cx, cy, r] = circle;
    const dx = Math.abs(px - cx);
    const dy = Math.abs(py - cy);
    return (dx * dx + dy * dy) <= r * r;
}

const createUpdater = ({width, height, context, Delaunay}) => (particles, cursor) => {
    const delaunay = new Delaunay.from(particles);
    const voronoi = delaunay.voronoi([0.5, 0.5, width - 0.5, height - 0.5]);
    context.clearRect(0, 0, width, height);

    context.fillStyle = "#A1EEDA";
    context.fillRect(0, 0, width, height);

    const cells = Array.from(voronoi.cellPolygons())
        .map((cell) => polygonIncircle(cell))
        .filter(([x, y, r]) => r > 1.5);

    context.beginPath();
    cells
        .filter(([x, y, r]) => isPointInCircle(cursor, [x, y, r]))
        .forEach(([x, y, r]) => {
            context.moveTo(x + r - 1.5, y);
            context.arc(x, y, r - 0.5, 0, 2 * Math.PI);
        });
    context.fillStyle = "#FFF";
    context.fill();


    context.beginPath();
    cells
        .filter(([x, y, r]) => !isPointInCircle(cursor, [x, y, r]))
        .forEach(([x, y, r]) => {
            context.moveTo(x + r - 1.5, y);
            context.arc(x, y, r - 1.5, 0, 2 * Math.PI);
        });
    context.fillStyle = "#A5F5E1";
    context.fill();

    // context.beginPath();
    // delaunay.render(context);
    // context.lineWidth = 0.5;
    // context.strokeStyle = "#000";
    // context.stroke();

    context.beginPath();
    voronoi.render(context);
    voronoi.renderBounds(context);
    context.strokeStyle = "#86C4B3";
    context.stroke();

    context.beginPath();
    delaunay.renderPoints(context);
    context.fillStyle = "#86C4B3";
    context.fill();
};

const rand = (n) => Math.floor(Math.random() * n);

const increment = (rate, width, height) => (particles) => {
    const corners = [
        // [0, 0],
        // [0, height],
        // [width, height],
        // [width, 0],
    ].concat([
        [Math.floor(width * 0.25), Math.floor(height * 0.25)],
        [Math.floor(width * 0.25), Math.floor(height * 0.75)],
        [Math.floor(width * 0.50), Math.floor(height * 0.50)],
        [Math.floor(width * 0.75), Math.floor(height * 0.25)],
        [Math.floor(width * 0.75), Math.floor(height * 0.75)],
    ]);

    const range = [...Array(rate).keys()];
    return particles.concat(range.map(() => {
        const rand = Math.floor(Math.random() * corners.length);
        const [x, y] = corners[rand];
        return [
            x + Math.floor(Math.random() * 10),
            y + Math.floor(Math.random() * 10),
            0,
            0
        ];
    }));
};

const decrement = (rate) => (particles) => {
    const range = [...Array(rate).keys()];
    range.forEach(() => {
        particles.splice(rand(particles.length), 1);
    });
    return particles;
};

const app = (canvas, Delaunay) => {
    const context = canvas.getContext("2d");
    context.fillStyle = "#A1EEDA";
    context.fillRect(0, 0, 150, 75);

    const n = 20;
    const height = window.innerHeight;
    const width = window.innerWidth;

    let cursor = [0, 0];
    context.canvas.ontouchmove = context.canvas.onmousemove = (event) => {
        event.preventDefault();
        cursor = [event.layerX, event.layerY];
        prevParticles[0] = [...cursor, 0, 0];
    };

    const update = createUpdater({width, height, context, Delaunay});

    let prevParticles = Array.from({length: n}, () => [Math.random() * width, Math.random() * height, 0, 0]);
    update(prevParticles, cursor);

    setInterval(() => {
        const howMuch2Add = rand(1);
        const howMuch2Del = rand(1);
        const add = increment(howMuch2Add, width, height);
        const del = decrement(howMuch2Del);
        prevParticles = add(del(prevParticles));
    }, 4000);

    function step() {
        const nextParticles = movements(width, height, 120, prevParticles);
        update(nextParticles, cursor);
        prevParticles = nextParticles;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
};