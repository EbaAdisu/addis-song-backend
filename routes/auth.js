const express = require('express')
const router = express.Router()

const { signin, signup } = require('../controllers/auth')

router.route('/signin').post(signin)
router.route('/signup').post(signup)
router.route('/').get((req, res) => {
    res.send('Auth route')
})

module.exports = router
