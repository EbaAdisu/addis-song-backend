const { StatusCodes } = require('http-status-codes')
const Song = require('../models/song')
const fs = require('fs')
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require('../errors')

const createSong = async (req, res) => {
    const { title, artist, description } = req.body
    const songFileUrl = req.songFilePath
    const createdBy = req.user._id
    if (!title || !artist) {
        throw new BadRequestError('Please provide title and artist')
    }
    const song = await Song.create({
        title,
        artist,
        description,
        file: songFileUrl,
        createdBy,
    })

    res.status(StatusCodes.OK).json({ song })
}
const deleteSong = async (req, res) => {
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song) {
        throw new NotFoundError(`No song with id : ${id}`)
    }
    if (song.createdBy.toString() !== req.user._id.toString()) {
        throw new UnauthorizedError('Not authorized')
    }
    fs.unlinkSync(song.file)
    await Song.deleteOne({ _id: id })

    res.status(StatusCodes.OK).json({ message: 'deleteSong' })
}

const getAllSongs = async (req, res) => {
    const songs = await Song.find()
    res.status(StatusCodes.OK).json({ songs })
}

const getMySongs = async (req, res) => {
    const createdBy = req.user._id
    // console.log('songs', createdBy)
    const songs = await Song.find({ createdBy })
    res.status(StatusCodes.OK).json({ songs })
}
const getSong = async (req, res) => {
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song) {
        throw new NotFoundError('No song with that id')
    }
    res.status(StatusCodes.OK).json({ song })
}
const updateSong = async (req, res) => {
    const { id } = req.params
    const { title, artist, description } = req.body
    const song = await Song.findById(id)
    if (!song) {
        throw new NotFoundError('No song with that id')
    }
    if (song.createdBy.toString() !== req.user._id.toString()) {
        throw new UnauthorizedError('Not authorized')
    }
    song.title = title || song.title
    song.artist = artist || song.artist
    song.description = description || song.description
    await song.save()
    res.status(StatusCodes.OK).json({ song })
}

const getSongFile = async (req, res) => {
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song || !song.file) {
        throw new NotFoundError('No song with that id')
    }
    res.set('Content-Type', 'audio/mpeg')
    res.sendFile(song.file)
}
module.exports = {
    createSong,
    deleteSong,
    getAllSongs,
    getSong,
    updateSong,
    getSongFile,
    getMySongs,
}
