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
const port = process.env.PORT || 15680;

server.set('port', port);
server.use(express.json());
// server.use(logger);
// server.use(startSession);

server.use(express.static(path.join(__dirname, 'client/public')));


server.use("*.mjs", (req, res, next) => {
   req.type('application/javascript');
    next();
});

server.get('/style.css', (req, res, next) => {
    res.type('text/css');
    next();
});

server.use("/api/workouts", router);

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