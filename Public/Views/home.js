async function loadWorkouts() {
    const workoutList = document.getElementById("workoutList");
    const template = document.getElementById("workoutCardTemplate");

    try  {
        const res = await fetch("/API/workouts");
        const workouts = await res.json();

        if (workouts.length === 0) {
            workoutList.innerHTML = "<p>No workouts found. Start tracking now!</p>";
            return;
        }

        workoutList.innerHTML = "";

        workouts.forEach(workout => {
            const clone = template.content.cloneNode(true);
            clone.queryselector(".workoutName").textContent = workout.name;

            const exerciseList = clone.querySelector(".exerciseList");
            workout.exercises.forEach(exercise => {
                const li = document.createElement("li");
                li.textContent = '$ex.name} - ${ex.sets} x ${ex.reps}';
                exerciseList.appendChild(li);
            });
            workoutList.appendChild(clone);
        });

    } catch (error) {
        workoutList.innerHTML = "<p>Failed to load workouts, please try again...</p>";
        console.log("Fetching workouts failed", error);
    }
}

document.addEventListener("DOMContentLoaded", loadWorkouts);