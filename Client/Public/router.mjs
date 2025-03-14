async function navigateTo(route) {
    console.log(`Navigating to ${route}`);
    let url = route;
    if (route === '/') {
        url = '/index.html';
    } else if(route === '/add') {
        url = './template/add.html'; 
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

function addEventListeners() {
    const addWorkoutButton = document.getElementById('addWorkout');
    if (addWorkoutButton) {
        addWorkoutButton.addEventListener('click', () => {
            console.log('Add Workout button clicked');
            navigateTo('/add');
        });
    } else {
        console.log('Add Workout button not found');
    }

    const homeButton = document.getElementById('home');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            console.log('Home button clicked');
            navigateTo('/');
        });
    } else {
        console.log('Home button not found');
    }

    
}

export { navigateTo };