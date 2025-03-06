import express from 'express';

const workoutRouter = express.Router();
workoutRouter.use(express.json());

let workouts = [];

workoutRouter.get('/', (req, res) => {
    res.json(workouts);
});  

workoutRouter.post('/', (req, res) => {
    const { name, exercises } = req.body;
    if (!name || !exercises) {
        return res.status(400).send('Name and exercises are required')};

    const newWorkout = { id: Date.now().toString(), name, exercises };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
    
});

workoutRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    workouts = workouts.filter(workout => workout.id !== parseInt(id));
    res.status(204).send();
});

export default workoutRouter;