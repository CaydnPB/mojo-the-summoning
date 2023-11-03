const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals')
const { Deck } = require('.')
const { db, DataTypes, Model } = require("../db/config");

// define in global scope
let deck;

// clear db and create new user before tests
beforeEach(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({ name: 'gandalf', xp: 100 })
})

// clear db after tests
afterEach(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id')
  })

  it('has the correct name', async () => {
    expect(deck.name).toEqual('gandalf')
  })

  it('has the correct xp', async () => {
    expect(deck.xp).toEqual(100)
  })

  it('can be updated', async () => {
    const newName = 'gandalf_the_grey'
    await deck.update({ name: newName })
    const updatedDeck = await Deck.findByPk(deck.id)
    expect(updatedDeck.name).toEqual(newName)
  })

  it('can be deleted', async () => {
    const deckId = deck.id
    await deck.destroy()
    const deletedDeck = await Deck.findByPk(deckId)
    expect(deletedDeck).toBeNull()
  })

  it('can be found by name', async () => {
    const foundDeck = await Deck.findOne({ where: { name: 'gandalf' } })
    expect(foundDeck).not.toBeNull()
    expect(foundDeck.name).toEqual('gandalf')
  })
})
