import express from 'express';
import log from './log.mjs';

const abTestRouter = express.Router();

abTestRouter.use(log);

abTestRouter.get('/tmp/abTest', (req, res) => {
    const testGroup = Math.random() > 0.5 ? 'A' : 'B';
    res.status(200).send(`You are in group ${testGroup}`);
    console.log(`User is in group ${testGroup}`);
});

export default abTestRouter;