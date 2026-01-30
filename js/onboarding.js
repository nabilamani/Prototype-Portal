// Language toggle
function setLanguage(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Use the actively clicked element from the event
    if (typeof event !== 'undefined' && event.target) {
        event.target.classList.add('active');
    }
}

// THEME: shared utilities
function applyThemeFromStorage() {
    const theme = (localStorage.getItem('theme') || 'light');
    const html = document.documentElement;
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    if (theme === 'dark') {
        html.classList.add('dark-mode-html');
        body.classList.add('dark-mode');
        if (toggle) toggle.classList.add('dark-mode');
    } else {
        html.classList.remove('dark-mode-html');
        body.classList.remove('dark-mode');
        if (toggle) toggle.classList.remove('dark-mode');
    }
}
function initializeDarkMode() {
    applyThemeFromStorage();
}
function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyThemeFromStorage();
}

// Initialize immediately and on DOMContentLoaded; also respond to cross-tab storage changes
initializeDarkMode();
window.addEventListener('DOMContentLoaded', initializeDarkMode);
window.addEventListener('storage', function(e) { if (e.key === 'theme') applyThemeFromStorage(); });

// Log animation timeline
console.log('Page loaded - animations starting in sequence:');
console.log('0.5s: Logo and language selector slide in');
console.log('1.5s: Hero content fades in');
console.log('0s: Gradient blur layer slides up');
