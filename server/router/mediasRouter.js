const router = require('express').Router()
const Medias = require('../../models/MediasModel')

//GET
// get all medias
router.get('/', async (req,res) => {
    try{
        if(req.query.search){
            console.log(req.query);
            const medias = await Medias.findByTitleText(req.query.search)
            res.json(medias)
        } else{
            const medias = await Medias.findAll()
            res.json(medias)
        }
    }catch(err) {
        console.error(err.message);
        res.status(500).send('something wrong')
    }
})

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

// get medias by type 
router.get('/:type', async (req,res) => {
    const { type } =req.params
    try{
        const medias = await Medias.findByType(type)
        res.json(medias)
    }catch {
        console.error(err.message);
        res.status(500).send('something wrong')
    }
})

// get medias by type and genre
router.get('/:type/:genre', async (req,res) => {
    const { type, genre } =req.params
    try{
        const medias = await Medias.findByTypeAndGenre(type, genre)
        res.json(medias)
    }catch {
        console.error(err.message);
        res.status(500).send('something wrong')
    }
})

// get media by name 
router.get('/', async (req,res) => {
    const { type, genre } =req.params
    try{
        const medias = await Medias.findByTypeAndGenre(type, genre)
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