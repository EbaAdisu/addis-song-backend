const Song = require('../models/song')
const fs = require('fs')

const createSong = async (req, res) => {
    const { title, artist, description } = req.body
    const songFileUrl = req.songFilePath
    const createdBy = req.user._id
    if (!title || !artist) {
        return res
            .status(400)
            .json({ message: 'Title and artist are required' })
    }
    const song = await Song.create({
        title,
        artist,
        description,
        file: songFileUrl,
        createdBy,
    })
    console.log('song', song)

    res.status(200).json({ song })
}
const deleteSong = async (req, res) => {
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song) {
        return res.status(404).json({ message: 'Song not found' })
    }
    if (song.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' })
    }
    fs.unlinkSync(song.file)
    await Song.deleteOne({ _id: id })

    res.status(200).json({ message: 'deleteSong' })
}

const getAllSongs = async (req, res) => {
    const songs = await Song.find()
    res.status(200).json({ songs })
}

const getMySongs = async (req, res) => {
    const createdBy = req.user._id
    // console.log('songs', createdBy)
    const songs = await Song.find({ createdBy })
    res.status(200).json({ songs })
}
const getSong = async (req, res) => {
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song) {
        return res.status(404).json({ message: 'Song not found' })
    }
    res.status(200).json({ song })
}
const updateSong = async (req, res) => {
    const { id } = req.params
    // console.log('req.body', req.body)
    const { title, artist, description } = req.body
    const song = await Song.findById(id)
    if (!song) {
        return res.status(404).json({ message: 'Song not found' })
    }
    if (song.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' })
    }
    song.title = title || song.title
    song.artist = artist || song.artist
    song.description = description || song.description
    await song.save()
    res.status(200).json({ song })
}

const getSongFile = async (req, res) => {
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song || !song.file) {
        return res.status(404).json({ message: 'Song not found' })
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
