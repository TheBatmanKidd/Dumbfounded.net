window.onload = function() {
    console.log("Dumbfounded Script Connected! Query string is:", window.location.search);

    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('utm_source') === 'chatgpt.com') {
        
        document.title = "Dumbfounded™ - You Really Used ChatGPT...?";
        
        alert("Seriously?\n\nYou really used ChatGPT to get here...?");
        
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }
};
