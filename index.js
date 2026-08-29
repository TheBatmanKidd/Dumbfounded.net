document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('utm_source') === 'chatgpt.com') {
        document.title = "Dumbfounded™ - You Really Used ChatGPT...?";
    }
});
