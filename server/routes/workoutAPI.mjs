import express from 'express';
import pool from '../db.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM workouts');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, duration, category, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO workouts (name, duration, category, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, duration, category, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, duration, category, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO workouts (name, duration, category, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, duration, category, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const workoutId = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM workouts WHERE id = $1', [workoutId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        console.error('Error fetching workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/:id', async (req, res) => {
    const workoutId = parseInt(req.params.id, 10);
    const { name, duration } = req.body;
    try {
        const result = await pool.query(
            'UPDATE workouts SET name = $1, duration = $2 WHERE id = $3 RETURNING *',
            [name, duration, workoutId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const workoutId = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('DELETE FROM workouts WHERE id = $1 RETURNING *', [workoutId]);
        if (result.rows.length > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;