const db = require('../data/db-config')
const bcrypt = require('bcryptjs')

const findAllUsers = () => db('users')

const login = (email, password) => (db('users').where({us_email: email, us_password: password}))

const addUSer = async payload => {
        const {lastname,firsttname,email,postcode,birthday,address,city,active,password,admin} = payload
        const passHashed = await bcrypt.hash(password, 10)
        return db('users').returning('*').insert({
            us_lastname: lastname,
            us_firstname: firstname,
            us_email: email,
            us_postcode: postcode,
            us_birthday: birthday,
            us_address: address,
            us_city: city,
            us_active: active,
            us_password: passHashed,
            us_admin: admin
        })  
}

const findUserByID = id => db('users').where({ us_id: id })

const updateUserByID = (id,payload) => {
    const {lastname,firstname,email,postcode,birthday,address,city,active,password,admin} = payload
    return db('users')
        .where({
            us_id: id
        })
        .update({
            us_lastname: lastname,
            us_firstname: firstname,
            us_email: email,
            us_postcode: postcode,
            us_birthday: birthday,
            us_address: address,
            us_city: city,
            us_active: active,
            us_password: password,
            us_admin: admin
        })
}

const deleteUserByID = id => {
    return db('users').where({
        us_id: id
    }).del(('*'))
}

module.exports = {
    findAllUsers, 
    login,
    addUSer,
    findUserByID,
    updateUserByID,
    deleteUserByID
}