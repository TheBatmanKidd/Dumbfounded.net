const currentUrl = new URL(window.location.href);
const urlParams = currentUrl.searchParams;

if (urlParams.get('utm_source') === 'chatgpt.com') {
    document.title = "Dumbfounded™ - ChatGPT, Really?";
}

if (currentUrl.hostname === 'www.dumbfounded.net') {
    currentUrl.hostname = 'dumbfounded.net';
}

if (currentUrl.hostname === 'dumbfounded.net' && currentUrl.pathname !== '/home') {
    currentUrl.pathname = '/home';
}

currentUrl.search = '';

window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
