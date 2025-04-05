// script.js
const balls = document.querySelectorAll('.ball');
const toppings = document.querySelectorAll('.topping');
const dropZone = document.getElementById('drop-zone');

balls.forEach(ball => {
  ball.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('type', 'ball');
    e.dataTransfer.setData('color', ball.dataset.color);
  });
});

toppings.forEach(topping => {
  topping.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('type', 'topping');
    e.dataTransfer.setData('topping', topping.dataset.topping);
  });
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  if (type === 'ball') {
    const color = e.dataTransfer.getData('color');
    const newBall = document.createElement('div');
    newBall.className = `ball ${color}`;
    newBall.style.marginBottom = '5px';
    dropZone.appendChild(newBall);
  } else if (type === 'topping') {
    const toppingColor = e.dataTransfer.getData('topping');
    const newTopping = document.createElement('div');
    newTopping.className = `topping ${toppingColor}`;
    newTopping.style.width = '20px';
    newTopping.style.height = '20px';
    newTopping.style.marginTop = '-10px';
    dropZone.appendChild(newTopping);
  }
});
