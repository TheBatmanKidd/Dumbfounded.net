const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('utm_source') === 'chatgpt.com') {
    document.title = "Dumbfounded™ - You Really Used ChatGPT...?";
    
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);

    alert("Caught Red-Handed!\n\nYou really used ChatGPT to get here...?");
}
