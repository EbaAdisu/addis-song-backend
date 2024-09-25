const path = require('path')
const fileExtLimiter = (allowedExt) => {
    return (req, res, next) => {
        const files = req.files
        const fileExtensions = []
        Object.keys(files).forEach((key) => {
            const ext = path.extname(files[key].name).toLowerCase()
            // console.log(key, files[key].name, ext, files[key])
            fileExtensions.push(ext)
        })
        const allowed = fileExtensions.every((ext) => allowedExt.includes(ext))
        // console.log(allowed, allowedExt, fileExtensions)
        if (!allowed) {
            return res.status(400).json({
                message:
                    'Only the following file extensions are allowed: ' +
                    allowedExt.join(', '),
            })
        }
        next()
    }
}
module.exports = fileExtLimiter
