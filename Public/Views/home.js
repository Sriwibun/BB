async function loadWorkouts() {
    // Log to verify the script is running
    console.log("loadWorkouts is running...");

    const workoutList = document.getElementById("workoutList");
    const template = document.getElementById("workout-card-template");

    // Debug: Check if elements are found
    if (!template) {
        console.error("Template with id 'workout-card-template' not found!");
    }
    if (!workoutList) {
        console.error("Container with id 'workoutList' not found!");
    }
    if (!template || !workoutList) return;

    try {
        console.log("Fetching workouts from API...");
        const res = await fetch("/api/workouts");
        
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const workouts = await res.json();
        console.log("Workouts fetched:", workouts);

        if (workouts.length === 0) {
            workoutList.innerHTML = "<p>No workouts found. Start tracking now!</p>";
            return;
        }

        // Clear container before appending new items
        workoutList.innerHTML = "";

        // Loop through workouts and render them
        workouts.forEach(workout => {
            console.log("Rendering workout:", workout.name);
            const clone = template.content.cloneNode(true);

            // Set workout name
            const workoutNameElem = clone.querySelector(".workout-name");
            if (!workoutNameElem) {
                console.error("Workout name element not found in template.");
            } else {
                workoutNameElem.textContent = workout.name;
            }

            // Get container for exercises
            const exerciseContainer = clone.querySelector(".exercise-container");
            if (!exerciseContainer) {
                console.error("Exercise container not found in template.");
            } else {
                // Loop through each exercise
                workout.exercises.forEach(exercise => {
                    const exerciseHeading = document.createElement("h3");
                    exerciseHeading.textContent = exercise.sets
                        ? `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps`
                        : `${exercise.name} - ${exercise.distance || exercise.duration}`;
                    exerciseContainer.appendChild(exerciseHeading);
                });
            }

            // Append the workout card clone to the container
            workoutList.appendChild(clone);
        });

    } catch (error) {
        workoutList.innerHTML = "<p>Failed to load workouts, please try again...</p>";
        console.error("Fetching workouts failed:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadWorkouts);
