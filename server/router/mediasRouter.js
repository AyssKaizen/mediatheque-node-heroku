const router = require('express').Router()
const Medias = require('../../models/MediasModel')

//add a media
router.post('/add', async (req,res) => {
    try {
        await Medias.addMedia(req.body)
        res.status(200).json('medias ajouté avec succès !')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('something wrong')
    }
});

module.exports = router