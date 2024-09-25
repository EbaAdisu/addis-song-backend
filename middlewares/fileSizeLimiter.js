const MB = 5
const FILE_SIZE_LIMIT = MB * 1024 * 1024
const fileSizeLimiter = (req, res, next) => {
    const files = req.files
    const filesOverLimit = []
    Object.keys(files).forEach((key) => {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name)
        }
    })
    if (filesOverLimit.length) {
        return res.status(400).json({
            message: `The following files are over the ${MB}MB limit: ${filesOverLimit.join(
                ', '
            )}`,
        })
    }
    next()
}

module.exports = fileSizeLimiter
