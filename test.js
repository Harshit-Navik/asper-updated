import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testDB() {
  const result = await db.query("SELECT * FROM User");
  console.log(result.rows);
  console.log(process.env.DATABASE_URL);
}

testDB();