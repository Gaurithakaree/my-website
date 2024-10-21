// Registration Form Validation and Storing User Info
function validateRegisterForm() {
    const fullName = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Full name validation
    if (fullName === "") {
        alert("Full name is required!");
        return false;
    } else if (!nameRegex.test(fullName)) {
        alert("Full name can only contain letters and spaces.");
        return false;
    }

    // Email validation
    if (email === "") {
        alert("Email is required!");
        return false;
    } else if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Password validation
    if (password === "") {
        alert("Password is required!");
        return false;
    } else if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
        return false;
    }

    // Confirm password validation
    if (confirmPassword === "") {
        alert("Please confirm your password.");
        return false;
    } else if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Save user data to localStorage
    const user = {
        fullName: fullName,
        email: email,
        password: password
    };

    localStorage.setItem('registeredUser', JSON.stringify(user));

    alert("Registration successful! You can now log in.");
    return true;
}

// Login Form Validation
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Fetch registered user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (!storedUser) {
        alert("No registered user found. Please register first.");
        return false;
    }

    // Validate email
    if (email === "") {
        alert("Email is required!");
        return false;
    } else if (email !== storedUser.email) {
        alert("No account found with this email.");
        return false;
    }

    // Validate password
    if (password === "") {
        alert("Password is required!");
        return false;
    } else if (password !== storedUser.password) {
        alert("Incorrect password.");
        return false;
    }

    // Successful login
    alert("Login successful! Welcome back, " + storedUser.fullName);

    console.log("redirecting to dash.html");
    window.location.assign('dash.html');

        return true;
}
