const express = require('express')
const fileUpload = require('express-fileupload')

const router = express.Router()

const {
    createSong,
    deleteSong,
    getAllSongs,
    getSong,
    updateSong,
} = require('../controllers/song')

const fileExtLimiter = require('../middlewares/fileExtLimiter')
const filesPayloadExist = require('../middlewares/filesPayloadExist')
const fileSizeLimiter = require('../middlewares/fileSizeLimiter')
const uploadSong = require('../middlewares/uploadSong')

router
    .route('/')
    .get(getAllSongs)
    .post(
        fileUpload({ createParentPath: true }),
        filesPayloadExist,
        fileExtLimiter(['.png', '.jpg', '.jpeg']),
        fileSizeLimiter,
        uploadSong,
        createSong
    )
router.route('/:id').get(getSong).patch(updateSong).delete(deleteSong)

module.exports = router
