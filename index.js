const currentUrl = new URL(window.location.href);
const urlParams = currentUrl.searchParams;

if (urlParams.get('utm_source') === 'chatgpt.com') {
    document.title = "Dumbfounded™ - ChatGPT, Really?";
}

const isBaseDomain = currentUrl.hostname === 'dumbfounded.net' || currentUrl.hostname === 'www.dumbfounded.net';

if (isBaseDomain && currentUrl.pathname !== '/home') {
    currentUrl.pathname = '/home';
}

currentUrl.search = '';

window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
