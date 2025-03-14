import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import router from './routes/workoutAPI.mjs';
import pool from './db.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const port = process.env.PORT || 9050;

server.set('port', port);
server.use(express.json());
// server.use(logger);
// server.use(startSession);

server.use(express.static(path.join(__dirname, '../client/public')));


server.use((req, res, next) => {
    if (req.url.endsWith('.mjs')) {
        res.type('text/javascript');
    }
    next();
});

server.use("/api/workouts", router);
// server.use(updateSession);
server.get('/favicon.ico', (req, res) => res.status(204).end());

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('Connected to database');
        release();
    }
});

server.listen(server.get('port'), () => {
    console.log('server running on port:', server.get('port'));
});

export default server;