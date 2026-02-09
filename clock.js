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
function drawHand(angle, length, width, color) {
    ctx.save();
    ctx.rotate(angle);

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";

    // Schaduw voor antiek effect
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    ctx.restore();
}

function drawClock() {
    const now = new Date();
    const w = canvas.width;
    const h = canvas.height;
    const radius = Math.min(w, h) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2);

    // Tijd
    let hour = now.getHours() % 12;
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Hoeken
    let hourAngle = (Math.PI / 6) * hour + (Math.PI / 360) * minute;
    let minuteAngle = (Math.PI / 30) * minute + (Math.PI / 1800) * second;
    let secondAngle = (Math.PI / 30) * second;

    // Antieke gouden uurwijzer
    drawHand(hourAngle, radius * 0.45, radius * 0.07, "#d4af37");

    // Antieke gouden minuutwijzer
    drawHand(minuteAngle, radius * 0.70, radius * 0.05, "#d4af37");

    // Rode secondewijzer
    drawHand(secondAngle, radius * 0.80, radius * 0.02, "red");

    ctx.restore();
}

// Digitale tijd
function updateDigitalTime() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("digitalTime").textContent = `${hh}:${mm}:${ss}`;
}

setInterval(drawClock, 1000);
setInterval(updateDigitalTime, 1000);

drawClock();
updateDigitalTime();
