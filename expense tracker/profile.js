// Function to preview the uploaded profile picture
function previewImage(event) {
    const preview = document.getElementById('profile-preview');
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        preview.src = e.target.result;
    }
    
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = ''; // Reset preview if no file is selected
    }
}

// Function to validate the username
function validateUsername() {
    const username = document.getElementById('username').value;
    const feedback = document.getElementById('username-feedback');
    
    // Simple username validation
    if (username.length < 3) {
        feedback.textContent = "Username must be at least 3 characters.";
        feedback.style.color = "red";
    } else {
        feedback.textContent = "";
    }
}

// Function to validate the email
function validateEmail() {
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('email-feedback');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Simple email validation
    if (!emailPattern.test(email)) {
        feedback.textContent = "Please enter a valid email.";
        feedback.style.color = "red";
    } else {
        feedback.textContent = "";
    }
}

// Function to handle the profile update
function updateProfile(event) {
    event.preventDefault();
    const loader = document.getElementById('profile-loader');
    loader.style.display = 'block'; // Show loader

    // Simulating a network request delay
    setTimeout(() => {
        loader.style.display = 'none'; // Hide loader
        document.getElementById('profile-success-popup').style.display = 'block'; // Show success popup
    }, 2000);
}

// Function to cancel the update
function cancelUpdate() {
    document.getElementById('profileForm').reset();
    document.getElementById('profile-preview').src = ''; // Reset profile preview
}

// Function to close the popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}
