let fileSystem = null;
let isInitialized = false;
/**
 * Load the file structure from JSON file
 */
async function loadFileStructure() {
    try {
        const response = await fetch('../dir.jsonc');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fileSystem = await response.json();
        if (!fileSystem || !Array.isArray(fileSystem) || fileSystem.length === 0) {
            throw new Error('Invalid file structure format');
        }
        document.getElementById('loading').style.display = 'none';
        isInitialized = true;
        init(); // Initialize the viewer once data is loaded
    }
    catch (error) {
        console.error('Error loading file structure:', error);
        document.getElementById('loading').innerHTML = `
            <div class="error">
                Error loading file structure: ${error.message}<br>
                Common solutions:<br>
                1. Make sure structure.json exists in the same directory as index.html<br>
                2. Run using a web server (e.g., python -m http.server, liveserver)<br>
                3. Check if structure.json is valid JSON
            </div>`;
    }
}
/**
 * Find directory contents at given path
 */
function findDirectoryContents(path) {
    if (!fileSystem || !isInitialized) {
        console.error('File system not initialized');
        return [];
    }
    if (path === '/' || path === '') {
        return fileSystem[0].contents || [];
    }
    const parts = path.split('/').filter(part => part);
    let current = fileSystem[0];
    for (const part of parts) {
        if (!current.contents)
            return [];
        const found = current.contents.find(item => item.name === part);
        if (!found || !found.isdir)
            return [];
        current = found;
    }
    return current.contents || [];
}
/**
 * get current path from the URL hash
 */
function getCurrentPath() {
    return window.location.hash.slice(1) || '/';
}
/**
 * generate breadcrumb navigation
 */
function generateBreadcrumb(path) {
    const parts = path.split('/').filter(part => part);
    let breadcrumb = '<a href="#/">home</a>';
    let currentPath = '';
    parts.forEach(part => {
        currentPath += '/' + part;
        breadcrumb += ` / <a href="#${currentPath}">${decodeURIComponent(part)}</a>`;
    });
    document.getElementById('breadcrumb').innerHTML = breadcrumb;
}
/**
 * display content of current dir
 */
function displayDirectory(path) {
    if (!isInitialized) {
        console.warn('Directory viewer not yet initialized');
        return;
    }
    let baseDir = '/wiki/ru';
    if (document.body.classList.contains('en')) {
        baseDir = '/wiki/en';
    }
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    if (path !== '/') {
        const parentPath = path.split('/').slice(0, -1).join('/');
        fileList.innerHTML += `
            <li class="file-item">
                <a href="#${parentPath}">
                    <span class="file-icon">📁</span>..
                </a>
            </li>
        `;
    }
    const files = findDirectoryContents(path);
    if (!files || files.length === 0) {
        fileList.innerHTML += '<li class="file-item">No files found in this directory</li>';
        return;
    }
    files.forEach((file) => {
        const icon = file.isdir ? '📁' : '📄';
        const link = file.isdir ?
            `#${path}${path.endsWith('/') ? '' : '/'}${file.name}` :
            `${baseDir}${path}${path.endsWith('/') ? '' : '/'}${file.name}`;
        fileList.innerHTML += `
            <li class="file-item">
                <a href="${file.isdir ? link : link}">
                    <span class="file-icon">${icon}</span>${file.name}
                </a>
            </li>
        `;
    });
}
/**
 * inits or updates dir viewer
 */
function init() {
    const currentPath = getCurrentPath();
    generateBreadcrumb(currentPath);
    displayDirectory(currentPath);
}
// listen for changes in the url hash
window.addEventListener('hashchange', () => {
    if (isInitialized) {
        init();
    }
});
// Start loading the file structure
loadFileStructure();
