const currentUrl = new URL(window.location.href);

if (currentUrl.pathname === '/home') {
    currentUrl.search = '';
    window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
} else {
    window.location.href = 'https://dumbfounded.net';
}
