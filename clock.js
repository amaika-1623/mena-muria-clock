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
function drawHand(angle, length, width) {
    ctx.save();
    ctx.rotate(angle);

    // Klassieke slanke wijzer (stijl B)
    ctx.beginPath();
    ctx.moveTo(-width * 0.30, 0);          // smallere basis
    ctx.lineTo(width * 0.30, 0);
    ctx.lineTo(width * 0.18, -length * 0.55);
    ctx.lineTo(0, -length);                // lange elegante punt
    ctx.lineTo(-width * 0.18, -length * 0.55);
    ctx.closePath();

    // Goud-gradient (rijk maar subtieler dan de brede versie)
    const gradient = ctx.createLinearGradient(0, 0, 0, -length);
    gradient.addColorStop(0, "#8a6a1f");   // warm oud goud
    gradient.addColorStop(0.35, "#cfa93e");
    gradient.addColorStop(0.65, "#f5d97c");
    gradient.addColorStop(1, "#fff4c2");

    ctx.fillStyle = gradient;

    // Gouden omlijning
    ctx.strokeStyle = "#f5e3a1";
    ctx.lineWidth = 1.8;

    // Schaduw
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 10;

    ctx.fill();
    ctx.stroke();

    // Glanslaag (3D highlight)
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(-width * 0.18, -length * 0.20);
    ctx.lineTo(width * 0.18, -length * 0.20);
    ctx.lineTo(width * 0.08, -length * 0.60);
    ctx.lineTo(-width * 0.08, -length * 0.60);
    ctx.closePath();

    const shine = ctx.createLinearGradient(0, -length * 0.20, 0, -length * 0.60);
    shine.addColorStop(0, "rgba(255,255,255,0.9)");
    shine.addColorStop(1, "rgba(255,255,255,0.0)");

    ctx.fillStyle = shine;
    ctx.fill();
    ctx.restore();

    ctx.restore();
}

// Start alles
updateDigitalClock();
setInterval(updateDigitalClock, 1000);
requestAnimationFrame(drawClock);
