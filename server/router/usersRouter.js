const router = require('express').Router()
const Users = require('../../models/UsersModel')

router.get('/', async (_,res) => {
    const users = await Users.findAllUsers()
    res.json(users)
})

// get user by id
router.get('/:id', async (req,res) => {
    try {
      const { id } =req.params
      const user = await Users.findUserByID(id)
      res.json(user[0])
    } catch (err) {
      console.log(err.message);
    }
});

// get user by mail and password
router.post('/auth', async (req,res) => {
    const {email, password} = req.body
    if(email && password){
      try {
        const user = await Users.authUser(email, password)
        if(user[0]){
          res.json(user[0])
        } else {
          res.status(404).json('le mot de passe ou le mail est incorrect')
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      res.send('Veuillez vous identifier en renseignant le mail et le mot de passe')
      res.end()
    }
});

//add a user
router.post('/adduser', async (req,res) => {
    try {
      const newUser = await Users.addUSer(req.body)
      res.json(newUser[0])
    } catch (err) {
      console.log(err.message);
    }
});

//update user informations 
router.put("/:id", async (req,res) => {
    try {
      const { id } =req.params
      await Users.updateUserByID(id,req.body)
      res.json("Utilisateur mis à jour")
    } catch (err) {
      console.log(err.message);
    }
});

// delete user by id
router.delete('/:id', async (req,res) => {
    try {
      const { id } =req.params
      const user = await Users.deleteUserByID(id)
      res.json(user[0])
    } catch (err) {
      console.log(err.message);
    }
});


module.exports = router