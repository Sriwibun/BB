import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import log from '../modules/log.mjs';
import workoutRouter from '../Routes/workoutAPI.mjs';
import treeRouter from '../Routes/treeaPI.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8000;

server.set('port', port);
server.use(express.json());
server.use(log);
server.use('/tree', treeRouter);
server.use('/workouts', workoutRouter);
server.use(express.static(path.join(__dirname, 'public')));

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

server.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});