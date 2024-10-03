const path = require('path')

const uploadSongLocally = async (req, res, next) => {
    const songFile = req.files['song']

    const date = new Date()
    const fileName = `${date.getTime()}_${req.user.name}_${songFile.name}`
    const filePath = path.join(__dirname, '../files', fileName)
    songFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to upload' })
        }
    })
    req.songFilePath = filePath
    next()
}

module.exports = uploadSongLocally
