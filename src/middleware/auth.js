const jwt = require('jsonwebtoken')
const helper = require('../helper')

module.exports = {
  authWorker: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'SECRET', (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          return helper.response(response, 403, error.message)
        } else {
          if (result.user_role === 1) {
            request.token = result
            next()
          } else {
            return helper.response(response, 400, 'You are not allowed to do that')
          }
        }
      })
    } else {
      return helper.response(response, 400, 'Please login first')
    }
  },
  authRecruit: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'SECRET', (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          return helper.response(response, 403, error.message)
        } else {
          if (result.user_role === 2) {
            request.token = result
            next()
          } else {
            return helper.response(response, 400, 'You are not allowed to do that')
          }
        }
      })
    } else {
      return helper.response(response, 400, 'Please login first')
    }
  }
}
