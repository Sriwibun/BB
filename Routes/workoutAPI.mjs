import express from 'express';

const workoutRouter = express.Router();
workoutRouter.use(express.json());

let workouts = [
 { 
    name: "Full Body Workout",
    exercises: [
        { name: "Squats", sets: 3, reps: 15 },
        { name: "Pushups", sets: 3, reps: 10 },
        { name: "Situps", sets: 3, reps: 15 },
            ]
        },
        {
            name: "Cardio Workout",
            exercises: [
                { name: "Running", distance: "5km" },
                { name: "Rowing", duration: "30 minutes" },
            ]
        },
        {
            name: "Upper Body Workout",
            exercises: [
                { name: "Bench Press", sets: 3, reps: 10 },
                { name: "Pullups", sets: 3, reps: 8 },
            ]
        }
    ];
workoutRouter.get('/', (req, res) => {
      res.json(workouts);
});  

workoutRouter.post("/api/workouts", (req, res) => {
    const { name, exercises } = req.body;
    if (!name || !exercises) {
        return res.status(400).send("Name and exercises are required");
    }

    const newWorkout = { id: Date.now().toString(), name, exercises };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});


workoutRouter.delete("/api/workouts/:id", (req, res) => {
    const { id } = req.params;
    workouts = workouts.filter(workout => workout.id !== parseInt(id));
    res.status(204).send();
});

export default workoutRouter;