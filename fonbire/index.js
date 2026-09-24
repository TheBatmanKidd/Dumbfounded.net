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
