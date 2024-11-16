function redir(url: string): void {
    window.location.href = url;
}

function enlargeImage(): void {
    const img = document.querySelector('img');
    if (img) {
        if (img.classList.contains('enlarged')) {
            img.classList.remove('enlarged');
            img.classList.remove('glass')
        } else {
            img.classList.add('enlarged');
            img.classList.add('glass');
        }
    }
}