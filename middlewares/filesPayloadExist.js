const filePayloadExist = (req, res, next) => {
    console.log(req.files, req.body)
    if (!req.files) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }
    next()
}
module.exports = filePayloadExist
