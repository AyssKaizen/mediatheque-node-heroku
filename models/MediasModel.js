const db = require('../data/db-config')

const addMedia = async payload => {
    const {title, releaseDate, image, author, type, genre, description } = payload
    return db('medias').returning('*').insert({
        me_title: title,
        me_release_date: releaseDate,
        me_image: image,
        me_author: author,
        me_description: description,
        me_type: type,
        me_genre: genre
    })  
}

const findAll = () => db('medias')

const findMediaByID = id => db('medias').where({ me_id: id })

const findByType = type => db('medias').where({me_type: type})

const findByTypeAndGenre = (type, genre) => db('medias').where({me_type: type, me_genre: genre})

const findByTitleText = text => db('medias').whereRaw('LOWER(me_title) LIKE ?', `%${text.toLowerCase()}%`)

const updateMediaByID = (id,payload) => {
    const {title, releaseDate, image, author, type, genre, description} = payload
    return db('medias')
        .where({
            me_id: id
        })
        .update({
            me_title: title,
            me_release_date: releaseDate,
            me_image: image,
            me_author: author,
            me_description: description,
            me_type: type,
            me_genre: genre
        })
}

const deleteMediaByID = id => {
    return db('medias').where({
        me_id: id
    }).del(('*'))
}

module.exports = {
    addMedia,
    findAll,
    findByType,
    findByTypeAndGenre, 
    findByTitleText,
    findMediaByID,
    updateMediaByID,
    deleteMediaByID
}