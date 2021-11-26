// server/index.js
const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../mediatheque/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "hello Tout la zone" });
  });

  // All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../mediatheque/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});