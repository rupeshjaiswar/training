const { createPool } = require("mysql"); // importing mysql pacakage

// connection to database
const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

module.exports = pool; // exporting the pool to enable to use it anywhere