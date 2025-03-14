import { navigateTo } from './router.mjs';

console.log('app.mjs is loaded successfully');

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
    .then((reg) => {
        console.log('Service worker registered', reg);
    });
}

window.addEventListener("load", async () => {
    const route = window.location.pathname;
    navigateTo(route);
    await fetchAndDisplayWorkouts();

    setInterval(fetchUpdateWorkouts, 30000);
});

async function fetchUpdateWorkouts() {
    try {
        const response = await fetch('/api/workouts', { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to fetch workouts: ${response.status}`);
        }
        const workouts = await response.json();
        displayWorkouts(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error);
        const container = document.getElementById("workouts-container");
        if (container) {
            container.innerHTML = '<h2>Error loading workouts</h2>';
        }
    }
}

function displayWorkouts(workouts) {
    const container = document.getElementById('workouts-container');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    container.innerHTML = '';

    workouts.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.className = 'workout';
        workoutElement.innerHTML = `
            <h2>${workout.name}</h2>
            <p>Duration: ${workout.duration} minutes</p>
            <p>Category: ${workout.category}</p>
            <p>${workout.description}</p>
        `;
        container.appendChild(workoutElement);
    });
}