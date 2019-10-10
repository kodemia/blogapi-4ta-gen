
const express = require('express')

const user = require('../usecases/user')

const router = express.Router()
const auth = require('../middlewares/auth')

router.get('/', auth, async (request, response) => {
  try {
    const allUsers = await user.getAll()
    response.json({
      success: true,
      message: 'All users',
      data: {
        users: allUsers
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.get('/validate/session', async (request, response) => {
  const { authorization: token } = request.headers

  try {
    const token = await user.validateSession(token)

    response.json({
      success: true,
      message: 'All users',
      data: {
        token
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const userFound = await user.getById(id)
    response.json({
      success: true,
      message: 'User found',
      data: {
        user: userFound
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const deletedUser = await user.deleteById(id)
    response.json({
      success: true,
      message: `User ${id} deleted`,
      data: {
        user: deletedUser
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.post('/', async (request, response) => {
  try {
    const newUser = await user.create(request.body)
    response.json({
      success: true,
      message: 'User created',
      data: {
        user: newUser
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.post('/login', async (request, response) => {
  try {
    const {
      email,
      password
    } = request.body

    const token = await user.login(email, password)

    response.json({
      success: true,
      message: 'Take your token goodman',
      data: {
        token
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

module.exports = router
