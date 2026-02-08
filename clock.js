
function updateClock() {
    const now = new Date();

    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    document.getElementById("digitalClock").textContent = `${h}:${m}:${s}`;

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById("dateDisplay").textContent = now.toLocaleDateString('nl-NL', options);

    const secDeg = now.getSeconds() * 6;
    const minDeg = now.getMinutes() * 6 + now.getSeconds() * 0.1;
    const hourDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

    document.getElementById("secondHand").style.transform = `rotate(${secDeg}deg)`;
    document.getElementById("minuteHand").style.transform = `rotate(${minDeg}deg)`;
    document.getElementById("hourHand").style.transform = `rotate(${hourDeg}deg)`;
}
// Optional: ceremonial sound
const audio = new Audio('assets/tifa.mp3');
window.addEventListener('load', () => {
  audio.play().catch(() => {
    console.log("Autoplay blocked");
  });
});

// Optional soft gong intro
const gong = new Audio('assets/gong.mp3');

window.addEventListener('load', () => {
  gong.volume = 0.6; // gentle
  gong.play().catch(() => {
    console.log("Autoplay blocked");
  });
});


setInterval(updateClock, 1000);
updateClock();