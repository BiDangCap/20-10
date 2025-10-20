// --- Cấu hình canvas ---
const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Hàm tạo điểm hình trái tim ---
function drawHeart(i) {
  const x = 16 * Math.pow(Math.sin(i), 3);
  const y = 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i);
  return { x, y };
}

// --- Tạo sao rơi ---
let stars = [];
for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 2 + 0.5
  });
}

// --- Vẽ tim ---
let progress = 0; // góc hiện tại
function animateHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 - 50;

  // Vẽ sao rơi
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
  });

  // Vẽ trái tim dần dần
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  for (let i = 0; i < progress; i += 0.05) {
    const p = drawHeart(i);
    ctx.lineTo(centerX + p.x * 15, centerY - p.y * 15);
  }
  ctx.stroke();

  // Tăng góc để tim dần hoàn thiện
  if (progress < Math.PI * 2) {
    progress += 0.05;
  } else {
    progress = 0; // reset để vẽ lại liên tục
  }

  requestAnimationFrame(animateHeart);
}

animateHeart();

// --- Cập nhật kích thước khi thay đổi ---
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
