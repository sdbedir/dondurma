document.addEventListener("DOMContentLoaded", () => {
  const balls = document.querySelectorAll('.ice-cream-ball');
  const dropArea = document.getElementById('drop-area');

  balls.forEach(ball => {
    ball.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('color', ball.style.backgroundColor);
    });
  });

  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const color = e.dataTransfer.getData('color');
    const newBall = document.createElement('div');
    newBall.className = 'ice-cream-ball';
    newBall.style.backgroundColor = color;
    newBall.style.position = 'absolute';
    newBall.style.bottom = `${dropArea.children.length * 50}px`;
    newBall.style.left = '50%';
    newBall.style.transform = 'translateX(-50%)';
    dropArea.appendChild(newBall);
  });
});
