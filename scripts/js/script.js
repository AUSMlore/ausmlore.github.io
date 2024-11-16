function redir(url) {
    window.location.href = url;
}
function enlargeImage() {
    const img = document.querySelector('img');
    if (img) {
        if (img.classList.contains('enlarged')) {
            img.classList.remove('enlarged');
            img.classList.remove('glass');
        }
        else {
            img.classList.add('enlarged');
            img.classList.add('glass');
        }
    }
}
