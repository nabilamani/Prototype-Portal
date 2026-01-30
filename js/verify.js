// Language active state
function setLanguage(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    if (typeof event !== 'undefined' && event.target) event.target.classList.add('active');
}

// OTP input constraints
(function setupOtpInput(){
    const input = document.getElementById('otpInput');
    if (!input) return;
    input.addEventListener('input', function(){ this.value = this.value.replace(/[^0-9]/g, ''); });
    input.addEventListener('keypress', function(e){ if (e.key === 'Enter') verifyOTP(); });
})();

function verifyOTP() {
    const otpInput = document.getElementById('otpInput');
    const otp = otpInput ? otpInput.value.trim() : '';
    if (otp.length !== 6) { alert('Please enter a valid 6-digit OTP code'); if (otpInput) otpInput.focus(); return; }
    console.log('OTP entered:', otp);
    alert('OTP verified successfully: ' + otp);
}

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
