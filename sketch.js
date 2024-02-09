// sketch.js
// License Creative Commons Attribution-NonCommercial (CC-BY-NC)
// Author IA López. Find me on Twitter and Instagram: @_IA_Lopez
// https://linktr.ee/ialopez

// Control panel
let fpsInput,recordFpsInput,maxRecordTimeInput,recordButton,
shatterButton,fractalTreeButton, particleSystemButton, soundWavesButton, alienLanguageButton, atomButton, relationsButton
interactiveSoundWavesButton, interactiveRelationsButton;
//waterSimulationButton, waveform3DButton;

let currentEffect = 'snakes'; // Default effect
let currentCanvas = null;

function setup() {
    currentCanvas = createCanvas(windowWidth, windowHeight);
    colorMode(RGB, 255);
    background(255);

    initSnakes();
    initUI();
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

    soundWavesButton = select('#soundWavesButton');
    soundWavesButton.mousePressed(() => changeEffect('soundWaves'));

    alienLanguageButton = select('#alienLanguageButton');
    alienLanguageButton.mousePressed(() => changeEffect('alienLanguage'));

    atomButton = select('#atomButton');
    atomButton.mousePressed(() => changeEffect('atom'));

    relationsButton = select('#relationsButton');
    relationsButton.mousePressed(() => changeEffect('relations'));

    atomButton = select('#atomButton');
    atomButton.mousePressed(() => changeEffect('atom'));

    interactiveSoundWavesButton = select('#interactiveSoundWavesButton');
    interactiveSoundWavesButton.mousePressed(() => changeEffect('interactiveSoundWaves'));

    interactiveRelationsButton = select('#interactiveRelationsButton');
    interactiveRelationsButton.mousePressed(() => changeEffect('interactiveRelations'));


    //waveform3DButton = select('#waveform3DButton');
    //waveform3DButton.mousePressed(() => changeEffect('3dWaveform'));

    //waterSimulationButton = select('#waterSimulationButton');
    //waterSimulationButton.mousePressed(() => changeEffect('waterSimulation'));
}

function changeEffect(effect) {
    currentEffect = effect;
    createCanvasForEffect(effect);
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
    } else if (effect === 'meteorShower') {
        initMeteorShower();
    } else if (effect === 'alienLanguage') {
        initAlienLanguage();
    } else if (effect === 'atom') {
        initAtom();
    } else if (effect === 'relations') {
        initRelations();
    } else if (effect === 'interactiveRelations') {
        initInteractiveRelations();
    } else if (effect === 'waterSimulation') {
        initWaterSimulation();
    } 

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
        case 'soundWaves':
            drawSoundWaves();
            break;
        case 'alienLanguage':
            drawAlienLanguage();
            break;
        case 'atom':
            drawAtom();
            break;
        case 'relations':
            drawRelations();
            break;

        case 'interactiveSoundWaves':
            drawInteractiveSoundWaves();
            break;
        case 'interactiveRelations':
            drawInteractiveRelations();
            break;

        case '3dWaveform':
            //generate3DWaveform();
            break;
        case 'waterSimulation':
            drawWaterSimulation();
            break;
    }

    recorder.handleRecording();
}

// B&W Snakes
const NUM_SNAKES = 5; // Number of snakes
const SNAKE_LENGTH = 20; // Length of each snake
const ELEMENT_SIZE = 30; // Size of each snake segment
const SNAKE_SPEED_RANGE = { min: -11, max: 11 }; // Speed range for snake movement
let snakes = [];

function initSnakes() {
    snakes = [];
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
        rotate(angle); // rotation
        branch(len * 0.67);
        pop();
        push();
        rotate(-angle);
        branch(len * 0.67);
        pop();
    }
}


// Particle system
let particles = [];

function runParticleSystem() {
    particles = [];

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

// Particle Galaxy
let galaxyParticles = [];
const NUM_GALAXY_PARTICLES = 200;

function initGalaxy() {
    galaxyParticles = [];
    for (let i = 0; i < NUM_GALAXY_PARTICLES; i++) {
        galaxyParticles.push(new GalaxyParticle());
    }
}

function drawGalaxy() {
    translate(width / 2, height / 2); // Centered
    rotate(frameCount * 0.002); // Rotation

    drawNebulaBackground();

    galaxyParticles = [];

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
    patternRotation = [];
    patternRotationSpeed = [];
    initialElementRotation = [];
    initialPatternRotation = [];
    elementRotation = [];
    elementRotationSpeed = [];
    patternConfig = [];
    colors = [];
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

// Sound Waves
function drawSoundWaves() {
    // Create a gradient background from top to bottom
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(10, 10, 20), color(0, 0, 0), inter);
        stroke(c);
        line(0, i, width, i);
    }

    let xoff = 0; // Start xoff at 0

    // Use noise to draw waves varying in height and color
    for (let x = 0; x <= width; x += 5) { // Reduce the distance between lines for a denser look
        let y = map(noise(xoff, millis() / 1000), 0, 1, 100, height - 100);
        // Dynamic color based on x position and time
        let r = map(sin(millis() / 1000 + x * 0.01), -1, 1, 0, 255);
        let g = map(x, 0, width, 0, 255);
        let b = map(cos(millis() / 1000 + x * 0.01), -1, 1, 255, 0);
        stroke(r, g, b);
        strokeWeight(map(sin(xoff), -1, 1, 1, 5)); // Vary line width for visual interest

        line(x, height, x, y); // Draw each line from bottom to the calculated y position
        xoff += 0.05; // Increment xoff for the next line
    }
}


