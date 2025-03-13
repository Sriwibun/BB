import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import log from '../modules/log.mjs';
import workoutRouter from '../server/routes/workoutAPI.mjs';
import treeRouter from '../server/routes/treeAPI.mjs';
// import pool from './db.mjs';

const server = express();
const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.set('port', port);
server.use(express.json());
server.use(log);

server.use(express.static(path.join(__dirname, '../client/public')));

server.use('/api/workouts', workoutRouter);
server.use('/api/tree', treeRouter);

server.get("/test", (req, res) => {
    res.send("server is running");
});
try {
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'home.html'));
});

server.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'add.html'));
});

server.get('/remove', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'remove.html'));
});

server.get('/layout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'layout.html'));
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

} catch (error) {
    console.error("Error starting server:", error);
}
