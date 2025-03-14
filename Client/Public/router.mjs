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
        document.body.innerHTML = html;
    } catch (error) {
        console.error('Error:', error);
        document.body.innerHTML = '<h1>An error occurred</h1>';
    }
}

export { navigateTo };