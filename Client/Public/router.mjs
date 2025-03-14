async function navigateTo(route) {
    console.log(`Navigating to ${route}`);
    let url = route;
    if (route === '/') {
        url = '/index.html';
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('#content');
        if (content) {
            document.querySelector('#content').innerHTML = content.innerHTML;
        } else {
            document.body.innerHTML = html;
        }
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#content').innerHTML = '<h1>An error occurred</h1>';
    }
}

export { navigateTo };