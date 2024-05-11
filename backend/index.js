const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'collaborative'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Endpoint for user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check in admin table
  const adminSql = `SELECT * FROM admin WHERE email = ? AND password = ?`;
  db.query(adminSql, [email, password], (adminErr, adminResult) => {
    if (adminErr) {
      throw adminErr;
    }

    if (adminResult.length > 0) {
      // Admin login successful
      res.json({ success: true, role: 'admin', message: 'Admin login successful', user: adminResult[0] });
    } else {
      // Check in waiter table if not found in admin table
      const waiterSql = `SELECT * FROM waiter WHERE email = ? AND password = ?`;
      db.query(waiterSql, [email, password], (waiterErr, waiterResult) => {
        if (waiterErr) {
          throw waiterErr;
        }

        if (waiterResult.length > 0) {
          // Waiter login successful
          res.json({ success: true, role: 'waiter', message: 'Waiter login successful', user: waiterResult[0] });
        } else {
          // Invalid email or password
          res.json({ success: false, message: 'Invalid email or password' });
        }
      });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
