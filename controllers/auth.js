const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthorizedError } = require('../errors')

const User = require('../models/User')

const signin = async (req, res) => {
    const { name, password } = req.body
    // console.log(req.body)
    if (!name || !password) {
        throw new BadRequestError('Please provide name and password')
    }
    const user = await User.findOne({ name })
    // console.log(user)

    if (!user) {
        throw new UnauthorizedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    // console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid credentials')
    }
    const token = await user.JwtToken()

    res.status(StatusCodes.OK).json({ name, token })
}

const signup = async (req, res) => {
    const { name, password } = req.body
    // console.log(req.body)
    if (!name || !password) {
        throw new BadRequestError('Please provide name and password')
    }
    const user = await User.create({ name, password })
    res.status(StatusCodes.CREATED).json({
        message: 'User created successfully',
    })
}
module.exports = {
    signup,
    signin,
}
