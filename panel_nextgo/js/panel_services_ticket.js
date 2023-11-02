   // JavaScript to display current date and time
   function updateClock() {
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.toLocaleTimeString();
    document.getElementById("current-date").textContent = currentDate;
    document.getElementById("current-time").textContent = currentTime;
}
setInterval(updateClock, 1000);