const prisma = require('../prisma/index')

const jwt = require('jsonwebtoken')

const isLoggedIn = async(req, resizeBy, next) => {
    try {
        const token = req.cookie.token
        
        if(!token){
            req.send('Please login')
            throw new Error('You are not logged in')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })

        // You can do more checks
        next()
        
    } catch (error) {
        throw new Error(error)
    }

}
