const router = require('express').Router()
const Medias = require('../../models/MediasModel')
const Genre = require('../../models/GenreModel')
const Type = require('../../models/TypeModel')

//GET
// get all medias
router.get('/', async (req,res) => {
    try{
        if(req.query.search){
            const medias = await Medias.findByTitleText(req.query.search)
            res.json(medias)
        } else if(req.query.type){
            const medias = await Medias.findByType(parseInt(req.query.type))
            res.json(medias)
        }else{
            const medias = await Medias.findAll()
            res.json(medias)
        }
    }catch(err) {
        console.error(err.message);
        res.status(500).send('something wrong')
    }
})

// get genres

router.get('/genres', async (req,res) => {
    try {
        const genres = await Genre.findAll()
        res.json(genres)
    } catch (err) {
        console.log(err.message);
    }
});

// get genre by id
router.get('/genres/:id', async (req,res) => {
    try {
        const { id } =req.params
        const genre = await Genre.findOneById(id)
        res.json(genre)
    } catch (err) {
        console.log(err.message);
    }
});

// get types

router.get('/types', async (req,res) => {
    try {
        const types = await Type.findAll()
        res.json(types)
    } catch (err) {
        console.log(err.message);
    }
});

// get genre by id
router.get('/types/:id', async (req,res) => {
    try {
        const { id } =req.params
        const type = await Type.findOneById(id)
        res.json(type)
    } catch (err) {
        console.log(err.message);
    }
});

// get media by id
router.get('/:id', async (req,res) => {
    try {
        const { id } =req.params
        const media = await Medias.findMediaByID(id)
        res.json(media[0])
    } catch (err) {
        console.log(err.message);
    }
});

// get medias by type and genre
router.get('/:typeId/:genreId', async (req,res) => {
    const { typeId, genreId } =req.params
    try{
        const medias = await Medias.findByTypeAndGenre(typeId, genreId)
        res.json(medias)
    }catch {
        console.error(err.message);
        res.status(500).send('something wrong')
    }
})

//POST
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


//PUT
// update a media by id
router.put("/:id", async (req,res) => {
    try {
        const { id } =req.params
        await Medias.updateMediaByID(id,req.body)
        res.status('200').json("media mis à jour")
    } catch (err) {
        console.log(err.message);
        res.status('500').json("une erreur est survenue")
    }
});

//DELETE
// delete media by ID
router.delete('/:id', async (req,res) => {
    if(req.session?.user?.isAdmin){
        try {
            const { id } =req.params
            await Medias.deleteMediaByID(id)
            res.status('200').json("media supprimé avec succès")
        } catch (err) {
            console.log(err.message);
            res.status('500').json("une erreur est survenue")
        }
    } else res.json('vous ne disposez pas des autorisations nécessaires')
});




module.exports = router