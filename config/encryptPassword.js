const crypto = require('crypto')
const settings = require('../config/settings.json')

module.exports = password => {
  return crypto.createHmac('sha256', settings.salt)
    .update(password).digest('hex')
}