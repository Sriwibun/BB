
async function fetchData(url, options = {}) {
    try {
      const response = await fetch(url, options);
      if (response.status === 204) return null;
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in fetchData:", error);
      throw error;
    }
  }

async function getWorkouts() {
    const response = await fetch("/api/workouts");
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function addWorkout(workoutData) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData)
    };
    return fetchData("/api/workouts", options);
  }
  
async function updateWorkout(workoutId, updatedData) {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    };
    return fetchData(`/api/workouts/${workoutId}`, options);
  }
  
async function deleteWorkout(workoutId) {
    const options = {
      method: "DELETE"
    };
    return fetchData(`/api/workouts/${workoutId}`, options);
  }

const workouts = await res.json();
if (!Array.isArray(workouts)) {
  throw new Error("API did not return an array of workouts.");
}

export default { getWorkouts, addWorkout, updateWorkout, deleteWorkout }; 
