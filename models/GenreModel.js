const db = require('../data/db-config')

const findAll = () => db('genre')
const findOneById = id => db('genre').first('*').where({ge_id: id})

module.exports = {
    findAll,
    findOneById
}