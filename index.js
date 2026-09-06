const currentUrl = new URL(window.location.href);
const urlParams = currentUrl.searchParams;

if (urlParams.get('utm_source') === 'chatgpt.com') {
    document.title = "Dumbfounded™ - ChatGPT, Really?";
}

if (currentUrl.pathname === '/' || currentUrl.pathname === '') {
    currentUrl.pathname = '/sub';
}

currentUrl.search = '';

window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
