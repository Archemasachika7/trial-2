// Dark/Light Mode Toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  modeToggle.textContent = body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
});

// Particle Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles.push({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      r: randomBetween(0.7, 2.2),
      dx: randomBetween(-0.15, 0.15),
      dy: randomBetween(-0.12, 0.12),
      color: Math.random() > 0.7 ? '#FF8A00' : (Math.random() > 0.5 ? '#C1440E' : '#E0E0E0'),
      alpha: randomBetween(0.25, 0.7)
    });
  }
}
createParticles(window.innerWidth < 700 ? 40 : 90);

window.addEventListener('resize', () => {
  createParticles(window.innerWidth < 700 ? 40 : 90);
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.closePath();

    // Move
    p.x += p.dx;
    p.y += p.dy;

    // Wrap around
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  requestAnimationFrame(drawParticles);
}
drawParticles();
