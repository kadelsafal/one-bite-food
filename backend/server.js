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
  database: 'user-login'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
;
      }
      if (result.length > 0) {
        res.json({ success: true, message: 'Login successful', user: result[0] });
      } else {
        res.json({ success: false, message: 'Invalid email or password' });
      }
    });
  });
  
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.json({ success: false, message: 'User already exists' });
    } else {
      const insertSql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
      
      db.query(insertSql, (insertErr, insertResult) => {
        if (insertErr) {
          throw insertErr;
        }
        res.json({ success: true, message: 'Signup successful' });
      });
    }
  });
});

app.post('/api/reservation', (req, res) => {
  const { email, date, tableNumber, name } = req.body;
  const sql = `INSERT INTO reservation (email, date, table_number, name) VALUES (?, ?, ?, ?)`;
  const values = [email,date, tableNumber, name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating reservation:', err);
      res.status(500).json({ success: false, message: 'Failed to create reservation' });
    } else {
      res.status(201).json({ success: true, message: 'Reservation created successfully', reservationId: result.insertId });
    }
  });
});

// Check if a table is booked
app.post('/api/checkTable', (req, res) => {
  const { tableNumber } = req.body;
  const sql = `SELECT * FROM reservation WHERE table_number = ?`;
  db.query(sql, [tableNumber], (err, result) => {
    if (err) {
      console.error('Error checking table:', err);
      res.status(500).json({ success: false, message: 'Failed to check table' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ success: true, booked: true });
      } else {
        res.status(200).json({ success: true, booked: false });
      }
    }
  });
});

app.get('/menu-items', (req, res) => {
  const query = 'SELECT id, title, description, price, image FROM menu_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      res.status(500).json({ error: 'Error fetching menu items' });
    } else {
      // Convert image data to base64
      results.forEach((item) => {
        item.image = item.image.toString('base64');
      });
      res.json(results);
    }
  });
});
app.get('/table-items', (req, res) => {
  const query = 'SELECT id, table_title, table_description, table_status, table_image FROM table_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching table items:', err);
      res.status(500).json({ error: 'Error fetching table items' });
    } else {
      // Convert image data to base64
      results.forEach((item) => {
        item.table_image = item.table_image.toString('base64');
      });
      res.json(results);
    }
  });
});

// Import necessary modules
app.post('/api/menu_orders', (req, res) => {
  const { email, name, product_title, product_price, product_quantity, product_total_price} = req.body;

  // Check if email and name are not null
  if (!email || !name) {
    return res.status(400).json({ success: false, message: 'Email and name are required fields' });
  }

  // Assuming you have a MySQL connection named `db`
  const sql = `INSERT INTO menu_orders (email, name, product_title, product_price, product_quantity, product_total_price,order_time,order_status) VALUES (?, ?, ?, ?, ?, ?,CURRENT_TIMESTAMP,'Pending')`;
  const values = [email, name, product_title, product_price, product_quantity, product_total_price];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting orders:', err);
      return res.status(500).json({ success: false, message: 'Failed to store orders' });
    } else {
      return res.status(201).json({ success: true, message: 'Orders stored successfully', reservationId: result.insertId });
    }
  });
});

app.post('/api/change-pwd', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const sql = `SELECT password FROM users WHERE email = ?`;
  db.query(sql, [email], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      const user = result[0];
      if (user.password === oldPassword) {
        // If old password matches, update the password in the database
        const updateSql = `UPDATE users SET password = ? WHERE email = ?`;
        db.query(updateSql, [newPassword, email], (updateErr, updateResult) => {
          if (updateErr) {
            throw updateErr;
          }
          res.json({ success: true, message: 'Password changed successfully' });
        });
      } else {
        res.json({ success: false, message: 'Old password is incorrect' });
      }
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

