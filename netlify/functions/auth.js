const serverless = require('serverless-http')
const app = require('../../app') // Import the app from app.js
const connectDB = require('../../db/connect')
require('dotenv').config()

// Connect to the database
connectDB(process.env.MONGO_URI)
    .then(() => console.log('Connected to the database successfully'))
    .catch((error) => console.error('Database connection error', error))

module.exports.handler = serverless(app) // Export the serverless handler
