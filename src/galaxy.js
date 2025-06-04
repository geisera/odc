import { getViewType } from './state.js';


export function initGalaxy() {

  /* ---------- deterministic PRNG ---------- */
    function mulberry32(seed){
        return function(){
            let t = seed += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    /* ---------- galaxy painter ---------- */
    const canvas = document.getElementById('star-map');
    const ctx = canvas.getContext('2d');
    const width = 650; //canvas.width;
    const height = 650; //canvas.height;
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    /* --- pan state & settings --- */
    const zoomLevel = Object.freeze({
    LEVEL_1: 1,
    LEVEL_2: 5,
    LEVEL_3: 10,
    LEVEL_4: 100,
    LEVEL_5: 1000,
    LEVEL_6: 10000,
    });

    let xOffset = 0;
    let yOffset = 0;
    let zoom = zoomLevel.LEVEL_1;
    let STEP  = 100;
    let size = 1.0;

    // Helper to update offsets so that zoom occurs around canvas center
    function adjustOffsetsForZoom(newZoom) {
    const ratio = newZoom / zoom;
    xOffset *= ratio;
    yOffset *= ratio;
    }

    // Increase zoom (if not already at max)
    function zoomIn() {
    let newZoom = zoom;
    let newSize = size;

    switch (zoom) {
        case zoomLevel.LEVEL_1:
        newZoom = zoomLevel.LEVEL_2;
        newSize = 1.;
        break;
        case zoomLevel.LEVEL_2:
        newZoom = zoomLevel.LEVEL_3;
        newSize = 2;
        break;
        case zoomLevel.LEVEL_3:
        newZoom = zoomLevel.LEVEL_4;
        newSize = 6;
        break;
        case zoomLevel.LEVEL_4:
        newZoom = zoomLevel.LEVEL_5;
        newSize = 10;
        break;
        case zoomLevel.LEVEL_5:
        newZoom = zoomLevel.LEVEL_6;
        newSize = 40;
        break;
        // LEVEL_5 is max; no change
    }
    if (newZoom !== zoom) {
        adjustOffsetsForZoom(newZoom);
        zoom = newZoom;
        size = newSize;
        updateStep();
        initGalaxy();
    }
    }

    // Decrease zoom (if not already at min)
    function zoomOut() {
    let newZoom = zoom;
    let newSize = size;

    switch (zoom) {
        case zoomLevel.LEVEL_6:
        newZoom = zoomLevel.LEVEL_5;
        newSize = 10;
        break;
        case zoomLevel.LEVEL_5:
        newZoom = zoomLevel.LEVEL_4;
        newSize = 6;
        break;
        case zoomLevel.LEVEL_4:
        newZoom = zoomLevel.LEVEL_3;
        newSize = 2;
        break;
        case zoomLevel.LEVEL_3:
        newZoom = zoomLevel.LEVEL_2;
        newSize = 1;
        break;
        case zoomLevel.LEVEL_2:
        newZoom = zoomLevel.LEVEL_1;
        newSize = 1;
        break;
        // LEVEL_1 is min; no change
    }
    if (newZoom !== zoom) {
        adjustOffsetsForZoom(newZoom);
        zoom = newZoom;
        size = newSize;
        updateStep();
        initGalaxy();
    }
    }

    function updateStep() {
    if (zoom === zoomLevel.LEVEL_6){
        STEP = 1;
    } else if (zoom === zoomLevel.LEVEL_5) {
        STEP = 10;
    } else if (zoom === zoomLevel.LEVEL_4) {
        STEP = 25;
    } else if (zoom === zoomLevel.LEVEL_3) {
        STEP = 50;
    } else if (zoom === zoomLevel.LEVEL_2) {
        STEP = 75;
    } else { // LEVEL_1
        STEP = 100;
    }
    }

    let count;
    function initGalaxy() {
    count = 0;
    let imageMap = [];
    const rand = mulberry32(99);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    const arms = 2;
    const stars = 40000;
    const spread = 3.9;
    const twist = 0.55;
    const maxR = Math.min(width, height) * zoom;

    for (let i = 0; i < stars; i++) {
        const arm = i % arms;
        const t = rand();
        const r = t * maxR;
        const baseA = (arm / arms) * 2 * Math.PI;
        const angle = baseA + t * twist * 2 * Math.PI + (rand() - 0.5) * spread;

        /* apply pan offsets */
        const x = cx + r * Math.cos(angle) + xOffset;
        const y = cy + r * Math.sin(angle) + yOffset;

        /* Get only the stars on canvas for image map */
        // if ((x + (size/2)) >= 0 && (x + (size/2)) <= width && (y + (size/2)) >= 0 && (y + (size/2)) <= height) {
        //   count++;
        //   mapx = Math.round(x + (size/2));
        //   mapy = Math.round(y + (size/2));
        //   imageMap.push({x:mapx, y:mapy})

        // }

        const b = rand() * 255 | 0;
        ctx.fillStyle = `rgb(${b},${b},255)`;
        const rad = size / 2;
        ctx.beginPath();
        ctx.arc(x + rad, y + rad, rad, 0, 2 * Math.PI);
        ctx.fill();
    }

    if (zoom === zoomLevel.LEVEL_5) {
    }
    }


    /* --- arrow-key handling --- */
   
    window.addEventListener('keydown', e => {
        if ( getViewType() === 'map-view' ){
            switch (e.key) {
                case 'ArrowUp':
                    yOffset += STEP;
                    e.preventDefault();
                    initGalaxy();
                    break;
                case 'ArrowDown':
                    yOffset -= STEP;
                    e.preventDefault();
                    initGalaxy();
                    break;
                case 'ArrowLeft':
                    xOffset += STEP;
                    e.preventDefault();
                    initGalaxy();
                    break;
                case 'ArrowRight':
                    xOffset -= STEP;
                    e.preventDefault();
                    initGalaxy();
                    break;
                case '+':
                    e.preventDefault();
                    zoomIn();
                    break;
                case '-':
                    e.preventDefault();
                    zoomOut();
                    break;
            }
        }
    });

    /* --- click-to-center handling --- */
    canvas.addEventListener('click', e => {
    const clickX = e.offsetX;
    const clickY = e.offsetY;

    xOffset += (cx - clickX);
    yOffset += (cy - clickY);

    initGalaxy();
    });


// Initial draw
updateStep();

initGalaxy();
}
