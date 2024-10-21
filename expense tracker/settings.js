function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    document.body.classList.remove('light', 'dark', 'custom');
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else if (theme === 'custom') {
        // Apply custom styles here if needed
    }
}

function changeFontSize(size) {
    document.getElementById('font-size-label').innerText = size + 'px';
    document.body.style.fontSize = size + 'px';
}

function toggleHighContrast() {
    const checkbox = document.getElementById('high-contrast');
    if (checkbox.checked) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
}

function backupData() {
    alert('Backup feature not implemented yet!');
    // Implement backup logic here
}

function restoreData() {
    alert('Restore feature not implemented yet!');
    // Implement restore logic here
}

function exportData() {
    alert('Export feature not implemented yet!');
    // Implement export logic here
}

function clearHistory() {
    if (confirm('Are you sure you want to clear history?')) {
        alert('History cleared!');
        // Implement clear history logic here
    }
}

function changeDataSharing() {
    const sharingOption = document.getElementById('data-sharing').value;
    alert(`Data sharing set to: ${sharingOption}`);
    // Implement data sharing logic here
}

function changeSecureAccess() {
    const accessOption = document.getElementById('secure-access').value;
    alert(`Secure access set to: ${accessOption}`);
    // Implement secure access logic here
}

function toggleEncryption() {
    const checkbox = document.getElementById('data-encryption');
    alert(`Data encryption set to: ${checkbox.checked ? 'Enabled' : 'Disabled'}`);
    // Implement encryption logic here
}

function changeLanguage() {
    const language = document.getElementById('language-select').value;
    alert(`Language set to: ${language}`);
    // Implement language change logic here
}
// Simulate some initial data for the purpose of this demo
const demoData = {
    transactions: [
        { id: 1, date: '2024-01-01', description: 'Groceries', amount: -50 },
        { id: 2, date: '2024-01-02', description: 'Salary', amount: 1500 },
        { id: 3, date: '2024-01-03', description: 'Utilities', amount: -200 }
    ],
    settings: {
        theme: 'light',
        fontSize: '16px',
        highContrast: false
    }
};

// Save initial demo data to local storage
localStorage.setItem('expenseData', JSON.stringify(demoData));

// Backup Data
function backupData() {
    const data = localStorage.getItem('expenseData');
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'backup.json'; // Name of the backup file
    link.click();
    alert('Data backed up successfully!');
}

// Restore Data
function restoreData() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const restoredData = JSON.parse(e.target.result);
                localStorage.setItem('expenseData', JSON.stringify(restoredData));
                alert('Data restored successfully!');
            } catch (error) {
                alert('Error restoring data. Please ensure the file is valid.');
            }
        };
        reader.readAsText(file);
    };
    fileInput.click();
}

// Export Data
function exportData() {
    const data = localStorage.getItem('expenseData');
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'financial_data.csv'; // Name of the exported file
    link.click();
    alert('Data exported as CSV successfully!');
}

// Clear History
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('expenseData'); // Clear the stored data
        alert('History cleared successfully!');
        // Optionally, you can reset the initial data
        localStorage.setItem('expenseData', JSON.stringify(demoData));
    }
}
