const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

// Canvas automatisch laten passen op CSS-grootte
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ANTIEKE WIJZERS + RODE PUNT VOOR SECONDEWIJZER
function drawHand(angle, length, width, isSecond = false) {
    ctx.save();
    ctx.rotate(angle);

    // Antieke vorm: brede basis → sierlijke punt
    ctx.beginPath();
    ctx.moveTo(-width * 0.45, 0);
    ctx.lineTo(width * 0.45, 0);
    ctx.lineTo(width * 0.28, -length * 0.35);
    ctx.lineTo(width * 0.15, -length * 0.65);
    ctx.lineTo(0, -length);
    ctx.lineTo(-width * 0.15, -length * 0.65);
    ctx.lineTo(-width * 0.28, -length * 0.35);
    ctx.closePath();

    // Secondewijzer = rode antieke punt
    if (isSecond) {
        ctx.fillStyle = "#c40000"; // diep rood
        ctx.strokeStyle = "#ffb3b3"; // lichte rode rand
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(0,0,0,0.35)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.stroke();
    } else {
        // Antiek goud
        const gradient = ctx.createLinearGradient(0, 0, 0, -length);
        gradient.addColorStop(0, "#6f5318");
        gradient.addColorStop(0.3, "#b48a2f");
        gradient.addColorStop(0.6, "#e6c56a");
        gradient.addColorStop(1, "#fff2c4");

        ctx.fillStyle = gradient;

        // Gouden rand
        ctx.strokeStyle = "#e8d59a";
        ctx.lineWidth = 2;

        // Schaduw
        ctx.shadowColor = "rgba(0,0,0,0.35)";
        ctx.shadowBlur = 8;

        ctx.fill();
        ctx.stroke();

        // Glanslaag
        ctx.save();
        ctx.globalAlpha = 0.28;
        ctx.beginPath();
        ctx.moveTo(-width * 0.20, -length * 0.20);
        ctx.lineTo(width * 0.20, -length * 0.20);
        ctx.lineTo(width * 0.10, -length * 0.55);
        ctx.lineTo(-width * 0.10, -length * 0.55);
        ctx.closePath();

        const shine = ctx.createLinearGradient(0, -length * 0.20, 0, -length * 0.55);
        shine.addColorStop(0, "rgba(255,255,255,0.8)");
        shine.addColorStop(1, "rgba(255,255,255,0.0)");

        ctx.fillStyle = shine;
        ctx.fill();
        ctx.restore();
    }

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

    // Antieke wijzers
    drawHand(hrAngle, canvas.height * 0.22, 18, false);
    drawHand(minAngle, canvas.height * 0.32, 14, false);
    drawHand(secAngle, canvas.height * 0.38, 6, true); // secondewijzer = rood

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
