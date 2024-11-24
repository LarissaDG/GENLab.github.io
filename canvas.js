var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

const size = window.innerWidth;
var step = 30;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineCap = 'square';
context.lineWidth = 2;
context.strokeStyle = "#D88A6B"; // Cor da linha

// Variáveis de controle da animação
var lines = [];
var currentLine = 0;

const rectWidth = 300;
const rectHeight = 100;
const rectX = (size / 2) - (rectWidth / 2);
const rectY = (window.innerHeight / 2) - (rectHeight / 2);


// Função para desenhar uma linha
function draw(x, y, width, height) {
  var leftToRight = Math.random() >= 0.5;

  context.beginPath(); // Iniciar o caminho
  if (leftToRight) {
    context.moveTo(x, y);
    context.lineTo(x + width, y + height);
  } else {
    context.moveTo(x + width, y);
    context.lineTo(x, y + height);
  }
  context.stroke();
}

// Função para preparar todas as linhas a serem desenhadas
function prepareLines() {
  for (var x = 0; x < size; x += step) {
    for (var y = 0; y < size; y += step) {
      lines.push([x, y, step, step]); // Armazena cada linha
    }
  }

  // Embaralha o vetor de linhas para desenhá-las de forma aleatória
  shuffleArray(lines);
}

// Função para embaralhar um array de forma aleatória (usando o algoritmo de Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Escolhe um índice aleatório
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
}

// Função de animação que desenha uma linha por vez
function animate() {
  if (currentLine < lines.length) {
    var line = lines[currentLine];
    draw(line[0], line[1], line[2], line[3]); // Desenha a linha
    currentLine++; // Avança para a próxima linha
    setTimeout(animate, 5); // Atraso de 50ms entre cada linha
  }
}

// Preparar as linhas e começar a animação
prepareLines();
animate();
