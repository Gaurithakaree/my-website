document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
});

// Load existing settings from localStorage
function loadSettings() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light', 'dark', 'custom', 'high-contrast');
    document.body.classList.add(theme);
    applyGlobalSettings();
}

// Apply global settings
function applyGlobalSettings() {
    const fontSize = localStorage.getItem('fontSize') || '16px';
    document.body.style.fontSize = fontSize;

    const highContrast = localStorage.getItem('highContrast') === 'true';
    if (highContrast) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
}

// Change theme
function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    document.body.classList.remove('light', 'dark', 'custom', 'high-contrast');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    applyGlobalSettings();
}

// Change font size
function changeFontSize(size) {
    document.body.style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size + 'px');
}

// Toggle high contrast mode
function toggleHighContrast() {
    const checkbox = document.getElementById('high-contrast');
    if (checkbox.checked) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('highContrast', true);
    } else {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('highContrast', false);
    }
}
