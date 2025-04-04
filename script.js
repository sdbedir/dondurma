document.addEventListener("DOMContentLoaded", () => {
  const balls = document.querySelectorAll(".ice-cream-ball");
  const dropArea = document.getElementById("drop-area");

  // Topların sürüklenmesi
  balls.forEach(ball => {
    ball.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("color", ball.classList[1]);
    });
  });

  // Oyun alanına top bırakıldığında
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const colorClass = e.dataTransfer.getData("color");

    const newBall = document.createElement("div");
    newBall.className = `ice-cream-ball ${colorClass}`;
    newBall.style.position = "absolute";
    newBall.style.left = "50%";
    newBall.style.transform = "translateX(-50%)";
    newBall.style.bottom = `${dropArea.children.length * 55}px`;

    dropArea.appendChild(newBall);
  });
});
