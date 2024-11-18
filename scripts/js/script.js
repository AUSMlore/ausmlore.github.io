function redir(url) {
    // check if url is "baseurl"
    const basePaths = {
        'base': window.location.origin,
        'ru': window.location.origin + '/ru',
        'en': window.location.origin + '/en'
    };
    const urlParts = url.split('/');
    const basePath = urlParts[0];
    const subPath = urlParts[1];
    if (basePaths[basePath]) {
        url = basePaths[basePath];
        if (subPath) {
            url += '/' + subPath;
        }
    }
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
