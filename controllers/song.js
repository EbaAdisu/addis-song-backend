const Song = require('../models/song')

const createSong = async (req, res) => {
    res.status(200).json({ message: 'createSong' })
}
const deleteSong = async (req, res) => {}
const getAllSongs = async (req, res) => {}
const getSong = async (req, res) => {}
const updateSong = async (req, res) => {}
module.exports = {
    createSong,
    deleteSong,
    getAllSongs,
    getSong,
    updateSong,
}
