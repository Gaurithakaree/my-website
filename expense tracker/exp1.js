let expenses = [];

// Toggle dark mode
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelectorAll('.income-section, .expense-section, .budget-section').forEach(section => {
        section.classList.toggle('dark-mode');
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.toggle('dark-mode');
    });
    document.querySelectorAll('#expense-list li').forEach(item => {
        item.classList.toggle('dark-mode');
    });
});

// Add quick expense
function addQuickExpense(name, amount) {
    if (amount === 0) {
        amount = parseFloat(prompt(`Enter amount for ${name}:`));
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
    }

    const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    expenses.push({ name, amount, date });
    updateExpenseList();
}

// Add expense
document.getElementById('add-expense-btn').addEventListener('click', function() {
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;

    if (name === '' || isNaN(amount) || amount <= 0 || date === '') {
        alert('Please enter a valid expense name, amount, and date.');
        return;
    }

    expenses.push({ name, amount, date });
    updateExpenseList();
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = '';
});

// Update the expense list
function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: $${expense.amount.toFixed(2)} (Date: ${expense.date})`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editExpense(index);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeExpense(index);

        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        expenseList.appendChild(li);
    });
}

// Edit an expense
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-date').value = expense.date;

    removeExpense(index);
}

// Remove an expense
function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
}

// Calculate budget and update the chart
document.getElementById('calculate-btn').addEventListener('click', function() {
    const salary = parseFloat(document.getElementById('salary').value) || 0;

    const totalIncome = salary;  // Use the salary directly
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    let savings = totalIncome * 0.1; // 10% savings
    let balance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('savings').textContent = `$${savings.toFixed(2)}`;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;

    updateChart(totalIncome, totalExpenses);
});

// Chart.js configuration
const ctx = document.getElementById('expenseChart').getContext('2d');
const expenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Financial Overview',
            data: [0, 0],
            backgroundColor: [
                'rgba(0, 123, 255, 0.5)',
                'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
                'rgba(0, 123, 255, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Update the chart data
function updateChart(income, expenses) {
    expenseChart.data.datasets[0].data = [income, expenses];
    expenseChart.update();
}

// Retrieve and set salary from localStorage when the page loads
window.onload = function() {
    const storedSalary = localStorage.getItem('weeklyIncome'); // Retrieve stored income
    if (storedSalary) {
        document.getElementById('salary').value = parseFloat(storedSalary).toFixed(2); // Set the salary input field
    }
};
