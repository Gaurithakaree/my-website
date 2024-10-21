// Sidebar toggle for mobile
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');

// Event listener to toggle the sidebar
toggleBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Logout functionality
document.querySelector('.logout-button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    alert("Logged out successfully!"); // Show alert for logout
    window.location.href = 'LOGOUT.HTML'; // Redirect to logout page
});

// Modal open/close functionality (if you implement a modal in the future)
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');

// Open modal function (you can call this function when needed)
function openModal() {
    if (modal) {
        modal.style.display = "block"; // Show the modal
    }
}

// Close modal functionality
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none"; // Hide the modal
    });
}

// Close modal if user clicks outside
window.addEventListener('click', function(event) {
    if (modal && event.target === modal) {
        modal.style.display = "none"; // Hide modal on outside click
    }
});
