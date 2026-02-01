// Unified theme bootstrap: apply before paint to html and body to avoid FOUC
(function() {
    const theme = (localStorage.getItem('theme') || 'light');
    const html = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
        html.classList.add('dark-mode-html');
        if (body) body.classList.add('dark-mode');
    } else {
        html.classList.remove('dark-mode-html');
        if (body) body.classList.remove('dark-mode');
    }
})();
