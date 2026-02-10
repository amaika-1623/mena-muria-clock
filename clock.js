const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

// Canvas automatisch laten passen op CSS-grootte
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Ceremoniële wijzerstijl (breed, goud, omlijning, glans)
function drawHand(angle, length, width) {
    ctx.save();
    ctx.rotate(angle);

    // Ceremoniële vorm: brede basis → smalle punt
    ctx.beginPath();
    ctx.moveTo(-width * 0.55, 0);
    ctx.lineTo(width * 0.55, 0);
    ctx.lineTo(width * 0.28, -length * 0.72);
    ctx.lineTo(0, -length);
    ctx.lineTo(-width * 0.28, -length * 0.72);
    ctx.closePath();

    // Diepe ceremoniële goud-gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, -length);
    gradient.addColorStop(0, "#7a5a18");   // diep oud goud
    gradient.addColorStop(0.25, "#b88e2f"); // warm goud
    gradient.addColorStop(0.55, "#e8c96a"); // glans
    gradient.addColorStop(1, "#fff7d1");   // highlight

    ctx.fillStyle = gradient;

    // Gouden omlijning
    ctx.strokeStyle = "#f5e3a1";
    ctx.lineWidth = 2.2;

    // Schaduw voor diepte
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 14;

    ctx.fill();
    ctx.stroke();

    // Glanslaag (3D highlight)
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(-width * 0.35, -length * 0.15);
    ctx.lineTo(width * 0.35, -length * 0.15);
    ctx.lineTo(width * 0.15, -length * 0.65);
    ctx.lineTo(-width * 0.15, -length * 0.65);
    ctx.closePath();

    const shine = ctx.createLinearGradient(0, -length * 0.15, 0, -length * 0.65);
    shine.addColorStop(0, "rgba(255,255,255,0.9)");
    shine.addColorStop(1, "rgba(255,255,255,0.0)");

    ctx.fillStyle = shine;
    ctx.fill();
    ctx.restore();

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

// Analoge klok
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

    // Ceremoniële wijzers
    drawHand(hrAngle, canvas.height * 0.22, 22);
    drawHand(minAngle, canvas.height * 0.32, 18);
    drawHand(secAngle, canvas.height * 0.38, 10);

    // Centrale gouden cirkel
    ctx.beginPath();
    ctx.arc(0, 0, canvas.height * 0.03, 0, Math.PI * 2);

    const centerGradient = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, canvas.height * 0.03
    );
    centerGradient.addColorStop(0, "#fff7d1");
    centerGradient.addColorStop(0.5, "#e8c96a");
    centerGradient.addColorStop(1, "#7a5a18");

    ctx.fillStyle = centerGradient;
    ctx.fill();

    ctx.strokeStyle = "#f5e3a1";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(drawClock);
}

// Start alles
updateDigitalClock();
setInterval(updateDigitalClock, 1000);
requestAnimationFrame(drawClock);
