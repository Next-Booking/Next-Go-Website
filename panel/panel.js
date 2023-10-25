// Add event listeners to show/hide windows
document.addEventListener('DOMContentLoaded', function() {
    const dashboardOption = document.getElementById('dashboard-option');
    const bookingOption = document.getElementById('booking-option');
    const roomsOption = document.getElementById('rooms-option');
    const servicesRequestOption = document.getElementById('services-request-option');
    
    const dashboardWindow = document.querySelector('.dashboard-window');
    const bookingWindow = document.querySelector('.booking-window');
    const roomsWindow = document.querySelector('.rooms-window');
    const servicesRequestWindow = document.querySelector('.services-request-window');
    
    dashboardOption.addEventListener('click', function() {
      hideAllWindows();
      dashboardWindow.style.display = 'block';
    });
    
    bookingOption.addEventListener('click', function() {
      hideAllWindows();
      bookingWindow.style.display = 'block';
    });
    
    roomsOption.addEventListener('click', function() {
      hideAllWindows();
      roomsWindow.style.display = 'block';
    });
    
    servicesRequestOption.addEventListener('click', function() {
      hideAllWindows();
      servicesRequestWindow.style.display = 'block';
    });
    
    function hideAllWindows() {
      const windows = [dashboardWindow, bookingWindow, roomsWindow, servicesRequestWindow];
      windows.forEach(window => {
        window.style.display = 'none';
      });
    }
  });


   // JavaScript to display current date and time
   function updateClock() {
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.toLocaleTimeString();
    document.getElementById("current-date").textContent = currentDate;
    document.getElementById("current-time").textContent = currentTime;
}
setInterval(updateClock, 1000);
  