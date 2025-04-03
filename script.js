const shapes = document.querySelectorAll('.shape');
let draggedElement = null;
let offsetX = 0, offsetY = 0;

shapes.forEach(shape => {
    shape.addEventListener('mousedown', (e) => {
        startDrag(e.target, e.offsetX, e.offsetY);
    });

    shape.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        startDrag(e.target, touch.clientX - rect.left, touch.clientY - rect.top);
    });
});

document.addEventListener('mousemove', (e) => {
    if (draggedElement) {
        dragElement(e.pageX, e.pageY);
    }
});

document.addEventListener('touchmove', (e) => {
    if (draggedElement) {
        const touch = e.touches[0];
        dragElement(touch.pageX, touch.pageY);
    }
});

document.addEventListener('mouseup', () => {
    endDrag();
    checkPosition();
});

document.addEventListener('touchend', () => {
    endDrag();
    checkPosition();
});

function startDrag(element, x, y) {
    draggedElement = element;
    offsetX = x;
    offsetY = y;
    draggedElement.style.cursor = 'grabbing';
    draggedElement.style.zIndex = parseInt(getComputedStyle(draggedElement).zIndex || 0) + 1;
}

function dragElement(x, y) {
    if (draggedElement) {
        draggedElement.style.left = `${x - offsetX}px`;
        draggedElement.style.top = `${y - offsetY}px`;
    }
}

function endDrag() {
    if (draggedElement) {
        draggedElement.style.cursor = 'grab';
        draggedElement = null;
    }
}

function checkPosition() {
    const cone = document.getElementById('cone');
    const scoop1 = document.getElementById('scoop1');
    const scoop2 = document.getElementById('scoop2');
    const scoop3 = document.getElementById('scoop3');
    const topping = document.getElementById('topping');

    // Check if the scoop is placed correctly
    if (checkOverlap(cone, scoop1)) {
        scoop1.style.top = `${cone.getBoundingClientRect().bottom}px`;
    }
    if (checkOverlap(cone, scoop2)) {
        scoop2.style.top = `${scoop1.getBoundingClientRect().bottom}px`;
    }
    if (checkOverlap(cone, scoop3)) {
        scoop3.style.top = `${scoop2.getBoundingClientRect().bottom}px`;
    }
    if (checkOverlap(cone, topping)) {
        topping.style.top = `${scoop3.getBoundingClientRect().bottom}px`;
    }
}

function checkOverlap(cone, shape) {
    const coneRect = cone.getBoundingClientRect();
    const shapeRect = shape.getBoundingClientRect();
    
    return (
        shapeRect.left < coneRect.right &&
        shapeRect.right > coneRect.left &&
        shapeRect.top < coneRect.bottom &&
        shapeRect.bottom > coneRect.top
    );
}
