const express = require('express')
const fileUpload = require('express-fileupload')

const router = express.Router()

const {
    createSong,
    deleteSong,
    getAllSongs,
    getSong,
    updateSong,
    getSongFile,
} = require('../controllers/song')

const fileExtLimiter = require('../middlewares/fileExtLimiter')
const filesPayloadExist = require('../middlewares/filesPayloadExist')
const fileSizeLimiter = require('../middlewares/fileSizeLimiter')
const uploadSongLocally = require('../middlewares/uploadSongLocally')

router
    .route('/')
    .get(getAllSongs)
    .post(
        fileUpload({ createParentPath: true }),
        filesPayloadExist,
        fileExtLimiter(['.mp3', '.mpeg', '.m4a']),
        fileSizeLimiter,
        uploadSongLocally,
        createSong
    )
router.route('/:id').get(getSong).patch(updateSong).delete(deleteSong)
router.route('/:id/file').get(getSongFile)

module.exports = router
