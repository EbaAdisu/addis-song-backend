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
    getMySongs,
} = require('../controllers/song')

const fileExtLimiter = require('../middlewares/fileExtLimiter')
const filesPayloadExist = require('../middlewares/filesPayloadExist')
const fileSizeLimiter = require('../middlewares/fileSizeLimiter')
const uploadSongLocally = require('../middlewares/uploadSongLocally')
const { get } = require('../models/Comment')

router
    .route('/')
    .get(getAllSongs)
    .post(
        fileUpload({ createParentPath: true }),
        filesPayloadExist,
        fileExtLimiter(['.mp3', '.mpeg', '.m4a']),
        fileSizeLimiter,
        uploadSongLocally,
        createSong,
        getMySongs
    )
router.route('/mine').get(getMySongs)
router.route('/:id').get(getSong).patch(updateSong).delete(deleteSong)
router.route('/:id/file').get(getSongFile)

module.exports = router
