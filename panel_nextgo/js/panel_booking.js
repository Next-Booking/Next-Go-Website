   // JavaScript to display current date and time
   function updateClock() {
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.toLocaleTimeString();
    document.getElementById("current-date").textContent = currentDate;
    document.getElementById("current-time").textContent = currentTime;
}
setInterval(updateClock, 1000);


const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Add a click event listener to each tab button
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove the "active" class from all buttons and content sections
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    tabContents.forEach(content => {
      content.classList.remove('active');
    });

    // Add the "active" class to the clicked button and corresponding content
    button.classList.add('active');
    const tabName = button.textContent.trim();
    const correspondingContent = document.querySelector(`[data-tab="${tabName}"]`);
    if (correspondingContent) {
      correspondingContent.classList.add('active');
    }
  });
});

// Get all subtab buttons and subtab contents
const subtabButtons = document.querySelectorAll('.subtab-button');
const subtabContents = document.querySelectorAll('.subtab-content');

// Add click event listeners to subtab buttons
subtabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the data-tab attribute of the clicked button
        const targetTab = button.getAttribute('data-tab');

        // Hide all subtab contents
        subtabContents.forEach(content => {
            content.style.display = 'none';
        });

        // Show the subtab content corresponding to the clicked button
        const targetContent = document.querySelector(`#subcontent .subtab-content[data-tab="${targetTab}"]`);
        if (targetContent) {
            targetContent.style.display = 'block';
        }

        // Remove the 'active' class from all subtab buttons
        subtabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Add the 'active' class to the clicked button
        button.classList.add('active');
    });
});

