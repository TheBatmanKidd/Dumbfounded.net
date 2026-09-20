function revealStuff(response) {
    if (response.length > 0) {
        document.getElementById('stuff').style.display = 'block';
        document.getElementById('captcha').style.display = 'none';
    }
}
