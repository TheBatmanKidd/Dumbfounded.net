if (currentUrl.pathname === '/home') {
    currentUrl.search = '';
    window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
} else {
    window.location.href = 'https://www.dumbfounded.net';
}
