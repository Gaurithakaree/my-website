const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const transactions = []; // To store transactions

function generateCalendar(month, year) {
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;

    let date = 1;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.innerHTML = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.innerHTML = date;

                // Check if the date has a transaction
                const transaction = transactions.find(trans => new Date(trans.date).getDate() === date && new Date(trans.date).getMonth() === month && new Date(trans.date).getFullYear() === year);

                if (transaction) {
                    let transLabel = document.createElement('span');
                    transLabel.classList.add('transaction');
                    transLabel.textContent = `${transaction.type}: ${transaction.amount}`;
                    cell.appendChild(transLabel);
                }

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

document.getElementById('prevMonth').addEventListener('click', function () {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('nextMonth').addEventListener('click', function () {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    generateCalendar(currentMonth, currentYear);
});

// Add expense event listener
document.getElementById('addExpense').addEventListener('click', function () {
    const dateInput = document.getElementById('expenseDate').value;
    const amountInput = document.getElementById('expenseAmount').value;

    if (dateInput && amountInput) {
        transactions.push({
            date: dateInput,
            type: 'Expense',
            amount: `${amountInput} BDT`
        });

        // Clear input fields
        document.getElementById('expenseDate').value = '';
        document.getElementById('expenseAmount').value = '';

        generateCalendar(currentMonth, currentYear); // Refresh the calendar
    } else {
        alert('Please enter a valid date and amount.');
    }
});

// Initialize the calendar with current month and year
generateCalendar(currentMonth, currentYear);
