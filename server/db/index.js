const Pool = require('pg').Pool;
require('dotenv').config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
}

let pool = new Pool(config);


module.exports = pool;