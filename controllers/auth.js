const { StatusCodes } = require('http-status-codes')

const User = require('../models/user')

const signin = async (req, res) => {
    const { name, password } = req.body
    // console.log(req.body)
    if (!name || !password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: ' Please provide name and password' })
    }
    try {
        const user = await User.findOne({ name })
        // console.log(user)
        if (!user) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Invalid credentials' })
        }
        const isPasswordCorrect = await user.comparePassword(password)
        // console.log(isPasswordCorrect)
        if (!isPasswordCorrect) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Invalid credentials' })
        }
        const token = await user.JwtToken()
        // console.log(token)
        res.status(StatusCodes.OK).json({ name, token })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}
const signup = async (req, res) => {
    const { name, password } = req.body
    // console.log(req.body)
    if (!name || !password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: ' Please provide name and password' })
    }
    try {
        const user = await User.create({ name, password })
        res.status(StatusCodes.CREATED).json({
            message: 'User created successfully',
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}
module.exports = {
    signup,
    signin,
}
