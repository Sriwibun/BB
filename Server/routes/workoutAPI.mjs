import express from "express";
import pool from "../db.mjs";
import dotenv from "dotenv";

dotenv.config();

const workoutRouter = express.Router();
workoutRouter.use(express.json());

const workoutCache = new Map();

function validateWorkout(req, res, next) {
    const { name, exercises } = req.body;

    if (!name || !exercises || !Array.isArray(exercises) || exercises.length === 0) {
        return res.status(400).json({ error: "Invalid workout data. Name and at least one exercise are required." });
    }

    for (const exercise of exercises) {
        if (!exercise.name || (exercise.sets && isNaN(exercise.sets)) || (exercise.reps && isNaN(exercise.reps))) {
            return res.status(400).json({ error: "Invalid exercise data. Name, sets, and reps must be valid." });
        }
    }

    next();
}

workoutRouter.get("/api/workouts", async (req, res) => {
    try {
        // Check in-memory cache first
        if (workoutCache.has("allWorkouts")) {
            return res.json(workoutCache.get("allWorkouts"));
        }

        // Fetch from database if not cached
        const { rows } = await pool.query("SELECT * FROM workouts");

        // Store in cache
        workoutCache.set("allWorkouts", rows);

        res.json(rows);
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

workoutRouter.get("/api/workouts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Check cache first
        if (workoutCache.has(id)) {
            return res.json(workoutCache.get(id));
        }

        // Fetch from database if not cached
        const { rows } = await pool.query("SELECT * FROM workouts WHERE id = $1", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Workout not found" });
        }

        // Store in cache
        workoutCache.set(id, rows[0]);

        res.json(rows[0]);
    } catch (error) {
        console.error("Error fetching workout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

workoutRouter.post("/api/workouts", validateWorkout, async (req, res) => {
    const { name, exercises } = req.body;

    try {
        const { rows } = await pool.query(
            "INSERT INTO workouts (name, exercises) VALUES ($1, $2) RETURNING *",
            [name, JSON.stringify(exercises)]
        );

        // Clear cache since data is changed
        workoutCache.delete("allWorkouts");

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error adding workout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

workoutRouter.put("/api/workouts/:id", validateWorkout, async (req, res) => {
    const { id } = req.params;
    const { name, exercises } = req.body;

    try {
        const { rowCount } = await pool.query(
            "UPDATE workouts SET name = $1, exercises = $2 WHERE id = $3",
            [name, JSON.stringify(exercises), id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: "Workout not found" });
        }

        // Clear cache since data changed
        workoutCache.delete("allWorkouts");
        workoutCache.delete(id);

        res.json({ message: "Workout updated successfully" });
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

workoutRouter.delete("/api/workouts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const { rowCount } = await pool.query("DELETE FROM workouts WHERE id = $1", [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: "Workout not found" });
        }

        // Clear cache since data changed
        workoutCache.delete("allWorkouts");
        workoutCache.delete(id);

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default workoutRouter;
