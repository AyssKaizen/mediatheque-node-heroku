// server/index.js
const path = require("path");
const express = require("express");
const knex = require('../data/db-config')
const session = require('express-session')
const KnexSession = require('connect-session-knex')(session)
require("dotenv").config()
const PORT = process.env.PORT || 3002;



const app = express();
const cors = require("cors");

//middleware
app.use(cors({
  origin: ["http://localhost:3000","https://mediatheque-react-node.herokuapp.com"], // pass to false to desactive cors
  methods: ["POST","PUT","GET","OPTIONS","HEAD"],
  credentials: true
}));
app.use(express.json());

const store = new KnexSession({
  knex,
  tablename: 'sessions'
})
app.enable('trust proxy') // optional, not needed for secure cookies
app.use(session({
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  proxy: process.env.NODE_ENV === "production",
  unset: 'destroy',
  cookie: {
    maxAge: parseInt(process.env.SESS_LIFETIME),
    secure: process.env.NODE_ENV === "production",
    sameSite: false,
    httpOnly: false,
  }
}))
const userRouter = require("./router/usersRouter")
app.use('/users', userRouter)

// Have Node serve the files for our built React app.
app.use(express.static(path.resolve(__dirname, '../mediatheque/build')));

  // All other GET requests not handled before will return our React app
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../mediatheque/build', '../public/index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});