// server/index.js
const path = require("path");
const express = require("express");
require("dotenv").config()
const PORT = process.env.PORT || 3002;

const userRouter = require("./router/usersRouter")

const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
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