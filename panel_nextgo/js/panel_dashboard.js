// Function to display current date and time
function updateClock() {
    const now = new Date();
    document.getElementById("current-date").textContent = now.toLocaleDateString();
    document.getElementById("current-time").textContent = now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);


function toggleBookingSection(activeSection) {
    const sections = document.querySelectorAll('.booking-section');
    
    sections.forEach(section => {
        section.style.display = section.id === activeSection ? 'grid' : 'none';
    });
}
toggleBookingSection("apartBooking");

document.getElementById("apartButton").addEventListener("click", () => toggleBookingSection("apartBooking"));
document.getElementById("departButton").addEventListener("click", () => toggleBookingSection("departBooking"));
