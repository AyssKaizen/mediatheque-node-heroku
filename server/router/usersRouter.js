const router = require('express').Router()
const Users = require('../../models/UsersModel')

router.get('/', async (req,res) => {

    if(req.session?.user?.isAdmin){
      const users = await Users.findAllUsers()
      res.json(users)
    } else res.json('vous ne disposez pas des autorisations nécessaires')
})

router.get('/inactive', async (req,res) => {
  if(req.session?.user?.isAdmin){
    const users = await Users.findNoactiveUsers()
    res.json(users)
  } else res.json('vous ne disposez pas des autorisations nécessaires')
})

router.get('/auth', async (req,res) => {
  if(req.session.user){
    const id = req.session.user.id.toString()
    try {
      const user = await Users.findUserByID(id)
      res.json(user[0])
    } catch (err) {
      console.log(err.message);
    }
  } else res.json(null)
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

router.post('/login', async (req,res) => {
    const {email, password} = req.body

    const user = await Users.login(email,password)
    if(user.msg){
      res.status(user.code).json(user.msg)
    }
    if(!user.msg){
      const sessionUser = {
        isAdmin: user.us_admin,
        email: user.us_email,
        isAuth: true,
        id: user.us_id
      }
      req.session.user = sessionUser
      res.status(200).json(user)
      res.send(req.session.sessionID)
    }
});

router.post('/logout', async (req,res) => {
  req.session.destroy((err) => {
    if(err) throw err;
    res.status(200).json('session deleted')
  })
})

//add a user
router.post('/register', async (req,res) => {
    const user = await Users.findOneByMail(req.body.email)
    if(user){
      res.status(403).json('cet email existe deja !')
      return null
    }

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