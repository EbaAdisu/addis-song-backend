require('express-async-errors')
require('dotenv').config()
const cors = require('cors')

const express = require('express')

const app = express()

// Import DB
const connectDB = require('./db/connect')

// import Routers
const authRouter = require('./routes/auth')
const songRouter = require('./routes/song')

// Middleware

const authenticationMiddleware = require('./middlewares/authentication')
const errorHandler = require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')

// package
app.use(express.json())
app.use(cors())

// Routes
app.get(`/`, (req, res) => {
    res.send('Welcome to the music app')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/song', authenticationMiddleware, songRouter)
// Middleware
app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT
app.listen(port, async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to the database successfully')
        console.log(`Server is listening on port ${port}`)
    } catch (error) {
        console.error(error)
    }
})
