const jwt = require('jsonwebtoken')

const getJwtToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be set in the environment')
    }

    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1 day' })
}

module.exports = getJwtToken
