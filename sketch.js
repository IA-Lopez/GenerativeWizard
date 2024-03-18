// sketch.js
// License Creative Commons Attribution-NonCommercial (CC-BY-NC)
// Author IA López. Find me on Twitter and Instagram: @_IA_Lopez
// https://linktr.ee/ialopez

// Control panel
let fpsInput, recordFpsInput, maxRecordTimeInput, recordButton,
  shatterButton, fractalTreeButton, colorFlowButton, soundWavesButton, alienLanguageButton, atomButton, relationsButton
interactiveSoundWavesButton, interactiveRelationsButton,
  waterSimulationButton, waveformButton;

let currentEffect = 'snakes'; // Default effect
let currentCanvas = null;
let canvasHeight = 0;
let canvasWidth = 0;
let graphics3D = null;
let isGraphics3D = false;

function setup() {
  canvasHeight = windowHeight;
  canvasWidth = windowWidth;
  currentCanvas = createCanvas(canvasWidth, canvasHeight, P2D);
  colorMode(RGB, 255);
  background(255);


  graphics3D = createGraphics(canvasWidth, canvasHeight, WEBGL);

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
    case 'colorFlow':
      drawColorFlow();
      break;
    case 'particleGalaxy':
      drawParticleGalaxy();
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

    case 'waveform':
      drawWaveform();
      break;
    case 'waterSimulation':
      drawWaterSimulation();
      break;
    case 'galaxy':
      drawGalaxy();
      break;
  }

  if (isGraphics3D) {
    graphics3D.resetMatrix()
    image(graphics3D, 0, 0);
  }

  recorder.handleRecording();
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

  colorFlowButton = select('#colorFlowButton');
  colorFlowButton.mousePressed(() => changeEffect('colorFlow'));

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


  waveformButton = select('#waveformButton');
  waveformButton.mousePressed(() => changeEffect('waveform'));

  waterSimulationButton = select('#waterSimulationButton');
  waterSimulationButton.mousePressed(() => changeEffect('waterSimulation'));

  waterSimulationButton = select('#galaxyButton');
  waterSimulationButton.mousePressed(() => changeEffect('galaxy'));
}

function changeEffect(effect) {
  currentEffect = effect;
  createCanvasForEffect(effect);
}

function createCanvasForEffect(effect) {
  let requires3D = effect === 'waveform' || effect === 'waterSimulation' || effect === 'galaxy';

  if (requires3D) {
    isGraphics3D = true;
  } else {
    isGraphics3D = false;
  }


  // Init
  if (effect === 'snakes') {
    initSnakes();
  } else if (effect === 'colorFlow') {
    initColorFlow();
  } else if (effect === 'particleGalaxy') {
    initParticleGalaxy();
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
  } else if (effect === 'waveform') {
    initWaveform();
  } else if (effect === 'galaxy') {
    initGalaxy();
  }

}

// ASPECT RATIO
function changeCanvasSize(width, height) {
  canvasWidth = width;
  canvasHeight = height;
  resizeCanvas(canvasWidth, canvasHeight);
  console.log("width: " + canvasWidth + ", height: " + canvasHeight);
  // Re-initialize
  changeEffect(currentEffect);

}

document.getElementById('aspect16_9').addEventListener('click', () => {
  const size = calculateCanvasSize(16, 9);
  changeCanvasSize(size.width, size.height);
});

document.getElementById('aspect4_3').addEventListener('click', () => {
  const size = calculateCanvasSize(4, 3);
  changeCanvasSize(size.width, size.height);
});

document.getElementById('aspect21_9').addEventListener('click', () => {
  const size = calculateCanvasSize(21, 9);
  changeCanvasSize(size.width, size.height);
});

document.getElementById('aspect1_1').addEventListener('click', () => {
  const size = calculateCanvasSize(1, 1);
  changeCanvasSize(size.width, size.height);
});

document.getElementById('aspect9_16').addEventListener('click', () => {
  const size = calculateCanvasSize(9, 16);
  changeCanvasSize(size.width, size.height);
});

document.getElementById('aspect3_4').addEventListener('click', () => {
  const size = calculateCanvasSize(3, 4);
  changeCanvasSize(size.width, size.height);
});

