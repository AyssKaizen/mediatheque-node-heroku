// server/index.js
const path = require("path");
const express = require("express");
require("dotenv").config()
const PORT = process.env.PORT || 3002;

const testRouter = require("./route")

const app = express();
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());
app.use('/test', testRouter)


const pool = require("../models/db_connexion");


//ROUTES
//add a user
app.post("/adduser", async (req,res) => {
  try {
    const { lastname,firstname,email,postcode,birthday,address,city,active,password,admin } = req.body;
    const newUser = await pool.query("INSERT INTO users (us_lastname,us_firstname,us_email,us_postcode,us_birthday,us_address,us_city,us_active,us_password,us_admin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *", 
    [lastname,firstname,email,postcode,birthday,address,city,active,password,admin]
    );

    res.json(newUser.rows[0])

  } catch (err) {
    console.log(err.message);
  }
});
// get all users 
app.get("/users", async (_,res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users")
    res.json(allUsers.rows)
  } catch (err) {
    console.log(err.message);
  }
});
// get user by id
app.get("/users/:id", async (req,res) => {
  try {
    const { id } =req.params
    const user = await pool.query("SELECT * FROM users WHERE us_id = $1 ",[id])
    res.json(user.rows[0])
  } catch (err) {
    console.log(err.message);
  }
});

// get user by mail and password
app.post("/auth", async (req,res) => {
  const {email, password} = req.body
  if(email && password){
    try {
      const user = await pool.query("SELECT * FROM users WHERE us_email = $1 AND us_password =$2",[email, password])
      if(user.rows[0]){
        res.json(user.rows[0])
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

//update user informations 
app.put("/users/:id", async (req,res) => {
  try {
    const { id } =req.params
    const {lastname,firstname,postcode} = req.body
    const user = await pool.query("UPDATE users SET us_lastname = $1, us_firstname = $2, us_postcode = $3 WHERE us_id = $4  ",[lastname,firstname,postcode,id])
    res.json("Utilisateur mis à jour")
  } catch (err) {
    console.log(err.message);
  }
  });
// delete user by id
app.delete("/users/:id", async (req,res) => {
  try {
    const { id } =req.params
    const user = await pool.query("DELETE FROM users WHERE us_id = $1 RETURNING *",[id])
    res.json(user.rows[0])
  } catch (err) {
    console.log(err.message);
  }
  });


// Have Node serve the files for our built React app.
app.use(express.static(path.resolve(__dirname, '../mediatheque/build')));

  // All other GET requests not handled before will return our React app
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../mediatheque/build', '../public/index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});