const mongoose = require('mongoose')

const CommentSchema = require('./Comment')

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    artist: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [CommentSchema],
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
    },
})

module.exports = mongoose.model('Song', SongSchema)
