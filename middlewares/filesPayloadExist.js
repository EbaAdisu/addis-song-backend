const filePayloadExist = (req, res, next) => {
    console.log(req.files, req.body)
    if (!req.files) {
        return res.status(400).json({ message: 'No file uploaded' })
    }
    next()
}
module.exports = filePayloadExist
