// Dark mode utilities
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

function setLanguage(lang) {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Initialize dark mode immediately and on DOMContentLoaded
initializeDarkMode();
window.addEventListener('DOMContentLoaded', initializeDarkMode);
window.addEventListener('storage', function (e) { if (e.key === 'theme') applyThemeFromStorage(); });

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle eye icon
    if (type === 'password') {
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
});

// Generate random captcha
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 7; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Refresh captcha
const refreshCaptcha = document.getElementById('refreshCaptcha');
const captchaText = document.getElementById('captchaText');
const refreshIcon = refreshCaptcha.querySelector('i');

refreshCaptcha.addEventListener('click', function () {
    // Add rotation animation
    refreshIcon.style.animation = 'spin 0.5s linear';

    // Generate new captcha
    const newCaptcha = generateCaptcha();
    captchaText.textContent = newCaptcha;

    // Clear captcha input
    document.getElementById('captchaInput').value = '';

    // Remove animation after completion
    setTimeout(() => {
        refreshIcon.style.animation = '';
    }, 500);
});

// Add spin animation
const style = document.createElement('style');
style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
document.head.appendChild(style);

// Show message function
function showMessage(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const messageIcon = document.getElementById('messageIcon');

    messageText.textContent = message;

    if (type === 'success') {
        messageIcon.innerHTML = '<i class="fas fa-check-circle text-green-500 text-xl"></i>';
    } else if (type === 'error') {
        messageIcon.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 text-xl"></i>';
    } else if (type === 'info') {
        messageIcon.innerHTML = '<i class="fas fa-info-circle text-blue-500 text-xl"></i>';
    }

    messageBox.classList.remove('hidden');
    messageBox.style.animation = 'slideIn 0.3s ease-out';

    // Auto hide after 3 seconds
    setTimeout(() => {
        messageBox.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Add slide animations
const animStyle = document.createElement('style');
animStyle.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
document.head.appendChild(animStyle);

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;
    const currentCaptcha = document.getElementById('captchaText').textContent;

    // Simple validation
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    if (captchaInput.toUpperCase() !== currentCaptcha) {
        showMessage('Invalid captcha. Please try again.', 'error');
        // Refresh captcha on error
        refreshCaptcha.click();
        return;
    }

    // Simulate login process
    showMessage('Logging in...', 'info');

    setTimeout(() => {
        // Simulate successful login
        showMessage('Login successful! Redirecting...', 'success');

        // Redirect to setup-authenticator page
        setTimeout(() => {
            window.location.href = 'setup-authenticator.html';
        }, 1500);
    }, 1000);
});

// Add input animations
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('scale-[1.02]');
    });

    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('scale-[1.02]');
    });
});
