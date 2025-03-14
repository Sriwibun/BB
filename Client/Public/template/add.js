document.getElementById('add-workout-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const duration = document.getElementById('duration').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const workout = { name, duration, category, description };

    try {
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        });

        if (!response.ok) {
            throw new Error(`Failed to add workout: ${response.status}`);
        }

        alert('Workout added successfully!');
        window.location.href = '/'; // Redirect to home page
    } catch (error) {
        console.error('Error adding workout:', error);
        alert('Error adding workout. Please try again.');
    }
});