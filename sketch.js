// sketch.js
// License Creative Commons Attribution-NonCommercial (CC-BY-NC)
// Author IA López. Find me on Twitter and Instagram: @_IA_Lopez
// https://linktr.ee/ialopez

// B&W Snakes
const NUM_SNAKES = 5; // Number of snakes
const SNAKE_LENGTH = 20; // Length of each snake
const ELEMENT_SIZE = 30; // Size of each snake segment
const SNAKE_SPEED_RANGE = { min: -11, max: 11 }; // Speed range for snake movement

// Controles
let fpsInput,recordFpsInput,maxRecordTimeInput,recordButton,shatterButton,fractalTreeButton,particleSystemButton,waveform3DButton;

let snakes = [];
let currentEffect = 'snakes'; // Default effect
let currentCanvas = null;

function setup() {
    currentCanvas = createCanvas(windowWidth, windowHeight);
    colorMode(RGB, 255);
    background(255);

    initSnakes();
    initUI();
}

function draw() {
    switch (currentEffect) {
        case 'snakes':
            drawSnakes();
            break;
        case 'shatter':
            generateColoredShatterEffect();
            break;
        case 'fractalTree':
            drawFractalTree();
            break;
        case 'particleSystem':
            runParticleSystem();
            break;
        case 'particleGalaxy':
            drawGalaxy();
            break;
        case 'kaleidoscopicPattern':
            drawPatternWithConfig();
            break;
        case '3dWaveform':
            //generate3DWaveform();
            break;
    }

    recorder.handleRecording();
}

function createCanvasForEffect(effect) {
    /*if (currentCanvas) {
        currentCanvas.remove(); // Delete previous canvas
    }

    if (effect === '3dWaveform') {
        // 3D Canvas
        currentCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
    } else {
        currentCanvas = createCanvas(windowWidth, windowHeight);
    }

    colorMode(RGB, 255);
    background(255);*/

    // Init
    if (effect === 'snakes') {
        initSnakes();
    } else if (effect === 'particleGalaxy') {
        initGalaxy();
    } else if (effect === 'kaleidoscopicPattern') {
        generatePatternConfig();
    }
}

function initUI() {
    fpsInput = select('#fpsInput');
    fpsInput.changed(updateFrameRate);

    recordFpsInput = select('#recordFpsInput');
    maxRecordTimeInput = select('#maxRecordTimeInput');
    recordButton = select('#recordButton');
    recordButton.mousePressed(() => {
        if (!recorder.isRecording()) {
            recorder.setFrameRate(parseInt(recordFpsInput.value()));
            recorder.setMaxRecordingDuration(parseInt(maxRecordTimeInput.value()));
        }
        recorder.toggleRecording();
    });

    snakesButton = select('#snakesButton');
    snakesButton.mousePressed(() => changeEffect('snakes'));
    
    shatterButton = select('#shatterButton');
    shatterButton.mousePressed(() => changeEffect('shatter'));

    fractalTreeButton = select('#fractalTreeButton');
    fractalTreeButton.mousePressed(() => changeEffect('fractalTree'));

    particleSystemButton = select('#particleSystemButton');
    particleSystemButton.mousePressed(() => changeEffect('particleSystem'));

    particleGalaxyButton = select('#particleGalaxyButton');
    particleGalaxyButton.mousePressed(() => changeEffect('particleGalaxy'));

    kaleidoscopicPatternButton = select('#kaleidoscopicPatternButton');
    kaleidoscopicPatternButton.mousePressed(() => changeEffect('kaleidoscopicPattern'));

    //waveform3DButton = select('#waveform3DButton');
    //waveform3DButton.mousePressed(() => changeEffect('3dWaveform'));
}

function changeEffect(effect) {
    currentEffect = effect;
    createCanvasForEffect(effect);
}

function updateFrameRate() {
    if (!recorder.isRecording()) {
        const newFrameRate = parseInt(fpsInput.value());
        frameRate(newFrameRate);
    } else {
        console.log("No se puede cambiar el frame rate durante la grabación");
        fpsInput.value(frameRate);
    }
}
// Snakes (BvsW")
function initSnakes() {
    // Initialize snakes
    for (let n = 0; n < NUM_SNAKES; n++) {
        let snake = {
            segments: [],
            color: random([0, 255]) // Random color: black or white
        };
        for (let i = 0; i < SNAKE_LENGTH; i++) {
            snake.segments.push(createVector(width / 2, height / 2));
        }
        snakes.push(snake);
    }
}

function drawSnakes() {
    for (let snake of snakes) {
        moveSnake(snake);
        drawSnake(snake);
    }
}

