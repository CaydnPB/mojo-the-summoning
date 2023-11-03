const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals')
const { User, Deck, Card, Attack } = require('./index.js')
const { db, DataTypes, Model } = require("../db/config");

describe('User and Deck associations', () => {
    it('User has one Deck', async () => {
        const userWithDeck = await User.create({ username: 'testuser' });
        const deck = await Deck.create({ name: 'Test Deck', UserId: userWithDeck.id });

        const user = await User.findByPk(userWithDeck.id, { include: Deck });
        expect(user.Deck).not.toBeNull();
        expect(user.Deck.name).toEqual('Test Deck');
    });

    it('Each User may create exactly one Deck', async () => {
        const user1 = await User.create({ username: 'user1' });
        const deck1 = await Deck.create({ name: 'Deck 1', UserId: user1.id });

        const user2 = await User.create({ username: 'user2' });
        const deck2 = await Deck.create({ name: 'Deck 2', UserId: user2.id });

        const decksOfUser1 = await Deck.findAll({ where: { UserId: user1.id } });
        const decksOfUser2 = await Deck.findAll({ where: { UserId: user2.id } });

        expect(decksOfUser1).toHaveLength(1);
        expect(decksOfUser2).toHaveLength(1);
    });
});
describe('Deck and Card associations', () => {
    it('Each Deck may contain many Cards', async () => {
        const deck = await Deck.create({ name: 'Deck with Cards' });
        await Card.create({ name: 'Card 1', DeckId: deck.id });
        await Card.create({ name: 'Card 2', DeckId: deck.id });

        const cardsInDeck = await deck.getCards();

        expect(cardsInDeck).toHaveLength(2);
    });

    it('Each Card may only belong to one Deck', async () => {
        const deck1 = await Deck.create({ name: 'Deck 1' });
        const deck2 = await Deck.create({ name: 'Deck 2' });

        const card1 = await Card.create({ name: 'Card 1', DeckId: deck1.id });
        const card2 = await Card.create({ name: 'Card 2', DeckId: deck2.id });

        const card1Deck = await card1.getDeck();
        const card2Deck = await card2.getDeck();

        expect(card1Deck.name).toEqual('Deck 1');
        expect(card2Deck.name).toEqual('Deck 2');
    });
});
describe('Card and Attack associations', () => {
    it('Each Card may have many Attacks', async () => {
        const card = await Card.create({ name: 'Card with Attacks' });
        const attack1 = await Attack.create({ name: 'Attack 1' });
        const attack2 = await Attack.create({ name: 'Attack 2' });

        await card.addAttacks([attack1, attack2]);

        const attacksForCard = await card.getAttacks();

        expect(attacksForCard).toHaveLength(2);
    });

    it('Each Attack may belong to many Cards', async () => {
        const card1 = await Card.create({ name: 'Card 1' });
        const card2 = await Card.create({ name: 'Card 2' });
        const attack = await Attack.create({ name: 'Shared Attack' });

        await attack.addCards([card1, card2]);

        const cardsForAttack = await attack.getCards();

        expect(cardsForAttack).toHaveLength(2);
    });
});

