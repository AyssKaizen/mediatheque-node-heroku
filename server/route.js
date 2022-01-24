const router = require('express').Router()
const Users = require('../models/model')

router.get('/', async (req, res) => {
    const users = await Users.findAllUsers()
    res.json(users)
})

module.exports = router