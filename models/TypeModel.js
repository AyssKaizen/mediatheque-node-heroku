const db = require('../data/db-config')

const findAll = () => db('type')
const findOneById = id => db('type').first('*').where({ty_id: id})

module.exports = {
    findAll,
    findOneById
}