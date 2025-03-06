import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import log from './modules/log.mjs';
import workoutRouter from './Routes/workoutAPI.mjs';
import treeRouter from './Routes/treeaPI.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Server running on port ${port}`));

server.set('port', port);
server.use(express.json()); 
server.use(workoutRouter);
server.use(log);
server.use('/tree', treeRouter);
server.use(express.static('public'));



// Default route to serve index.html
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(server.get('port'), () => {
    console.log('Server running on port', server.get('port'));
});
