const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals')
const { Attack } = require('.')
const { db, DataTypes, Model } = require("../db/config");

// define in global scope
let attack;

// clear db and create new user before tests
beforeEach(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ title: 'gandalf', mojoCost: 28, staminaCost: 56 })
})

// clear db after tests
afterEach(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id')
  })

  it('has the correct title', async () => {
    expect(attack.title).toEqual('gandalf')
  })

  it('has the correct mojoCost', async () => {
    expect(attack.mojoCost).toEqual(28)
  })

  it('has the correct staminaCost', async () => {
    expect(attack.staminaCost).toEqual(56)
  })

  it('can be updated', async () => {
    const newTitle = 'gandalf_the_grey'
    await attack.update({ title: newTitle })
    const updatedAttack = await Attack.findByPk(attack.id)
    expect(updatedAttack.title).toEqual(newTitle)
  })

  it('can be deleted', async () => {
    const attackId = attack.id
    await attack.destroy()
    const deletedAttack = await Attack.findByPk(attackId)
    expect(deletedAttack).toBeNull()
  })

  it('can be found by name', async () => {
    const foundAttack = await Attack.findOne({ where: { title: 'gandalf' } })
    expect(foundAttack).not.toBeNull()
    expect(foundAttack.title).toEqual('gandalf')
  })
})
