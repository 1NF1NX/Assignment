
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Read JSON data from the frontend
app.use(express.json());

// Serve the website files
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Create or open the database
const db = new sqlite3.Database(
  path.join(__dirname, "campusconnect.db")
);

// Create registrations table
db.run(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    department TEXT NOT NULL,
    gender TEXT NOT NULL,
    event TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Receive registration data and save it
app.post("/api/register", (req, res) => {
  const {
    name, roll, email, phone,
    department, gender, event
  } = req.body;

  if (
    ![name, roll, email, phone, department, gender, event]
      .every(value => typeof value === "string" && value.trim())
  ) {
    return res.status(400).json({
      message: "Please complete all fields."
    });
  }

  const sql = `
    INSERT INTO registrations
    (name, roll, email, phone, department, gender, event)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [
    name.trim(), roll.trim(), email.trim(),
    phone.trim(), department.trim(),
    gender.trim(), event.trim()
  ], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Could not save registration."
      });
    }

    res.status(201).json({
      message: "Registration saved successfully!",
      id: this.lastID
    });
  });
});

app.listen(PORT, () => {
  console.log(`Campus Connect running at http://localhost:${PORT}`);
});

