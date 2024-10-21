// Define multipliers for converting income to weekly amounts
const frequencyMultipliers = {
    'weekly': 1,
    'monthly': 1 / 4,    // Approximate 4 weeks in a month
    'yearly': 1 / 52     // Approximate 52 weeks in a year
};

// Function to get the value from an income field and convert it to weekly income
function getIncomeValue(inputId, frequencyId) {
    const incomeValue = parseFloat(document.getElementById(inputId).value) || 0;
    const frequency = document.getElementById(frequencyId).value;
    return incomeValue * frequencyMultipliers[frequency];
}

// Function to calculate total income based on the selected frequency
function calculateIncome() {
    let weeklyTotal = 0;

    // Accumulate total weekly income from all sources
    weeklyTotal += getIncomeValue('earned-income', 'earned-frequency');
    weeklyTotal += getIncomeValue('business-income', 'business-frequency');
    weeklyTotal += getIncomeValue('investment-income', 'investment-frequency');
    weeklyTotal += getIncomeValue('rental-income', 'rental-frequency');
    weeklyTotal += getIncomeValue('royalty-income', 'royalty-frequency');
    weeklyTotal += getIncomeValue('interest-income', 'interest-frequency');

    // Calculate monthly and yearly totals based on weekly total
    const monthlyTotal = weeklyTotal * 4; // Approximate 4 weeks in a month
    const yearlyTotal = weeklyTotal * 52; // Approximate 52 weeks in a year

    // Update the totals in the income summary
    document.getElementById('weekly-total').textContent = weeklyTotal.toFixed(2);
    document.getElementById('monthly-total').textContent = monthlyTotal.toFixed(2);
    document.getElementById('yearly-total').textContent = yearlyTotal.toFixed(2);

    // Store total income values in localStorage
    localStorage.setItem('weeklyIncome', weeklyTotal);
    localStorage.setItem('monthlyIncome', monthlyTotal);
    localStorage.setItem('yearlyIncome', yearlyTotal);

    // Notify the user
    alert('Income calculated and saved successfully!');
}

// Function to reset the form
function resetForm() {
    document.getElementById('income-form').reset();
    document.getElementById('weekly-total').textContent = 0;
    document.getElementById('monthly-total').textContent = 0;
    document.getElementById('yearly-total').textContent = 0;
}

// You can remove the individual income submit listener if it's not needed anymore
// document.getElementById('submit-income').addEventListener('click', function() {
//     // Get income values
//     let salary = document.getElementById('salary').value;
//     let freelance = document.getElementById('freelance').value;

//     // Save the values to localStorage
//     localStorage.setItem('salary', salary);
//     localStorage.setItem('freelance', freelance);

//     // Notify the user
//     alert('Income details saved successfully!');
// });