// Alien language
let alienPhrase = [];

function initAlienLanguage() {
    let phraseLength = 5; // Number or character
    let padding = width * 0.1;
    let usableWidth = width - (padding * 2);
    let spacing = usableWidth / (phraseLength + 1);
    
    alienPhrase = [];
    
    for (let i = 1; i <= phraseLength; i++) {
        let xPosition = (spacing * i) + padding;
        alienPhrase.push(new AlienCharacter(xPosition, height / 2));
    }
}


function drawAlienLanguage() {
    background(0);
    alienPhrase.forEach(char => {
        char.update();
        char.show();
    });
}

class AlienCharacter {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.segments = [];
    this.initializeSegments();
    this.transformationDelay = 150;
  }

  initializeSegments() {
    this.segments = [];
    // Generate character with segmets
    let numSegments = random([3, 4, 5]); // 3 to 5 segments per char
    for (let i = 0; i < numSegments; i++) {
      if (random() < 0.5) { // 50% prob line
        this.segments.push({
          type: 'line',
          current: {
            x1: random(-20, 20), y1: random(-20, 20),
            x2: random(-20, 20), y2: random(-20, 20)
          },
          target: {
            x1: random(-20, 20), y1: random(-20, 20),
            x2: random(-20, 20), y2: random(-20, 20)
          },
          timer: 0,
          isTransforming: true,
        });
      } else { // 50% Prob curve
        this.segments.push({
          type: 'curve',
          current: {
            x1: random(-20, 20), y1: random(-20, 20),
            cx1: random(-20, 20), cy1: random(-20, 20), // Control points
            cx2: random(-20, 20), cy2: random(-20, 20),
            x2: random(-20, 20), y2: random(-20, 20)
          },
          target: {
            x1: random(-20, 20), y1: random(-20, 20),
            cx1: random(-20, 20), cy1: random(-20, 20),
            cx2: random(-20, 20), cy2: random(-20, 20),
            x2: random(-20, 20), y2: random(-20, 20)
          },
          timer: 0,
          isTransforming: true,
        });
      }
    }
  }

  update() {
    this.segments.forEach(segment => {
      if (segment.isTransforming) {
        // Interpolation
        for (const key in segment.current) {
          segment.current[key] = lerp(segment.current[key], segment.target[key], 0.05);
        }

        // Proximity
        if (this.isSegmentComplete(segment)) {
          segment.isTransforming = false;
          segment.timer = 0;
        }
      } else {
        segment.timer++;
        if (segment.timer > this.transformationDelay) {
          // New objectives
          this.generateNewTargets(segment);
          segment.isTransforming = true;
        }
      }
    });
  }

  isSegmentComplete(segment) {
    return Object.keys(segment.current).every(key => abs(segment.current[key] - segment.target[key]) < 0.1);
  }

  generateNewTargets(segment) {
    // transformation
    for (const key in segment.target) {
      segment.target[key] = random(-20, 20);
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    noFill();
    this.segments.forEach(({type, current}) => {
      if (type === 'line') {
        line(current.x1, current.y1, current.x2, current.y2);
      } else {
        bezier(current.x1, current.y1, current.cx1, current.cy1, current.cx2, current.cy2, current.x2, current.y2);
      }
    });
    pop();
  }
}

// Atom
let atomParticles = [];
let attractors = [];
let wind;
const numParticles = 100;
const numAttractors = 3;

function initAtom() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 10);

  atomParticles = [];
  attractors = [];

  // Particle
  for (let i = 0; i < numParticles; i++) {
    atomParticles.push(new AtomParticle(random(width), random(height)));
  }

  // Attraction zone
  for (let i = 0; i < numAttractors; i++) {
    attractors.push(createVector(random(width), random(height)));
  }

  wind = createVector(0, 0); // Wind
}

function drawAtom() {
  wind.rotate(random(-0.05, 0.05)); // Change wind direction

  atomParticles.forEach((p) => {
    attractors.forEach((attractor) => {
      p.attracted(attractor); // Attraction 
    });
    p.applyForce(wind); // Wind
    p.update();
    p.edges();
    p.show();
  });
}

class AtomParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.color = random(360);
    this.size = random(1, 5);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  attracted(target) {
    let force = p5.Vector.sub(target, this.pos);
    let dsquared = force.magSq();
    dsquared = constrain(dsquared, 25, 500);
    let strength = 5 / dsquared;
    force.setMag(strength);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration
    this.color += 1; // Change color gradually
    if (this.color > 360) {
      this.color = 0;
    }
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    stroke(this.color, 100, 100, 50);
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
  }
}

