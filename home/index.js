const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('utm_source') === 'chatgpt.com') {
    
    document.title = "Dumbfounded™ - ChatGPT, Really?";
    
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
}
