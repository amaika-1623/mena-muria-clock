const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

// Canvas automatisch laten passen op CSS-grootte
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Antieke wijzerstijl
function drawHand(angle, length, width) {
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(-width * 0.4, 0);
    ctx.lineTo(width * 0.4, 0);
    ctx.lineTo(width * 0.2, -length * 0.7);
    ctx.lineTo(0, -length);
    ctx.lineTo(-width * 0.2, -length * 0.7);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, -length);
    gradient.addColorStop(0, "#b38b2a");
    gradient.addColorStop(0.5, "#d4af37");
    gradient.addColorStop(1, "#f7e7a1");

    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 10;

    ctx.fill();
    ctx.restore();
}

// Digitale klok
function updateDigitalClock() {
    const now = new Date();

    let hh = String(now.getHours()).padStart(2, "0");
    let mm = String(now.getMinutes()).padStart(2, "0");
    let ss = String(now.getSeconds()).padStart(2, "0");

    const el = document.getElementById("digitalTime");
const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

// Canvas automatisch laten passen op CSS-grootte
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Antieke wijzerstijl
function drawHand(angle, length, width) {
    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(-width * 0.4, 0);
    ctx.lineTo(width * 0.4, 0);
    ctx.lineTo(width * 0.2, -length * 0.7);
    ctx.lineTo(0, -length);
    ctx.lineTo(-width * 0.2, -length * 0.7);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, -length);
    gradient.addColorStop(0, "#b38b2a");
    gradient.addColorStop(0.5, "#d4af37");
    gradient.addColorStop(1, "#f7e7a1");

    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 10;

    ctx.fill();
    ctx.restore();
}

// Digitale klok
function updateDigitalClock() {
    const now = new Date();

    let hh = String(now.getHours()).padStart(2, "0");
    let mm = String(now.getMinutes()).padStart(2, "0");
    let ss = String(now.getSeconds()).padStart(2, "0");

    const el = document.getElementById("digitalTime");
    if (el) {
        el.textContent = `${hh}:${mm}:${ss}`;
    }
}

// ANALOGE KLOK — DEZE FUNCTIE ONTBRAK
function drawClock() {
    const now = new Date();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    const secAngle = (Math.PI / 30) * sec;
    const minAngle = (Math.PI / 30) * min + (Math.PI / 1800) * sec;
    const hrAngle = (Math.PI / 6) * hr + (Math.PI / 360) * min;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    drawHand(hrAngle, canvas.height * 0.22, 14);
    drawHand(minAngle, canvas.height * 0.32, 10);
    drawHand(secAngle, canvas.height * 0.38, 4);

    ctx.restore();

    requestAnimationFrame(drawClock);
}

// Start alles
updateDigitalClock();
setInterval(updateDigitalClock, 1000);
requestAnimationFrame(drawClock);