function calculateCanvasSize(aspectRatioWidth, aspectRatioHeight) {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  let targetWidth, targetHeight;

  // Determina si la relación de aspecto es principalmente vertical u horizontal
  if (aspectRatioWidth > aspectRatioHeight) {
    // Horizontal: el ancho es el factor limitante
    targetWidth = Math.min(maxWidth, maxHeight * (aspectRatioWidth / aspectRatioHeight));
    targetHeight = targetWidth / (aspectRatioWidth / aspectRatioHeight);
  } else {
    // Vertical: el alto es el factor limitante
    targetHeight = Math.min(maxHeight, maxWidth * (aspectRatioHeight / aspectRatioWidth));
    targetWidth = targetHeight * (aspectRatioWidth / aspectRatioHeight);
  }

  return { width: targetWidth, height: targetHeight };
}

function updateFrameRate() {
  if (!recorder.isRecording()) {
    const newFrameRate = parseInt(fpsInput.value());
    frameRate(newFrameRate);
  } else {
    console.log("Can't change frame rate during record");
    fpsInput.value(frameRate);
  }
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
    strokeWeight(1);
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


// Particle Galaxy
let galaxyParticles = [];
const NUM_GALAXY_PARTICLES = 200;

function initParticleGalaxy() {
  galaxyParticles = [];
  for (let i = 0; i < NUM_GALAXY_PARTICLES; i++) {
    galaxyParticles.push(new GalaxyParticle());
  }
}

function drawParticleGalaxy() {
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
        elements.push({ x, y, size: elementSize * 1.5, type: k % 2 == 0 ? 'flower' : 'star', color: colors[colorIndex] });
      }

      layers.push(elements);
    }

    patternConfig.push({ centerX, centerY, layers });
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
    this.segments.forEach(({ type, current }) => {
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


// Color flow
let particles = [];
let flowfield;

function initColorFlow() {
  background(0);
  colorMode(HSB, 255);
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }
  flowfield = new FlowField(20);
}

function drawColorFlow() {
  background(0, 0.3); // Suave efecto de desvanecimiento para los trails
  flowfield.update();
  particles.forEach(particle => {
    particle.follow(flowfield);
    particle.update();
    particle.edges();
    particle.show();
  });
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.size = random(4, 8);
    this.maxSpeed = random(2, 5);
    this.hue = random(50, 100);
  }

  follow(flowfield) {
    let x = floor(this.pos.x / flowfield.scl);
    let y = floor(this.pos.y / flowfield.scl);
    let index = x + y * flowfield.cols;
    let force = flowfield.field[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.hue += 0.5;
    if (this.hue > 255) {
      this.hue = 0;
    }
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    noStroke();
    fill(this.hue, 255, 255, 25);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

class FlowField {
  constructor(scl) {
    this.scl = scl;
    this.cols = floor(width / this.scl);
    this.rows = floor(height / this.scl);
    this.field = new Array(this.cols * this.rows);
    this.zoff = 0;
  }

  update() {
    let yoff = 0;
    for (let y = 0; y < this.rows; y++) {
      let xoff = 0;
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        let angle = noise(xoff, yoff, this.zoff) * TWO_PI * 4;
        let v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        this.field[index] = v;
        xoff += 0.1;
      }
      yoff += 0.1;
    }
    this.zoff += 0.01;
  }
}


/* INTERACTIVE */

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


/* 3D */

// Waveform
let cols, rows;
let scl = 30; // Escala de cada celda en la malla
let w, h; // Ancho y alto del "mar"
let flying = 0; // Para animar las ondas

function initWaveform() {
  cols = (windowWidth / scl) + 30;
  rows = (windowHeight / scl) + 5;
  w = cols * scl;
  h = rows * scl;
  graphics3D.colorMode(HSB, 360, 100, 100);
  graphics3D.noStroke();
}

function drawWaveform() {
  flying -= 0.007;
  let yoff = flying;
  graphics3D.background(0);
  graphics3D.rotateX(PI / 3);
  graphics3D.translate(-w / 2, -h / 2 + 200);

  for (let y = 0; y < rows - 1; y++) {
    graphics3D.beginShape(TRIANGLE_STRIP);
    let xoff = 100;
    for (let x = 0; x < cols; x++) {
      let z = map(noise(xoff, yoff), 0, 1, -500, 500);
      let hue = map(z, -200, 200, 160, 360);
      let saturation = map(sin(xoff), -1, 1, 60, 100);
      let brightness = map(cos(yoff), -1, 1, 60, 100);

      graphics3D.fill(hue, saturation, brightness);

      graphics3D.vertex(x * scl, y * scl, z);
      graphics3D.vertex(x * scl, (y + 1) * scl, z);
      xoff += 0.04;
    }
    graphics3D.endShape();
    yoff += 0.04;
  }
}

// 3D Water Orig
/*let waterAngle = 0;

function drawWaterSimulation() {
    graphics3D.background(0);
    graphics3D.rotateX(-PI / 6);
    graphics3D.rotateY(PI / 4);
    graphics3D.fill(0, 0, 255, 100);
    graphics3D.translate(-width / 2, -height / 2, 0);
    for (let i = 0; i < width; i += 20) {
        for (let j = 0; j < height; j += 20) {
            const d = graphics3D.dist(i, j, width / 2, height / 2);
            const offset = graphics3D.map(d, 0, graphics3D.dist(0, 0, width / 2, height / 2), -PI, PI);
            const a = waterAngle + offset;
            const h = graphics3D.floor(graphics3D.map(sin(a), -1, 1, 100, 300));
            graphics3D.push();
            graphics3D.translate(i + 10, j + 10, h / 2);
            graphics3D.normalMaterial();
            graphics3D.box(20, 20, h);
            graphics3D.pop();
        }
    }
    waterAngle += 0.1; 
}*/

let waterAngle = 0;

function initWaterSimulation() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
}

function drawWaterSimulation() {
  background(0);
  rotateX(PI / 2); // Rotar para que el agua esté en horizontal
  translate(-width / 2, -height / 2, -200); // Ajustar la traducción para llenar la vista
  fill(200, 100, 100, 50); // Color del agua con transparencia
  for (let i = 0; i < width; i += 20) {
    for (let j = 0; j < height; j += 20) {
      const d = dist(i, j, width / 2, height / 2);
      const offset = map(d, 0, dist(0, 0, width / 2, height / 2), -PI, PI);
      const a = waterAngle + offset;
      const h = floor(map(sin(a), -1, 1, 20, 100)); // Altura de las olas más variable
      push();
      translate(i + 10, j + 10, h / 2);
      normalMaterial(); // Material que reacciona a la luz para un efecto más dinámico
      box(20, 20, h);
      pop();
    }
  }
  waterAngle += 0.05; // Velocidad de animación ajustada para un movimiento más suave
}


// GALAXY
let galaxyImg = null;
let planets = [];
let stars = [];
let numStars = 1000; // Cantidad de estrellas para generar

// Planeta anillos
let planetRadius = 50; // Radio del planeta central
let numRings = 5; // Número de anillos de luz
let ringDistances = []; // Distancias de los anillos desde el centro del planeta

function preload() {
  galaxyImg = loadImage('img/galaxy.webp');
}

function initGalaxy() {
  planets = [];
  stars = [];

  graphics3D.noStroke();
  graphics3D.ambientLight(60, 60, 60);
  //graphics3D.directionalLight(255, 255, 255, 0.5, 0.5, -1);
  graphics3D.pointLight(255, 255, 255, 0, 0, 100);

  let numPlanets = floor(random(5, 10)); // Número determinado de planetas
  generatePlanets(numPlanets);

  // Inicializar distancias de los anillos
  for (let i = 0; i < numRings; i++) {
    ringDistances.push(planetRadius + 20 + i * 15); // Distancia incremental para cada anillo
  }

  // Generar estrellas fondo
  for (let i = 0; i < numStars; i++) {
    stars.push(new BackgroundStar());
  }
}

function drawGalaxy() {
  graphics3D.resetMatrix();
  graphics3D.clear();
  background(galaxyImg);

  // Configuración de la cámara
  let camX = cos(frameCount * 0.005) * 800;
  let camZ = sin(frameCount * 0.005) * 800;
  graphics3D.camera(camX, 0, camZ, 0, 0, 0, 0, 1, 0);

  // Mover y dibujar estrellas
  stars.forEach(star => {
    star.update();
    star.show();
  });

  // Dibujar la estrella central y los planetas
  drawSun();
  drawPlanets();

  // Asegúrate de dibujar el objeto graphics3D en el lienzo principal
  image(graphics3D, 0, 0);
}


function generatePlanets(numPlanets) {
  let types = ['wavy', 'crystal', 'smooth']; // Tipos de planetas
  for (let i = 0; i < numPlanets; i++) {
    let distance = 150 + i * 150;
    let typeIndex = floor(random(3)); // Elige un tipo al azar
    planets.push(new Planet(distance, types[typeIndex]));
  }
}

function drawSun() {
  graphics3D.push();
  graphics3D.noStroke();
  graphics3D.fill(230);
  graphics3D.translate(0, 0, 100); // Ajusta según la posición del sol en tu escena

  // Configura el material emisivo para el sol para que brille
  graphics3D.emissiveMaterial(255, 204, 0);
  graphics3D.sphere(70); // Ajusta el tamaño según sea necesario

  graphics3D.pop();
}


function drawPlanets() {
  planets.forEach(planet => {
    planet.update();
    planet.show();
  });
}
class Planet {
  constructor(distance, type) {
    this.distance = distance;
    this.type = type; // Nuevo atributo para el tipo de planeta
    this.radius = random(20, 50);
    this.angle = random(TWO_PI);
    this.orbitSpeed = random(0.005, 0.015);
    this.color = [random(255), random(255), random(255)];
    this.rings = random(1) > 0.7;
    this.ringSize = this.radius + random(10, 30);
    this.orbitNormal = p5.Vector.random3D();
  }

  update() {
    this.angle += this.orbitSpeed;
  }

  show() {
    graphics3D.push();
    graphics3D.rotate(this.angle, this.orbitNormal);
    graphics3D.translate(this.distance + 70, 0, 0);
    // Selección del tipo de planeta para dibujar
    switch (this.type) {
      case 'wavy':
        this.drawWavySurface();
        break;
      case 'crystal':
        this.drawCrystalPlanet();
        this.drawRings();
        break;
      case 'smooth':
        this.drawSmoothSurface();
        this.drawRings();
        break;
    }
    pop();
  }

  drawWavySurface() {
    let layers = 20; // Número de capas para una mayor complejidad
    let layerRotation = 0; // Inicializar una variable para controlar la rotación de las capas
  
    for (let i = 0; i < layers; i++) {
      graphics3D.push();
      // Añadir una rotación aleatoria adicional para cada capa para dinamismo
      let randomRotationX = random(-PI / 4, PI / 4) + sin(frameCount * 0.01 + i) * 0.2;
      let randomRotationY = random(-PI / 4, PI / 4) + cos(frameCount * 0.01 + i) * 0.2;
      graphics3D.rotateX(randomRotationX);
      graphics3D.rotateY(randomRotationY + layerRotation);
  
      // Gradiente de color y transparencia para efecto atmosférico
      let alpha = map(i, 0, layers, 255, 50); // De más opaco a más transparente
      let colorHue = map(i, 0, layers, 200, 280); // Cambio de color
      graphics3D.stroke(colorHue, 200, 255, alpha);
      graphics3D.strokeWeight(2);
  
      // Crear aros con formas más aleatorias y ondulaciones
      let currentRadius = this.radius * 1.5 + random(-5, 5); // Radio base con variación aleatoria
      let ellipseWidth = currentRadius * 2 + random(-10, 10); // Variabilidad en el ancho
      let ellipseHeight = currentRadius * 0.5 + random(-5, 5); // Variabilidad en la altura
      
      graphics3D.ellipse(0, 0, ellipseWidth, ellipseHeight); // Dibujar elipse con dimensiones variables
      graphics3D.pop();
  
      // Añadir una rotación gradual a las capas para animación
      layerRotation += 0.005;
    }
  }
  
  drawCrystalPlanet() {
    // Dibujar planeta central
    graphics3D.push();
    graphics3D.fill(120, 50, 240);
    graphics3D.noStroke();
    graphics3D.sphere(planetRadius);
    graphics3D.pop();

    // Dibujar anillos de luz giratorios
    graphics3D.stroke(255, 204, 0); // Color de los anillos
    graphics3D.noFill();
    graphics3D.strokeWeight(2); // Grosor de los anillos

    for (let i = 0; i < numRings; i++) {
      graphics3D.push();
      graphics3D.rotateX(frameCount * 0.01 + i * 0.1); // Rotación en X para inclinación
      graphics3D.rotateY(frameCount * 0.02 + i * 0.1); // Rotación en Y para animación de giro
      graphics3D.ellipse(0, 0, ringDistances[i] * 2, ringDistances[i] / 3); // Dibujar anillo elíptico
      graphics3D.pop();
    }
  }
  

  drawSmoothSurface() {
    graphics3D.push();
    graphics3D.noStroke();
    graphics3D.fill(this.color);
    graphics3D.sphere(this.radius);
    pop();
  }
  
  
  
  

  drawRings() {
    if (this.rings) {
      graphics3D.rotateX(PI / 2);
      graphics3D.noFill(); // Para los anillos, quizás prefieras no rellenar
      graphics3D.stroke(255); // Color del anillo
      graphics3D.torus(this.ringSize, 2); // Dibuja el toroide para los anillos
    }
  }
  
}

class BackgroundStar {
  constructor() {
    this.position = createVector(random(width, width * 2), random(height, height * 2), random(height, height * 2));
    this.speed = createVector(0.5, 0); // Velocidad de movimiento de las estrellas
  }

  update() {
    this.position.add(this.speed);
    // Restablecer la posición de la estrella si sale de la vista
    if (this.position.x > width / 2 || this.position.x < -width / 2) {
      this.position.x = random(-width, width);
      this.position.y = random(-height, height);
      this.position.z = random(-500, 500);
    }
  }

  show() {
    graphics3D.push();
    graphics3D.translate(this.position.x * 5, this.position.y * 5, this.position.z * 20);
    graphics3D.fill(255);
    graphics3D.emissiveMaterial(255, 204, 0);
    graphics3D.sphere(random(2, 6)); // Representar la estrella con una pequeña esfera
    graphics3D.pop();
  }
}


// GalaxySimulation
function drawGalaxySimulation() {
  graphics3D.background(0);
  graphics3D.rotateX(frameCount * 0.01);
  graphics3D.rotateY(frameCount * 0.01);
  graphics3D.translate(-width / 2, -height / 2, -200);

  for (let i = 0; i < 1000; i++) {
    const angle = random(TWO_PI);
    const radius = sqrt(random(pow(width / 2, 2)));
    const x = radius * cos(angle);
    const y = radius * sin(angle);
    const size = random(1, 5);
    const hue = random(360);
    graphics3D.fill(hue, 100, 100);
    graphics3D.noStroke();
    graphics3D.push();
    graphics3D.translate(x, y);
    graphics3D.sphere(size);
    graphics3D.pop();
  }
}


// Particles Tunnel
let particlesTunnel = [];
const numParticlesTunnel = 30; // Aumentar para un túnel más denso

function initParticlesTunnel() {
  graphics3D.background(0); // Fondo oscuro para resaltar los cuadrados y las partículas
  for (let i = 0; i < numParticlesTunnel; i++) {
    particlesTunnel.push(new ParticleTunnel());
  }
}

function drawParticlesTunnel() {

  // Iluminación Dinámica y partículas sin cambios
  graphics3D.pointLight(255, 255, 255, mouseX - width / 2, mouseY - height / 2, 500);
  graphics3D.ambientLight(100);

  graphics3D.translate(0, 0, 0); // Centrar el punto de vista en el túnel y evitar que se gire

  for (let i = 0; i < particlesTunnel.length; i++) {
    particlesTunnel[i].update();
    particlesTunnel[i].display();
  }
}

class ParticleTunnel {
  constructor() {
    this.angle = random(TWO_PI);
    this.radius = random(100, 300); // Radio del túnel
    this.speedZ = random(5, 20); // Velocidad hacia el espectador
    this.spiralSpeed = random(0.01, 0.1); // Velocidad de giro en espiral
    this.position = createVector(cos(this.angle) * this.radius, sin(this.angle) * this.radius, random(-2000, 0)); // Posición inicial en el túnel
    this.color = [random(100, 255), random(100, 255), random(100, 255)];
  }

  update() {
    this.position.z += this.speedZ; // Mover hacia el espectador5
    this.angle += this.spiralSpeed; // Actualizar ángulo para girar en espiral
    // Actualizar posición para girar en espiral
    this.position.x = cos(this.angle) * this.radius;
    this.position.y = sin(this.angle) * this.radius;

    // Reiniciar las partículas que llegan demasiado cerca para mantener el flujo continuo
    if (this.position.z > 500) {
      this.angle = random(TWO_PI);
      this.radius = random(100, 300);
      this.position.x = cos(this.angle) * this.radius;
      this.position.y = sin(this.angle) * this.radius;
      this.position.z = random(-2000, -500); // Reiniciar las partículas más atrás en el túnel
    }
  }

  display() {
    graphics3D.push();
    graphics3D.translate(this.position.x, this.position.y, this.position.z);
    graphics3D.fill(this.color);
    graphics3D.sphere(2); // Ajustar para cambiar el tamaño de las partículas
    graphics3D.pop();
  }
}