const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "1997",
  host: "localhost",
  port: 5433,
  database: "kerux_labo1",
});

module.exports = pool;
