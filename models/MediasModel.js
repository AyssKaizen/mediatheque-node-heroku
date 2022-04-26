const db = require('../data/db-config')

const addMedia = async payload => {
    const {title, releaseDate, image, author, type, genre } = payload
    return db('medias').returning('*').insert({
        me_title: title,
        me_release_date: releaseDate,
        me_image: image,
        me_author: author,
        me_type: type,
        me_genre: genre
    })  
}

module.exports = {
    addMedia
}