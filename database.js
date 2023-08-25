const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Step 1: Create the initial table structure if it doesn't exist
db.serialize(() => {
     db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

// Step 2: Alter the table to add the 'password' column
// db.serialize(() => {    // ☼☼☼ sqlite does not support ALTER IF NOT EXISTS ☼☼☼ 
//      db.run(`
//     ALTER TABLE users
//     ADD COLUMN IF NOT EXISTS password TEXT NOT NULL DEFAULT 'password'
//   `);
// });

// db.serialize(() => {    // ☼☼☼ uncomment this block to run the migration ☼☼☼ server will crash because column already exists
//      db.run(`
//     ALTER TABLE users
//     ADD COLUMN password TEXT NOT NULL DEFAULT 'password'
//   `);
// });

// Step 3: Add unique constraints to 'username' and 'email'
db.serialize(() => {
     db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS unique_username
    ON users (username)
  `);

     db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS unique_email
    ON users (email)
  `);
});

module.exports = db;
