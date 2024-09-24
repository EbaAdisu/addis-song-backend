const path = require('path')

const uploadSong = async (req, res, next) => {
    const songFile = req.files['song']

    console.log('songfile', songFile)
    const filePath = path.join(__dirname, 'files', songFile.name)
    console.log(filePath)
    songFile.mv(filePath, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Failed to upload' })
        }
    })
    req.songFilePath = filePath
    console.log('songfile', filePath)
    next()
}

module.exports = uploadSong
