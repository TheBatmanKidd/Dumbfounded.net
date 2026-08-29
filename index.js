// 1. Diagnostic test runs instantly when the script drops
console.log("Dumbfounded Script Connected! Query string is:", window.location.search);

const urlParams = new URLSearchParams(window.location.search);

// 2. Process query variables immediately
if (urlParams.get('utm_source') === 'chatgpt.com') {
    
    // 3. Hijack title text before fonts or styling break execution
    document.title = "Dumbfounded™ - You Really Used ChatGPT...?";
    
    // 4. Force browser pop up
    alert("Seriously?\n\nYou really used ChatGPT to get here...?");
    
    // 5. Clean up address metrics
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
}
