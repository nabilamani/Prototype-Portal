// Language button active state
function setLanguage(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function copyToClipboard() {
    const secretInput = document.getElementById('secretKey');
    const text = secretInput.value;
    const btn = event.target.closest('button');
    if (!btn) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = btn.innerHTML;
            btn.classList.add('copy-success');
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
            setTimeout(() => { btn.classList.remove('copy-success'); btn.innerHTML = originalHTML; }, 2000);
        }).catch(err => { console.error('Failed to copy:', err); alert('Failed to copy to clipboard'); });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text; document.body.appendChild(textarea); textarea.select();
        try {
            document.execCommand('copy');
            const originalHTML = btn.innerHTML; btn.classList.add('copy-success');
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
            setTimeout(() => { btn.classList.remove('copy-success'); btn.innerHTML = originalHTML; }, 2000);
        } catch (err) { console.error('Fallback copy failed:', err); alert('Failed to copy to clipboard'); }
        document.body.removeChild(textarea);
    }
}

function continueToOTP() { window.location.href = 'verify.html'; }

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
function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyThemeFromStorage();
}
window.addEventListener('DOMContentLoaded', applyThemeFromStorage);
window.addEventListener('storage', function (e) { if (e.key === 'theme') applyThemeFromStorage(); });
