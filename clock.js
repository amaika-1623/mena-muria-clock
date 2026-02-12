// ===============================
//   MENA MURIA CLOCK SCRIPT
// ===============================

// Update both digital and analog clock every second
function updateClock() {
    const now = new Date();

    // -------------------------------
    // DIGITAL CLOCK
    // -------------------------------
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("digital-time").textContent =
        `${hours}:${minutes}:${seconds}`;

    // -------------------------------
    // ANALOG CLOCK
    // -------------------------------
    const secondDeg = (now.getSeconds() / 60) * 360;
    const minuteDeg = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360;
    const hourDeg = ((now.getHours() % 12 + now.getMinutes() / 60) / 12) * 360;

    document.getElementById("second-hand").style.transform =
        `rotate(${secondDeg}deg)`;
    document.getElementById("minute-hand").style.transform =
        `rotate(${minuteDeg}deg)`;
    document.getElementById("hour-hand").style.transform =
        `rotate(${hourDeg}deg)`;
}

// Run immediately so the clock appears correct on load
updateClock();

// Update every second
setInterval(updateClock, 1000);
