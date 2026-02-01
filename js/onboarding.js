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
            const themeIcon = document.getElementById('themeIcon');
            if (theme === 'dark') {
                html.classList.add('dark-mode-html');
                body.classList.add('dark-mode');
                toggle && toggle.classList.add('dark-mode');
                if (themeIcon) {
                    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#457fb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79"></path></svg>';
                }
            } else {
                html.classList.remove('dark-mode-html');
                body.classList.remove('dark-mode');
                toggle && toggle.classList.remove('dark-mode');
                if (themeIcon) {
                    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#457fb6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M5.22 5.22l1.42 1.42"></path><path d="M17.36 17.36l1.42 1.42"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M5.22 18.78l1.42-1.42"></path><path d="M17.36 6.64l1.42-1.42"></path></svg>';
                }
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
