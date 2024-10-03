const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Import DB and Routers
const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')
const songRouter = require('./routes/song')

// Middleware
const authenticationMiddleware = require('./middlewares/authentication')
const errorHandler = require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')

// Package middlewares
app.use(express.json())
app.use(cors())

// Connect to the database
connectDB(process.env.MONGO_URI)
    .then(() => console.log('Connected to the database successfully'))
    .catch((error) => console.error('Database connection error', error))

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/song', authenticationMiddleware, songRouter)

// Error handlers
app.use(errorHandler)
app.use(notFound)

module.exports = app
