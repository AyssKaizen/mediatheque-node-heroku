const db = require('../data/db-config')

const findAllUsers = () => {
    return db('users')
}

module.exports = {
    findAllUsers
}