const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')

const auth = async (req, res, next) => {
    // console.log('aut', req.body)
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Authorization header is required')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            _id: payload.id,
            name: payload.name,
        }
        next()
    } catch (error) {
        throw new UnauthorizedError('Invalid token')
    }
}

module.exports = auth
