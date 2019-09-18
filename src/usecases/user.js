
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

const User = require('../models/users')

async function create ({ name, email, password, role = 'user' }) {
  const hash = await bcrypt.hash(password)
  return User.create({ name, email, password: hash, role })
}

function getAll () {
  return User.find()
}

function getById (userId) {
  return User.findById(userId)
}

function deleteById (userId) {
  return User.findByIdAndDelete(userId)
}

async function login (email, password) {
  const userFound = await User.findOne({ email })
  if (!userFound) throw new Error('Invalid data')

  const isPasswordCorrect = await bcrypt.compare(password, userFound.password)
  if (!isPasswordCorrect) throw new Error('Invalid data')

  return jwt.sign({ id: userFound._id, role: userFound.role })
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  login
}
