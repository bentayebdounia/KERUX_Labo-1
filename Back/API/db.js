const Pool = require("pg").Pool

const pool = new Pool ({
    user : "postgres",
    password: "1997",
    host: "localhost",
    port: 5432,
    database: "kerux_labo"
})

module.exports = pool;