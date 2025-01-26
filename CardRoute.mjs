import { Router } from 'express';
import HTTP_CODES from './utils/httpCodes.mjs';

const cardRouter = Router();

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const decks = {};
let deckCounter =1;

// Generate a deck of cards
function generateCardDeck() {
    const deck = {
        hearts: [],
        diamonds: [],
        clubs: [],
        spades: [],
    };
    for (const suit of suits) {
        for (const value of values) {
            deck[suit].push({ suit, value });
        }
    }
    return deck;
}

// Create a new deck
cardRouter.post('/tmp/deck', (req, res) => {
    try {
        const deck_id = `deck_${deckCounter++}`;
        const newDeck = generateCardDeck();
        decks[deck_id] = newDeck;
        res.status(HTTP_CODES.SUCCESS.CREATED).json({ deck_id });
    } catch (error) {
        console.error('Error creating deck:', error);
        res.status(500).json({error: 'Server error', message: error.message });
    }
});

// Get all decks
cardRouter.get('/tmp/deck', (req, res) => {
    res.status(HTTP_CODES.SUCCESS.OK).json(decks);
});

export default cardRouter;
