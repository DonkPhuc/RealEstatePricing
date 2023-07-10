require("dotenv").config();
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "dinh_gia_hem",
};

const pool = mysql.createPool({
  ...dbConfig,
});

async function testConnection() {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("SELECT 1 + 1 as result");
    console.log(
      rows[0].result === 2 ? "Connection successful" : "Connection failed"
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
}

testConnection();

module.exports = pool;
