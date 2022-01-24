require('dotenv').config()
const  {Pool}  = require("pg");

const pool = new Pool({
    user: "testUser",
    password: "admin",
    host:"localhost",
    port:"5432",
    database: "mediatheque"
});

module.exports = pool;