// script.js
const balls = document.querySelectorAll('.ball');
const dropZone = document.getElementById('drop-zone');

balls.forEach(ball => {
  ball.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('color', ball.dataset.color);
  });
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const color = e.dataTransfer.getData('color');
  if (color) {
    const newBall = document.createElement('div');
    newBall.className = `ball ${color}`;
    newBall.style.marginBottom = '5px';
    dropZone.appendChild(newBall);
  }
});
