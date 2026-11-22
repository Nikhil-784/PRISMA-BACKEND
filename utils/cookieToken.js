const getJwtToken = require('../helpers/getJwtToken')

const cookieToken = (user, res) => {
    const token = getJwtToken(user.id)
    const options = {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }

    res.status(200).cookie('Token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = cookieToken
