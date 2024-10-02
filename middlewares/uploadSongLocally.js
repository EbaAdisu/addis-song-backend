const path = require('path')

const uploadSongLocally = async (req, res, next) => {
    const songFile = req.files['song']

    // console.log('songfile', songFile)
    // make file name with its date
    const date = new Date()
    const fileName = `${date.getTime()}_${req.user.name}_${songFile.name}`
    const filePath = path.join(__dirname, '../files', fileName)
    // console.log(filePath)
    songFile.mv(filePath, (err) => {
        if (err) {
            // console.log(err)
            return res.status(500).json({ message: 'Failed to upload' })
        }
    })
    req.songFilePath = filePath
    // console.log('songfile', filePath)
    next()
}

module.exports = uploadSongLocally
