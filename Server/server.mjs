import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import log from '../modules/log.mjs';
import workoutRouter from '../routes/workoutAPI.mjs';
import treeRouter from '../routes/treeAPI.mjs';
import pool from './server/db.mjs';

const server = express();
const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.set('port', port);
server.use(express.json());
server.use(log);

server.use(express.static(path.join(__dirname, 'public')));

server.use('/api/workouts', workoutRouter);
server.use('/api/tree', treeRouter);

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Templates', 'home.html'));
});

server.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Templates', 'add.html'));
});

server.get('/remove', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Templates', 'remove.html'));
});

server.get('/layout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Templates', 'layout.html'));
});

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

server.use((req, res) => {
    res.status(404).send("Page not found");
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
