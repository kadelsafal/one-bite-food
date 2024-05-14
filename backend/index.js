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

// Endpoint to fetch waiter data
app.get('/api/waiter', (req, res) => {
  // Query to select all waiters from the database
  const sql = `SELECT name, image_url FROM waiter`;

  // Execute the SQL query
  db.query(sql, (err, result) => {
    if (err) {
      // If an error occurs, send an error response
      res.status(500).json({ success: false, message: 'Failed to fetch waiter data' });
    } else {
      // If successful, send the waiter data as a JSON response
      res.json({ success: true, waiters: result });
    }
  });
});

// Endpoint to fetch all orders
app.get('/api/orders', (req, res) => {
  const sql = `SELECT Name, TableNo, Food, Price, Quantity, TotalAmount, Status, Takeaway FROM orders`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    } else {
      res.json({ success: true, orders: result });
    }
  });
});

// Endpoint for user logout
app.post('/api/logout', (req, res) => {
  // You may want to perform additional cleanup or session management here
  // For now, let's simply respond with a success message
  res.json({ success: true, message: 'Logout successful' });
});

app.post('/api/submit-order', (req, res) => {
  const { name, tableNo, food, price, quantity, takeaway } = req.body;

  // Assuming 'orders' table schema: Name, TableNo, Food, Price, Quantity, Takeaway

  // SQL query to insert order details into the database
  const sql = `
    INSERT INTO orders (Name, TableNo, Food, Price, Quantity, Takeaway) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [name, tableNo, food, price, quantity, takeaway];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      // If an error occurs, send an error response
      console.error('Error submitting order:', err);
      res.status(500).json({ success: false, message: 'Failed to submit order' });
    } else {
      // If successful, send a success response
      res.json({ success: true, message: 'Order submitted successfully' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});