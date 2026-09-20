function revealStuff(response) {
    if (response.length > 0) {
        document.getElementById('stuff').style.display = 'block';
        document.getElementById('captcha').style.display = 'none';
    }
}

if (!navigator.onLine) {
        window.location.href = '/fonbire/offline/';
    }

window.addEventListener('offline', () => {
    window.location.href = '/offline/';
});
