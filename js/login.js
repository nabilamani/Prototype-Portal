// Dark mode utilities
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
function initializeDarkMode() { applyThemeFromStorage(); }
function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyThemeFromStorage();
}

function setLanguage(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
    if (typeof event !== 'undefined' && event.target) event.target.classList.add('active');
}

// Initialize dark mode and storage sync
initializeDarkMode();
window.addEventListener('DOMContentLoaded', initializeDarkMode);
window.addEventListener('storage', function(e) { if (e.key === 'theme') applyThemeFromStorage(); });

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
if (togglePassword && passwordInput && eyeIcon) {
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        if (type === 'password') { eyeIcon.classList.remove('fa-eye-slash'); eyeIcon.classList.add('fa-eye'); }
        else { eyeIcon.classList.remove('fa-eye'); eyeIcon.classList.add('fa-eye-slash'); }
    });
}

// Captcha helpers
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 7; i++) captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    return captcha;
}

const refreshCaptcha = document.getElementById('refreshCaptcha');
const captchaText = document.getElementById('captchaText');
if (refreshCaptcha && captchaText) {
    const refreshIcon = refreshCaptcha.querySelector('i');
    refreshCaptcha.addEventListener('click', function () {
        if (refreshIcon) refreshIcon.style.animation = 'spin 0.5s linear';
        const newCaptcha = generateCaptcha();
        captchaText.textContent = newCaptcha;
        const input = document.getElementById('captchaInput'); if (input) input.value = '';
        setTimeout(() => { if (refreshIcon) refreshIcon.style.animation = ''; }, 500);
    });
}

// Add spin animation
(function addSpinAnimation(){
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }';
    document.head.appendChild(style);
})();

// Toast message
function showMessage(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const messageIcon = document.getElementById('messageIcon');
    if (!messageBox || !messageText || !messageIcon) return;

    messageText.textContent = message;
    if (type === 'success') messageIcon.innerHTML = '<i class="fas fa-check-circle text-green-500 text-xl"></i>';
    else if (type === 'error') messageIcon.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 text-xl"></i>';
    else if (type === 'info') messageIcon.innerHTML = '<i class="fas fa-info-circle text-blue-500 text-xl"></i>';

    messageBox.classList.remove('hidden');
    messageBox.style.animation = 'slideIn 0.3s ease-out';
    setTimeout(() => { messageBox.style.animation = 'slideOut 0.3s ease-out'; setTimeout(() => { messageBox.classList.add('hidden'); }, 300); }, 3000);
}

// Slide animations
(function addSlideAnimations(){
    const animStyle = document.createElement('style');
    animStyle.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0;} to { transform: translateX(0); opacity: 1;} } @keyframes slideOut { from { transform: translateX(0); opacity: 1;} to { transform: translateX(100%); opacity: 0;} }';
    document.head.appendChild(animStyle);
})();

// Form submit handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const captchaInput = document.getElementById('captchaInput').value;
        const currentCaptcha = document.getElementById('captchaText').textContent;
        if (!username || !password) { showMessage('Please fill in all fields', 'error'); return; }
        if (captchaInput.toUpperCase() !== currentCaptcha) { showMessage('Invalid captcha. Please try again.', 'error'); if (refreshCaptcha) refreshCaptcha.click(); return; }
        showMessage('Logging in...', 'info');
        setTimeout(() => {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => { window.location.href = 'setup-authenticator.html'; }, 1500);
        }, 1000);
    });
}

// Input focus animations
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function () { this.parentElement.classList.add('scale-[1.02]'); });
    input.addEventListener('blur', function () { this.parentElement.classList.remove('scale-[1.02]'); });
});
