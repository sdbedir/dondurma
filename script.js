const dropZone = document.getElementById('drop-zone');

document.querySelectorAll('.ball, .topping').forEach(item => {
  item.addEventListener('dragstart', (e) => {
    const type = item.classList.contains('ball') ? 'ball' : 'topping';
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('class', item.className);
  });
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  const className = e.dataTransfer.getData('class');

  const newElement = document.createElement('div');
  newElement.className = className;

  if (type === 'topping') {
    newElement.style.width = '20px';
    newElement.style.height = '20px';
    newElement.style.marginTop = '-10px';
  }

  dropZone.appendChild(newElement);
});
