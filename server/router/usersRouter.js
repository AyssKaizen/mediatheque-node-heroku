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
router.post('/login', async (req,res) => {
    const {email, password} = req.body
    const user = await Users.login(email,password)
    if(user.msg)
      res.status(user.code).json(user.msg)
    if(!user.msg)
      res.status(200).json(user)
});

//add a user
router.post('/register', async (req,res) => {
    try {
      await Users.addUSer(req.body)
      res.status(200).json('all good !')
    } catch (err) {
      console.error(err.message);
      res.status(500).send('something wrong')
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