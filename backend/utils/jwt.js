const expressJwt = require('express-jwt')

function authJwt() {
  const api = process.env.API_URL
  return expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/v1/users/login`,
      `${api}/v1/users/register`,
    ],
  })
}

module.exports = authJwt
