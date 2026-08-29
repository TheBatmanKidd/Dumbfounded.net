document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('utm_source') === 'chatgpt.com') {
        document.title = "Custom ChatGPT Visitor Title";
    }
});
