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

    // Antieke vorm: brede basis → smalle punt
    ctx.beginPath();
    ctx.moveTo(-width * 0.4, 0);               // linker basis
    ctx.lineTo(width * 0.4, 0);                // rechter basis
    ctx.lineTo(width * 0.2, -length * 0.7);    // rechter midden
    ctx.lineTo(0, -length);                    // punt
    ctx.lineTo(-width * 0.2, -length * 0.7);   // linker midden
    ctx.closePath();

    // Gouden antieke stijl
    const gradient = ctx.createLinearGradient(0, 0, 0, -length);
    gradient.addColorStop(0, "#b38b2a");
    gradient.addColorStop(0.5, "#d4af37");
    gradient.addColorStop(1, "#f7e7a1");

    ctx.fillStyle = gradient;

    // Schaduw
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 10;

    ctx.fill();
    ctx.restore
