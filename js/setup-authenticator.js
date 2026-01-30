// Language button active state
function setLanguage(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    if (typeof event !== 'undefined' && event.target) event.target.classList.add('active');
}

// Copy secret key to clipboard
function copyToClipboard() {
    const secretInput = document.getElementById('secretKey');
    const text = secretInput ? secretInput.value : '';
    const btn = (typeof event !== 'undefined' && event.target) ? event.target.closest('button') : null;
    if (!btn) return;
    const successIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
    const originalHTML = btn.innerHTML;

    function showSuccess() {
        btn.classList.add('copy-success');
        btn.innerHTML = successIcon;
        setTimeout(() => { btn.classList.remove('copy-success'); btn.innerHTML = originalHTML; }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showSuccess).catch(err => { console.error('Failed to copy:', err); alert('Failed to copy to clipboard'); });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text; document.body.appendChild(textarea); textarea.select();
        try { document.execCommand('copy'); showSuccess(); }
        catch (err) { console.error('Fallback copy failed:', err); alert('Failed to copy to clipboard'); }
        document.body.removeChild(textarea);
    }
}

function continueToOTP() { window.location.href = 'verify.html'; }

// Theme utilities
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
function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyThemeFromStorage();
}
window.addEventListener('DOMContentLoaded', applyThemeFromStorage);
window.addEventListener('storage', function(e) { if (e.key === 'theme') applyThemeFromStorage(); });
