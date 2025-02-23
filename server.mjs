import express from 'express';
import HTTP_CODES from './utils/httpCodes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import cardRouter from './CardRoute.mjs';
import log from './modules/log.mjs';
import abTestRouter from './modules/AB_testing.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8000;

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json()); 
server.use(abTestRouter);
server.use(cardRouter);
server.use(log);


// Function to send a default "Hello World" response
function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

// Poem endpoint
server.get('/tmp/poem', (req, res) => {
    res.status(HTTP_CODES.SUCCESS.OK).send(`
        Roser er røde,<br>
        fioler er blå,<br>
        jeg er på ferie,<br>
        det er ikke du...
    `).end();
});

// Quotes endpoint
const quotes = [
    `To be or not to be...`,
    `Don't think, just do it...`,
    `Actions speak louder than speakers.`,
    `You are who you are.`,
    `It is what it is.`,
    `Don't chase, attack.`,
    `People come, clean as you go.`,
    `Take the risk, keep the change.`
];

server.get('/tmp/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.status(HTTP_CODES.SUCCESS.OK).send(randomQuote).end();
});

// Summarizer endpoint
server.get('/tmp/sum/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Invalid numbers').end();
    } else {
        const sum = a + b;
        res.status(HTTP_CODES.SUCCESS.OK).send(`The sum of ${a} + ${b} = ${sum}.`).end();
    }
});

// Default route to serve index.html
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(server.get('port'), () => {
    console.log('Server running on port', server.get('port'));
});
