// --- Configuración y Variables de Estado ---
let numSeeds = 600;
let numPetals = 20;

let currentStem = 0;      // Contador: cuánto ha crecido el tallo
let currentPetal = 0;     // Contador: cuál pétalo estamos dibujando
let currentSeed = 0;      // Contador: cuál semilla estamos dibujando

let stemSpeed = 5;        // Velocidad de crecimiento del tallo
let petalsPerFrame = 2;   
let seedsPerFrame = 8;    

let goldenAngle = 137.5;  
let seedSeparation = 4;   

function setup() {
  let canvas = createCanvas(300, 400); // Hice el lienzo un poco más alto para el tallo
  canvas.parent('girasol-canvas');
  colorMode(HSL, 360, 100, 100, 100);
  angleMode(DEGREES);
  
  background(40, 10, 95); 
  frameRate(60); 
}

function draw() {
  translate(width / 2, height / 2 - 50); // Subimos un poco el centro para que el tallo luzca más

  // --- 0. Fase 0: Dibujar el Tallo Creciendo ---
  let maxStemHeight = height / 2 + 50; // Hasta dónde llega el tallo hacia abajo
  
  if (currentStem < maxStemHeight) {
    stroke(110, 50, 35); // Color verde para el tallo
    strokeWeight(12);    // Grosor del tallo
    strokeCap(ROUND);
    
    // Dibuja una línea desde abajo hacia el centro
    line(0, maxStemHeight, 0, maxStemHeight - currentStem);
    
    currentStem += stemSpeed; // Hacemos que crezca en el siguiente frame
  } 
  
  // --- 1. Fase 1: Dibujar Pétalos Incrementalmente ---
  else if (currentPetal < numPetals) {
    noStroke(); // Quitamos el borde para que los pétalos no tengan línea verde
    let petalsToDrawThisFrame = min(petalsPerFrame, numPetals - currentPetal);
    
    for (let i = 0; i < petalsToDrawThisFrame; i++) {
      push();
      rotate((360 / numPetals) * currentPetal);
      fill(50, 100, 50, 70); 
      ellipse(80, 0, 120, 30); 
      pop();
      currentPetal++; 
    }
  } 
  
  // --- 2. Fase 2: Dibujar Centro de Semillas ---
  else if (currentSeed < numSeeds) {
    noStroke(); 
    let seedsToDrawThisFrame = min(seedsPerFrame, numSeeds - currentSeed);
    
    for (let k = 0; k < seedsToDrawThisFrame; k++) {
      let radius = seedSeparation * sqrt(currentSeed);
      let angle = currentSeed * goldenAngle;

      let x = radius * cos(angle);
      let y = radius * sin(angle);

      let brightness = map(currentSeed, 0, numSeeds, 15, 25);
      fill(35, 70, brightness); 
      
      ellipse(x, y, 5, 5); 
      currentSeed++; 
    }
  } 
  
  // --- 3. Fase 3: Detener ---
  else {
    noLoop(); 
  }
}