// Relations
let particlesRelations = [];

function initRelations() {
  createCanvas(windowWidth, windowHeight);
  background(20, 20, 20);
  colorMode(HSB, 360, 100, 100, 100);

  particlesRelations = [];
  let particlesCount = 100;
  for (let i = 0; i < particlesCount; i++) {
    particlesRelations.push(new RelationsParticle());
  }
}

function drawRelations() {
    particlesRelations.forEach((particle) => {
    particle.update();
    particle.display();
    particle.checkEdges();
  });
}

class RelationsParticle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = random(2, 5);
    this.color = color(random(360), 80, 100);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration
  }

  display() {
    stroke(this.color);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);

    // Connections
    particlesRelations.forEach(other => {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < 100) {
        strokeWeight(map(d, 0, 100, 2, 0.1));
        line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      }
    });
  }

  checkEdges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}



// Interactive Sound Waves
function drawInteractiveSoundWaves() {
    // Create a gradient background
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(10, 10, 20), color(0, 0, 0), inter);
        stroke(c);
        line(0, i, width, i);
    }

    let xoff = 0; // Start xoff at 0

    // Adjust wave spacing based on mouse X position
    let waveSpacing = map(mouseX, 0, width, 2, 20);

    // Loop to draw waves
    for (let x = 0; x <= width; x += waveSpacing) {
        // Adjust wave height based on mouse Y position
        let maxHeight = map(mouseY, 0, height, height - 50, 50);
        let y = map(noise(xoff, millis() / 1000), 0, 1, maxHeight, height - maxHeight);

        // Change color based on mouse position
        let r = map(mouseX, 0, width, 0, 255);
        let g = map(mouseY, 0, height, 255, 0);
        let b = 255 - r;
        stroke(r, g, b);
        strokeWeight(map(sin(xoff), -1, 1, 1, 3));

        line(x, height, x, y);
        xoff += 0.05;
    }
}

// Interactive relations
let interactiveRelationsParticle = [];

function initInteractiveRelations() {
  createCanvas(windowWidth, windowHeight);
  background(20, 20, 20);
  colorMode(HSB, 360, 100, 100, 100);

  let particlesCount = 50;
  interactiveRelationsParticle = [];
  for (let i = 0; i < particlesCount; i++) {
    interactiveRelationsParticle.push(new InteractiveRelationsParticle());
  }
}

function drawInteractiveRelations() {
    interactiveRelationsParticle.forEach((particle) => {
    particle.update();
    particle.display();
    particle.checkEdges();
    particle.interactWithMouse();
  });
}

class InteractiveRelationsParticle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = random(2, 5);
    this.color = color(random(360), 80, 100);
    this.size = random(3, 7);
  }

  repelOtherParticles() {
    interactiveRelationsParticle.forEach(other => {
      if (other !== this) {
        let distance = p5.Vector.dist(this.pos, other.pos);
        if (distance < 100) { // Repel ratio
          let repelForce = p5.Vector.sub(this.pos, other.pos);
          repelForce.normalize();
          repelForce.div(distance); // Repel decrease with more distance
          this.acc.add(repelForce);
        }
      }
    });
  }

  update() {
    this.repelOtherParticles();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);

    interactiveRelationsParticle.forEach(other => {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < 150) {
        let alpha = map(d, 0, 150, 255, 0);
        stroke(this.color, alpha);
        strokeWeight(map(d, 0, 150, 2, 0));
        line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      }
    });
  }

  checkEdges() {
    if (this.pos.x >= width) {
      this.pos.x = width;
      this.vel.x *= -1;
    } else if (this.pos.x <= 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    }

    if (this.pos.y >= height) {
      this.pos.y = height;
      this.vel.y *= -1;
    } else if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    }
  }

  interactWithMouse() {
    let mousePos = createVector(mouseX, mouseY);
    let forceDirection = p5.Vector.sub(mousePos, this.pos);
    let distance = forceDirection.mag();
    let forceMagnitude = constrain(map(distance, 0, 200, 5, 0), 0, 5);
    forceDirection.normalize();
    let force = forceDirection.mult(forceMagnitude);
    this.acc.add(force);
  }
}

// 3D Waveform
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

// 3D Water
function drawWaterSimulation() {
    background(0);
    rotateX(-PI/6);
    rotateY(PI/4);
    fill(0, 0, 255, 100);
    translate(-width / 2, -height / 2, 0);
    for (let i = 0; i < width; i += 20) {
        for (let j = 0; j < height; j += 20) {
            const d = dist(i, j, width / 2, height / 2);
            const offset = map(d, 0, dist(0, 0, width / 2, height / 2), -PI, PI);
            const a = angle + offset;
            const h = floor(map(sin(a), -1, 1, 100, 300));
            push();
            translate(i + 10, j + 10, h / 2);
            normalMaterial();
            box(20, 20, h);
            pop();
        }
    }
    angle += 0.1;
}


function windowResized() {
    console.log("Canvas size: width - " + windowWidth + ", height - " + windowHeight);
    resizeCanvas(windowWidth, windowHeight);
}
