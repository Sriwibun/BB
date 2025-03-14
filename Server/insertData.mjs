import pool from './db.mjs';

async function insertData() {
    const query = `
        INSERT INTO workouts (name, duration, category, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = ['Weightlifting', 30, 'Strength', 'A great workout!']; // Example data

    try {
        const result = await pool.query(query, values);
        console.log('Data inserted:', result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        pool.end(); // Close the database connection
    }
}

insertData();