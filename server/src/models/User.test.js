const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals')
const { User } = require('.')
const { db, DataTypes, Model } = require("../db/config");

// define in global scope
let user;

// clear db and create new user before tests
beforeEach(async () => {
  await db.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
})

// clear db after tests
afterEach(async () => await db.sync({ force: true }))

describe('User', () => {
  it('has an id', async () => {
    expect(user).toHaveProperty('id')
  })

  it('has the correct username', async () => {
    expect(user.username).toEqual('gandalf')
  })

  it('can be updated', async () => {
    const newUsername = 'gandalf_the_grey'
    await user.update({ username: newUsername })
    const updatedUser = await User.findByPk(user.id)
    expect(updatedUser.username).toEqual(newUsername)
  })

  it('can be deleted', async () => {
    const userId = user.id
    await user.destroy()
    const deletedUser = await User.findByPk(userId)
    expect(deletedUser).toBeNull()
  })

  it('can be found by username', async () => {
    const foundUser = await User.findOne({ where: { username: 'gandalf' } })
    expect(foundUser).not.toBeNull()
    expect(foundUser.username).toEqual('gandalf')
  })
})
