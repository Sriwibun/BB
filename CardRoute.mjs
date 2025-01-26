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


// Shuffle a deck endpoint
cardRouter.patch('/tmp/deck/:deck_id/shuffle', (req, res) => {
    const { deck_id } = req.params;
    const deck = decks[deck_id];
    if (deck) {
        shuffleDeck(deck);
        res.status(HTTP_CODES.SUCCESS.OK).json({ message: `Deck ${deck_id} shuffled`, deck });
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: 'Deck not found' });
    }
});

// Function for shuffle the deck
const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

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
