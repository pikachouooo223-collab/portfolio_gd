/* === Mohammad Faran Portfolio Script === */

// Fade-in animation
document.body.style.opacity = 0;
window.addEventListener("load", () => {
  document.body.style.transition = "opacity 1s ease";
  document.body.style.opacity = 1;
});

// Scroll reveal animation
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
cards.forEach((card) => observer.observe(card));

// Background doodle animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let w, h;
let shapes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createShapes() {
  const icons = ["✏️", "🖌️", "📐", "🎨", "💡", "🧩", "📎"];
  for (let i = 0; i < 25; i++) {
    shapes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      size: 18 + Math.random() * 14,
      symbol: icons[Math.floor(Math.random() * icons.length)],
      opacity: 0.15 + Math.random() * 0.35,
    });
  }
}
createShapes();

// Cursor glow trail
let trail = [];
window.addEventListener("mousemove", (e) => {
  trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
  if (trail.length > 25) trail.shift();
});

function draw() {
  ctx.clearRect(0, 0, w, h);

  // doodles
  ctx.font = "22px 'Poppins'";
  ctx.textAlign = "center";
  shapes.forEach((s) => {
    ctx.globalAlpha = s.opacity;
    ctx.fillText(s.symbol, s.x, s.y);
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > w) s.dx *= -1;
    if (s.y < 0 || s.y > h) s.dy *= -1;
  });

  // glowing cursor trail
  ctx.globalAlpha = 1;
  for (let t of trail) {
    const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 40);
    gradient.addColorStop(0, "rgba(255,255,255," + t.alpha + ")");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(t.x, t.y, 40, 0, Math.PI * 2);
    ctx.fill();
    t.alpha -= 0.04;
  }
  trail = trail.filter((t) => t.alpha > 0);

  requestAnimationFrame(draw);
}
draw();

/* === Popup Overlay for Cards === */
const popupOverlay = document.getElementById("popupOverlay");
const popupImg = document.getElementById("popupImg");
const closeBtn = document.getElementById("closeBtn");

// Open popup on image click
document.querySelectorAll(".preview").forEach((img) => {
  img.addEventListener("click", () => {
    popupImg.src = img.src;
    popupOverlay.style.display = "flex";
    requestAnimationFrame(() => popupOverlay.classList.add("active"));
  });
});

// Close popup when clicking X
closeBtn.addEventListener("click", () => {
  popupOverlay.classList.remove("active");
  setTimeout(() => (popupOverlay.style.display = "none"), 400);
});

// Close popup when clicking outside image
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
    setTimeout(() => (popupOverlay.style.display = "none"), 400);
  }
});
