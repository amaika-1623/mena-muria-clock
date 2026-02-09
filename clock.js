const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

// Canvas automatisch laten passen op de CSS-grootte
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawClock() {
    const now = new Date();
    const w = canvas.width;
    const h = canvas.height;
    const radius = Math.min(w, h) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2);

    // Uurwijzer
    let hour = now.getHours() % 12;
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let hourAngle = (Math.PI / 6) * hour + (Math.PI / 360) * minute;

    ctx.lineWidth = radius * 0.07;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
        Math.sin(hourAngle) * radius * 0.5,
        -Math.cos(hourAngle) * radius * 0.5
    );
    ctx.stroke();

    // Minuutwijzer
    let minuteAngle = (Math.PI / 30) * minute + (Math.PI / 1800) * second;

    ctx.lineWidth = radius * 0.05;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
        Math.sin(minuteAngle) * radius * 0.75,
        -Math.cos(minuteAngle) * radius * 0.75
    );
    ctx.stroke();

    // Secondewijzer
    let secondAngle = (Math.PI / 30) * second;

    ctx.strokeStyle = "red";
    ctx.lineWidth = radius * 0.02;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
        Math.sin(secondAngle) * radius * 0.85,
        -Math.cos(secondAngle) * radius * 0.85
    );
    ctx.stroke();

    ctx.restore();
}

// Elke seconde opnieuw tekenen
setInterval(drawClock, 1000);
drawClock();
