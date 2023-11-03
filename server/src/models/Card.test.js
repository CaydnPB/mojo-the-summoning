const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals')
const { Card } = require('.')
const { db, DataTypes, Model } = require("../db/config");

// define in global scope
let card;

// clear db and create new user before tests
beforeEach(async () => {
  await db.sync({ force: true })
  card = await Card.create({ name: 'gandalf', mojo: 100, stamina: 50, imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg' })
})

// clear db after tests
afterEach(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id')
  })

  it('has the correct name', async () => {
    expect(card.name).toEqual('gandalf')
  })

  it('has the correct mojo', async () => {
    expect(card.mojo).toEqual(100)
  })

  it('has the correct stamina', async () => {
    expect(card.stamina).toEqual(50)
  })

  it('has the correct imgUrl', async () => {
    expect(card.imgUrl).toEqual('http://localhost:5000/img/arcturus-spellweaver.jpg')
  })

  it('can be updated', async () => {
    const newName = 'gandalf_the_grey'
    await card.update({ name: newName })
    const updatedCard = await Card.findByPk(card.id)
    expect(updatedCard.name).toEqual(newName)
  })

  it('can be deleted', async () => {
    const cardId = card.id
    await card.destroy()
    const deletedCard = await Card.findByPk(cardId)
    expect(deletedCard).toBeNull()
  })

  it('can be found by name', async () => {
    const foundCard = await Card.findOne({ where: { name: 'gandalf' } })
    expect(foundCard).not.toBeNull()
    expect(foundCard.name).toEqual('gandalf')
  })
})
