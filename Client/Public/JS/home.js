import { getWorkouts, addWorkout, updateWorkout, deleteWorkout } from "./apiHandler.mjs";

async function loadWorkouts() {
  const workoutList = document.getElementById("workoutList");
  if (!workoutList) {
    console.error("Container with id 'workoutList' not found!");
    return;
  }
  
  // Display a loading message
  workoutList.innerHTML = "<p>Loading workouts...</p>";

  const template = document.getElementById("workout-card-template");
  if (!template) {
    console.error("Template with id 'workout-card-template' not found!");
    return;
  }

  try {
    console.log("Fetching workouts from API...");
    const workouts = await getWorkouts();
    console.log("Workouts fetched:", workouts);

    if (!Array.isArray(workouts) || workouts.length === 0) {
      workoutList.innerHTML = "<p>No workouts found. Start tracking now!</p>";
      return;
    }

    // Clear container before rendering new items
    workoutList.innerHTML = "";

    // Render each workout
    workouts.forEach(workout => {
      console.log("Rendering workout:", workout.name);
      const clone = template.content.cloneNode(true);
      
      const workoutNameElem = clone.querySelector(".workout-name");
      if (workoutNameElem) {
        workoutNameElem.textContent = workout.name;
      } else {
        console.error("Workout name element not found in template.");
      }
      
      // Optional: render exercises if needed
      const exerciseContainer = clone.querySelector(".exercise-container");
      if (exerciseContainer && workout.exercises) {
        workout.exercises.forEach(exercise => {
          const exerciseHeading = document.createElement("h3");
          exerciseHeading.textContent = exercise.sets
            ? `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps`
            : `${exercise.name} - ${exercise.distance || exercise.duration}`;
          exerciseContainer.appendChild(exerciseHeading);
        });
      }
      
      workoutList.appendChild(clone);
    });

  } catch (error) {
    workoutList.innerHTML = "<p>Failed to load workouts, please try again...</p>";
    console.error("Fetching workouts failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadWorkouts);
