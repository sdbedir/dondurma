const dropZone = document.getElementById("drop-zone");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

const selectableItems = document.querySelectorAll(".ball, .topping");

let selectedItem = null;
let ballCount = 0;
let toppingCount = 0;

const maxBalls = 4;
const maxToppings = 12;

selectableItems.forEach((item) => {
  item.addEventListener("dragstart", handleDragStart);

  item.addEventListener("click", () => {
    selectItem(item);
  });

  item.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      selectItem(item);
    },
    { passive: false }
  );
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();

  const rawData = event.dataTransfer.getData("text/plain");

  if (!rawData) {
    return;
  }

  const data = JSON.parse(rawData);
  addItemToIceCream(data);
});

dropZone.addEventListener("click", () => {
  addSelectedItem();
});

dropZone.addEventListener(
  "touchend",
  (event) => {
    event.preventDefault();
    addSelectedItem();
  },
  { passive: false }
);

resetBtn.addEventListener("click", resetGame);

function handleDragStart(event) {
  const data = getItemData(event.currentTarget);
  event.dataTransfer.setData("text/plain", JSON.stringify(data));
}

function getItemData(item) {
  return {
    type: item.dataset.type,
    color: item.dataset.color
  };
}

function selectItem(item) {
  clearSelection();

  selectedItem = item;
  item.classList.add("selected");

  if (item.dataset.type === "ball") {
    message.textContent = "Dondurma topu seçildi. Şimdi dondurma alanına dokun.";
  } else {
    message.textContent = "Süs seçildi. Şimdi dondurma alanına dokun.";
  }
}

function clearSelection() {
  selectableItems.forEach((item) => {
    item.classList.remove("selected");
  });

  selectedItem = null;
}

function addSelectedItem() {
  if (!selectedItem) {
    message.textContent = "Önce soldan bir top ya da süs seçmelisin.";
    return;
  }

  const data = getItemData(selectedItem);
  addItemToIceCream(data);
  clearSelection();
}

function addItemToIceCream(data) {
  if (data.type === "ball") {
    addBall(data.color);
  }

  if (data.type === "topping") {
    addTopping(data.color);
  }
}

function addBall(color) {
  if (ballCount >= maxBalls) {
    message.textContent = "En fazla 4 dondurma topu ekleyebilirsin.";
    return;
  }

  const ball = document.createElement("div");
  ball.className = `ice-ball ${color}`;

  const bottomPosition = ballCount * 58;
  ball.style.bottom = `${bottomPosition}px`;

  dropZone.appendChild(ball);

  ballCount++;

  if (ballCount === 1) {
    message.textContent = "1. dondurma topu eklendi.";
  } else if (ballCount < 3) {
    message.textContent = `${ballCount}. dondurma topu eklendi. Biraz daha ekleyebilirsin.`;
  } else {
    message.textContent = "Harika! Dondurman oluştu. İstersen süs ekleyebilirsin.";
  }
}

function addTopping(color) {
  if (ballCount === 0) {
    message.textContent = "Önce dondurma topu eklemelisin.";
    return;
  }

  if (toppingCount >= maxToppings) {
    message.textContent = "Yeterince süs ekledin.";
    return;
  }

  const topping = document.createElement("div");
  topping.className = `ice-topping ${color}`;

  const positions = [
    { left: 88, top: 205 },
    { left: 130, top: 198 },
    { left: 108, top: 170 },
    { left: 82, top: 145 },
    { left: 138, top: 143 },
    { left: 112, top: 118 },
    { left: 90, top: 92 },
    { left: 133, top: 90 },
    { left: 112, top: 62 },
    { left: 98, top: 232 },
    { left: 126, top: 228 },
    { left: 112, top: 145 }
  ];

  const position = positions[toppingCount];

  topping.style.left = `${position.left}px`;
  topping.style.top = `${position.top}px`;

  dropZone.appendChild(topping);

  toppingCount++;
  message.textContent = "Süs eklendi.";
}

function resetGame() {
  dropZone.innerHTML = "";
  ballCount = 0;
  toppingCount = 0;
  clearSelection();
  message.textContent = "Oyun yeniden başladı. Bir top seçerek devam edebilirsin.";
}
