
const jwt = require('../lib/jwt')

function authRoles (role = []) {
  console.log('auth roles')
  return async function (request, response, next) {
    try {
      const { authorization: token } = request.headers
    
      const decodedToken = await jwt.verify(token)
      if(!decodedToken) throw new Error('Unathorized')
      
      if (!role.includes(decodedToken.role)) throw new Error('Unathorized role')
      next()
    } catch (error) {
      response.status(401)
      response.json({
        succes: false,
        message: 'Invalid token',
        error: error.message
      })
    }
  }
}

module.exports = authRoles
