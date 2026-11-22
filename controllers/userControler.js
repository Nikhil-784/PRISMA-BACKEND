const bcrypt = require('bcryptjs')
const prisma = require('../prisma')
const cookieToken = require('../utils/cookieToken')

//user signup
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and password' })
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 12)
            },
            select: { id: true, name: true, email: true }
        })

        cookieToken(user, res)
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ success: false, message: 'An account with this email already exists' })
        }
        next(error)
    }
}

