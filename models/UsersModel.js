const db = require('../data/db-config')
const bcrypt = require('bcryptjs')

const findAllUsers = () => db('users')

const login = async (email, password) => {
    const user = await db('users').first('*').where({us_email: email})
    if(user){
        const validPass = await bcrypt.compare(password, user.us_password)
        if(validPass){
            const {us_password,...rest} = user
            return rest
        }
        else 
            return { msg: 'erreur mail ou mot de passe', code: 403 }
    }
    else 
        return { msg: 'utilisateur introuvable', code: 404 }
}

const addUSer = async payload => {
        const {lastname,firstname,email,postcode,birthday,address,city,active,password,admin} = payload
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