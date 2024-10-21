// Debounce function
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Function to check password strength
function checkPasswordStrength() {
    const password = document.getElementById('new-password').value;
    const strengthBar = document.getElementById('password-strength');
    const feedback = document.getElementById('password-feedback');

    strengthBar.innerHTML = ''; // Clear previous strength bars
    feedback.textContent = ''; // Clear previous feedback

    let strength = 0;
    const strengthMeter = {
        weak: 'weak',
        medium: 'medium',
        strong: 'strong'
    };

    if (password.length >= 8) {
        strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
    }

    if (strength === 1) {
        strengthBar.innerHTML += `<div class="${strengthMeter.weak}"></div>`;
        feedback.textContent = "Weak password";
    } else if (strength === 2) {
        strengthBar.innerHTML += `<div class="${strengthMeter.medium}"></div>`;
        feedback.textContent = "Medium password";
    } else if (strength === 3) {
        strengthBar.innerHTML += `<div class="${strengthMeter.strong}"></div>`;
        feedback.textContent = "Strong password";
    } else {
        feedback.textContent = "Password is too short";
    }

    // Check if passwords match
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmFeedback = document.getElementById('confirm-feedback');
    if (confirmPassword && password !== confirmPassword) {
        confirmFeedback.textContent = "Passwords do not match";
        confirmFeedback.style.color = "red";
    } else {
        confirmFeedback.textContent = "";
    }
}

// Function to update password
function updatePassword(event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate current password and new password confirmation
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmFeedback = document.getElementById('confirm-feedback');

    if (newPassword !== confirmPassword) {
        confirmFeedback.textContent = "Passwords do not match";
        confirmFeedback.style.color = "red";
        return false; // Prevent form submission
    }

    // Show loader
    document.getElementById('password-loader').style.display = 'block';

    // Simulating a network request with setTimeout
    setTimeout(() => {
        // Hide loader
        document.getElementById('password-loader').style.display = 'none';

        // Show success popup
        document.getElementById('password-success-popup').style.display = 'block';
    }, 2000); // Simulate a 2-second delay
}

// Function to close the popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('new-password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});
