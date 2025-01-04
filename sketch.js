
let symbols = [];
let magicNumberSymbol;
let gameState = "input"; // States: input, magic, result
let animationFrame = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(16);
  resetGame();
}

function draw() {
  background(240);

  if (gameState === "input") {
    drawInstructions();
    drawSymbols();
    drawButton("Magie anzeigen");
  } 
  else if (gameState === "magic") {
    drawMagicAnimation();
  } 
  else if (gameState === "result") {
    drawResult();
    drawButton("Nochmal spielen");
  }
}

// 📚 Anweisungen anzeigen
function drawInstructions() {
  fill(0);
  textSize(20);
  text("Denke an eine zweistellige Zahl!", width / 2, 50);
  text("Addiere die Ziffern und ziehe sie von deiner Zahl ab.", width / 2, 80);
  text("Merke dir das Symbol der erhaltenen Zahl.", width / 2, 110);
  text("Klicke dann auf 'Magie anzeigen'.", width / 2, 140);
}

// 🃏 Symbole anzeigen
function drawSymbols() {
  fill(0);
  textSize(14);
  let cols = floor(width / 100); // Optimiert für größere Bildschirme
  let x = 50;
  let y = 180;
  let spacing = 30;

  for (let i = 0; i < 100; i++) {
    text(`${i}: ${symbols[i]}`, x, y);
    y += spacing;

    if (y > height - 120) {
      y = 180;
      x += 100;
    }
  }
}

// 🖱️ Button anzeigen
function drawButton(label) {
  fill(255);
  rect(width / 2 - 80, height - 80, 160, 50, 10);
  fill(0);
  textSize(18);
  text(label, width / 2, height - 55);
}

// ✨ Magie-Animation anzeigen
function drawMagicAnimation() {
  background(0);
  fill(255);
  textSize(24);
  text("Die Zauberkugel denkt nach...", width / 2, height / 2 - 50);

  // Pulsierender Kreis
  fill(200, 100, 255);
  ellipse(width / 2, height / 2, 120 + sin(animationFrame * 0.1) * 30);

  // Rotierende Punkte
  fill(255);
  for (let i = 0; i < 8; i++) {
    let angle = TWO_PI / 8 * i + animationFrame * 0.2;
    let x = width / 2 + cos(angle) * 80;
    let y = height / 2 + sin(angle) * 80;
    ellipse(x, y, 15);
  }

  animationFrame++;

  // Nach 3 Sekunden zur Ergebnisanzeige wechseln
  if (animationFrame > 180) {
    gameState = "result";
    magicNumberSymbol = symbols[9];
  }
}

// 🪄 Ergebnis anzeigen
function drawResult() {
  fill(0);
  textSize(24);
  text("Dein Symbol ist:", width / 2, height / 2 - 30);
  textSize(50);
  text(magicNumberSymbol, width / 2, height / 2 + 20);
}

// 🖱️ Mausklick-Logik
function mousePressed() {
  if (
    mouseY > height - 80 &&
    mouseY < height - 30 &&
    mouseX > width / 2 - 80 &&
    mouseX < width / 2 + 80
  ) {
    if (gameState === "input") {
      gameState = "magic";
      animationFrame = 0;
    } else if (gameState === "result") {
      resetGame();
    }
  }
}

// 🔄 Spiel zurücksetzen
function resetGame() {
  symbols = [];
  let mysticSymbols = [
    "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️",
    "✡️", "☯️", "🜁", "🜂", "🜃", "🜄"
  ];
  
  let magicSymbol = random(mysticSymbols);

  for (let i = 0; i < 100; i++) {
    if (i % 9 === 0) {
      symbols.push(magicSymbol);
    } else {
      symbols.push(random(mysticSymbols));
    }
  }
  gameState = "input";
}
