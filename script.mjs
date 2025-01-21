import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}
//Poem
server.get(`/tmp/poem`,(req, res,) => {
    res.status(HTTP_CODES.SUCCESS.OK).send(`
    Roser er røde,<br>
    fioler er er blå,<br>
    jeg er på ferie,<br>
    det er ikke du...`
    ).end();
});

//quotes
const quotes = [
    `To be or not to be...`,
    `Dont think, just do it...`,	
    `Actions speak louder than speaker`,
    `You are who are you.`,
    `It is what is it.`,
    `Dont chase, attack.`,
    `People come, clean as you go.`,
    `Take the risk, keep the change.`
];

server.get('/tmp/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.status(HTTP_CODES.SUCCESS.OK).send(randomQuote).end();
});

//summarizer
server.get('/tmp/sum/:a/:b', (req, res) => {
    const a =parseFloat(req.params.a);
    const b =parseFloat(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send(`Invalid numbers`).end();
    } else {
        const sum = a + b;
    res.status(HTTP_CODES.SUCCESS.OK).send(`Summen av ${a} + ${b} = ${sum}.`).end();
    }
});

server.post(`/temp/deck`, function (req, res) {
    res.send(`POST request to the homepage`)
});

server.get("/", getRoot);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});