function moveSnake(snake) {
    let head = snake.segments[0];
    // Random movement within defined speed range
    head.x += random(SNAKE_SPEED_RANGE.min, SNAKE_SPEED_RANGE.max);
    head.y += random(SNAKE_SPEED_RANGE.min, SNAKE_SPEED_RANGE.max);
    // Constrain movement within canvas boundaries
    head.x = constrain(head.x, ELEMENT_SIZE / 2, width - ELEMENT_SIZE / 2);
    head.y = constrain(head.y, ELEMENT_SIZE / 2, height - ELEMENT_SIZE / 2);

    // Move each segment to the position of the one in front of it
    for (let i = SNAKE_LENGTH - 1; i > 0; i--) {
        snake.segments[i] = snake.segments[i - 1].copy();
    }
}

function drawSnake(snake) {
    let alpha = 255; // Initial opacity for the head segment
    let alphaDecay = alpha / snake.segments.length; // Reduce opacity for each segment

    for (let i = snake.segments.length - 1; i >= 0; i--) {
        let segment = snake.segments[i];

        fill(snake.color, alpha);
        stroke(snake.color === 255 ? 0 : 255, alpha);
        ellipse(segment.x, segment.y, ELEMENT_SIZE, ELEMENT_SIZE);
        alpha -= alphaDecay; // Decrease opacity for the next segment
    }
}

// Shatter
function generateColoredShatterEffect() {
    const numShapes = random(5, 10); // Random number of shapes
    for (let i = 0; i < numShapes; i++) {
        noStroke();
        fill(random(255), random(255), random(255), random(100, 200));
        beginShape();
        const numVertices = random(3, 8);
        for (let j = 0; j < numVertices; j++) {
            const x = random(width);
            const y = random(height);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
}

// Fractal tree
let angle;
let len = 100;

function drawFractalTree() {
    background(255); // Limpiar fondo
    angle = map(sin(frameCount * 0.01), -1, 1, 0, PI / 2);
    len = map(cos(frameCount * 0.01), -1, 1, 70, 250);

    push();
    translate(width / 2, height);
    stroke(0);
    branch(len);
    pop();
}

function branch(len) {
    line(0, 0, 0, -len);
    translate(0, -len);

    if (len > 4) {
        push();
        rotate(angle); // Rotación basada en frameCount
        branch(len * 0.67);
        pop();
        push();
        rotate(-angle); // Rotación opuesta
        branch(len * 0.67);
        pop();
    }
}


// Particle system
let particles = [];

function runParticleSystem() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
}

class Particle {
    constructor() {
        // Random position
        this.x = random(width);
        this.y = random(height);
        // Random speed and size
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.size = random(5, 20);
        this.alpha = 255;
        // Random colors
        this.color = color(random(255), random(255), random(255), this.alpha);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 2; // Ajustar la tasa de desvanecimiento
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size);
    }

    isDead() {
        return this.alpha < 0;
    }
}


function generate3DWaveform() {
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    for (let i = -50; i < 50; i++) {
        beginShape(TRIANGLE_STRIP);
        for (let j = -50; j < 50; j++) {
            vertex(i, j, sin(frameCount * 0.02 + sqrt(i * i + j * j)) * 10);
            vertex(i, j + 1, sin(frameCount * 0.02 + sqrt(i * i + (j + 1) * (j + 1))) * 10);
        }
        endShape();
    }
}


// Particle Galaxy
let galaxyParticles = [];
const NUM_GALAXY_PARTICLES = 200;

function drawGalaxy() {
    translate(width / 2, height / 2); // Centered
    rotate(frameCount * 0.002); // Rotation

    drawNebulaBackground();

    galaxyParticles.forEach(particle => {
        particle.move();
        particle.display();
    });

    // Core
    fill(0, 0, 0, 150);
    noStroke();
    ellipse(0, 0, 60, 60);
}

class GalaxyParticle {
    constructor() {
        this.angle = random(TWO_PI);
        this.radius = random(20, 400);
        this.speed = random(0.001, 0.005);
        this.baseSize = random(1, 8);
        this.size = this.baseSize;
        this.color = color(random(255), random(255), random(255));
        this.twinkleTime = random(10, 100); // Time for next tinkle
        this.timeSinceTwinkle = 0; // Time from last tinkle
    }

    move() {
        this.angle += this.speed;
        this.timeSinceTwinkle++;
        
        if (this.timeSinceTwinkle > this.twinkleTime) {
            this.size = random(this.baseSize * 0.5, this.baseSize * 1.5);
            this.twinkleTime = random(10, 100);
            this.timeSinceTwinkle = 0;
        }
    }

