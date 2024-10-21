document.addEventListener('DOMContentLoaded', () => {
    // Sample budget data (replace this with your actual data)
    const totalIncome = 5000;
    const totalExpenses = 3200;

    // Calculate remaining budget
    const remainingBudget = totalIncome - totalExpenses;

    // Update the UI
    document.getElementById('totalIncome').textContent = `$${totalIncome}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses}`;
    document.getElementById('remainingBudget').textContent = `$${remainingBudget}`;

    // Logout button functionality
    document.getElementById('logoutButton').addEventListener('click', () => {
        // Show logout message
        const summaryMessage = document.getElementById('summaryMessage');
        summaryMessage.textContent = "You have successfully logged out. Thank you!";
        summaryMessage.classList.remove('hidden');

        // Redirect or handle logout logic here
        setTimeout(() => {
            // Redirect to login page or home page
            window.location.href = 'login.html'; // Change this to your login page
        }, 2000); // Redirect after 2 seconds
    });
});
