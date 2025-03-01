import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import log from './modules/log.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8000;

server.set('port', port);
server.use(express.static('public'));
server.use(express.json()); 
server.use(log);




// Default route to serve index.html
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(server.get('port'), () => {
    console.log('Server running on port', server.get('port'));
});