    display() {
        let x = this.radius * cos(this.angle);
        let y = this.radius * sin(this.angle);
        fill(this.color);
        noStroke();
        ellipse(x, y, this.size, this.size);
    }
}



function drawNebulaBackground() {
    for (let i = 0; i < width; i += 60) {
        for (let j = 0; j < height; j += 60) {
            fill(random(100, 150), random(100, 150), random(200, 255), 60);
            noStroke();
            ellipse(i, j, 100, 100);
        }
    }
}


function initGalaxy() {
    galaxyParticles = [];
    for (let i = 0; i < NUM_GALAXY_PARTICLES; i++) {
        galaxyParticles.push(new GalaxyParticle());
    }
}

// Kaleidoscopic
let patternRotation = [];
let patternRotationSpeed = [];
let initialElementRotation = [];
let initialPatternRotation = [];
let elementRotation = [];
let elementRotationSpeed = [];
let patternConfig = [];
let colors = [];

function generatePatternConfig() {
    // Generate colors
    for (let i = 0; i < 100; i++) {
        colors.push(color(random(255), random(255), random(255), 60));
    }

    // Rotations and speed of rotation
    for (let i = 0; i < 50; i++) {
        elementRotation[i] = random(TWO_PI);
        elementRotationSpeed[i] = random(-0.1, 0.1);
        patternRotation[i] = random(TWO_PI);
        patternRotationSpeed[i] = random(-0.02, 0.02);

        initialElementRotation[i] = elementRotation[i];
        initialPatternRotation[i] = patternRotation[i];
    }

    let numPatterns = int(random(2, 5));

    for (let i = 0; i < numPatterns; i++) {
        let centerX = random(width);
        let centerY = random(height);
        let maxRadius = random(width * 0.2, width * 0.4);
        let numLayers = int(random(5, 10));
        let layers = [];

        for (let j = 0; j < numLayers; j++) {
            let radius = maxRadius * (j + 1) / numLayers;
            let numElements = int(random(7, 15)) * (j + 1);
            let angleStep = TWO_PI / numElements;
            let elementSize = radius * 0.15;
            let elements = [];

            for (let k = 0; k < numElements; k++) {
                let angle = k * angleStep;
                let x = cos(angle) * radius;
                let y = sin(angle) * radius;
                let colorIndex = int(random(colors.length));
                elements.push({x, y, size: elementSize * 1.5, type: k % 2 == 0 ? 'flower' : 'star', color: colors[colorIndex]});
            }

            layers.push(elements);
        }

        patternConfig.push({centerX, centerY, layers});
    }
}

function drawPatternWithConfig() {
    background(255);
    // Actualiza las rotaciones usando las velocidades aleatorias
    for (let i = 0; i < elementRotation.length; i++) {
        elementRotation[i] += elementRotationSpeed[i];
        patternRotation[i] += patternRotationSpeed[i];
    }
    
    for (let i = 0; i < patternConfig.length; i++) {
        let pattern = patternConfig[i];
        push();
        translate(pattern.centerX, pattern.centerY);
        rotate(patternRotation[i]); // Apply rotation to the pattern

        for (let j = 0; j < pattern.layers.length; j++) {
            let elements = pattern.layers[j];
            for (let k = 0; k < elements.length; k++) {
                let elem = elements[k];
                let rotation = elementRotation[(i * 10 + j + k) % elementRotation.length]; // Apply rotation to elements
                if (elem.type === 'flower') {
                    drawFlowerElement(elem.x, elem.y, elem.size, rotation, elem.color);
                } else {
                    drawStarElement(elem.x, elem.y, elem.size, rotation, elem.color);
                }
            }
        }
        pop();
    }
}

function drawFlowerElement(x, y, size, rotation, col) {
    push();
    translate(x, y);
    rotate(rotation);
    stroke(0, 30);
    fill(col);
    for (let i = 0; i < 6; i++) {
        ellipse(0, size / 4, size, size / 2);
        rotate(PI / 3);
    }
    pop();
}

function drawStarElement(x, y, size, rotation, col) {
    push();
    translate(x, y);
    rotate(rotation);
    stroke(0, 30);
    fill(col);
    beginShape();
    for (let i = 0; i < TWO_PI; i += PI / 4) {
        let lx = cos(i) * size;
        let ly = sin(i) * size;
        vertex(lx, ly);
    }
    endShape(CLOSE);
    pop();
}

function windowResized() {
    console.log("Canvas size: width - " + windowWidth + ", height - " + windowHeight);
    resizeCanvas(windowWidth, windowHeight);
}
