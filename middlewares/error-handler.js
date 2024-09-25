const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    // console.log('Headers', err)
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    if (err.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: `Duplicate value entered for ${Object.keys(
                err.keyValue
            ).join(' ')}`,
        })
    }
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => {
            let message = val.message
            // enums
            if (val.properties && val.properties.type === 'enum') {
                const enumValues = val.properties.enumValues.join(', ')
                message += `  Value must be one of the following: [${enumValues}]`
            }
            console.log(message)
            return message
        })
        return res.status(StatusCodes.BAD_REQUEST).json({ message: messages })
    }
    if (err.name === 'CastError') {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: `Invalid ${err.path}` })
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ err, message: err.message })
}
module.exports = errorHandler
