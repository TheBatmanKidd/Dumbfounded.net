const currentUrl = new URL(window.location.href);

if (currentUrl.pathname === '/fonbire') {
    currentUrl.search = '';
    window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
} else {
    window.location.href = 'https://dumbfounded.net';
}

document.getElementById('submit').style.display = "none"

function revealStuff(response) {
    if (response.length > 0) {
        document.getElementById('stuff').style.display = 'block';
        document.getElementById('captcha').style.display = 'none';
    }
}

function revealSubmit(response) {
    if (response.length > 0) {
        document.getElementById('submit').style.display = 'block';
        document.getElementById('captcha2').style.display = 'none';
    }
}
