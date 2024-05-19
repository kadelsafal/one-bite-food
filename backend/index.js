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

// Endpoint for user login
app.post('/api/userlogin', (req, res) => {
  const { email, password } = req.body;

  // SQL query to check user credentials in the login table
  const loginSql = `SELECT * FROM login WHERE email = ? AND password = ?`;

  db.query(loginSql, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing SQL query: ' + err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      const userRole = results[0].user_role;

      if (userRole === 'admin') {
        // Admin login successful
        res.json({ success: true, role: 'admin', message: 'Admin login successful' });
      } else if (userRole === 'waiter') {
        // Waiter login successful
        res.json({ success: true, role: 'waiter', message: 'Waiter login successful' });
      }
    } else {
      // Invalid email or password
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
});

// Endpoint to fetch waiter data
app.get('/api/waiters', (req, res) => {
  // Query to select all waiters from the database
  const sql = `SELECT * FROM login WHERE user_role = 'waiter'`;

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
app.delete('/api/deleteorders', (req, res) => {
  // Extract the table_no from the query parameters
  const { table_no } = req.query;

  // Check if the table_no is provided
  if (!table_no) {
    return res.status(400).json({ success: false, message: 'Table number is required' });
  }

  // Query to delete orders for the specified table
  const sql = `DELETE FROM orders WHERE table_no = ?`;

  // Execute the SQL query with the specified table_no
  db.query(sql, [table_no], (err) => {
    if (err) {
      // If an error occurs, send an error response
      console.error('Error deleting orders:', err);
      res.status(500).json({ success: false, message: 'Failed to delete orders' });
    } else {
      // If successful, send a success response
      res.json({ success: true, message: 'Orders deleted successfully' });
    }
  });
});

// Endpoint to fetch all orders
app.get('/api/orders', (req, res) => {
  const sql = `
  SELECT 
  o.table_no,
  m.title AS menu_item_title,
  o.quantity,
  o.status
FROM 
  orders o
JOIN 
  menu_items m ON o.menu_items_id = m.id;


  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    } else {
      res.json({ success: true, orders: result });
    }
  });
});
app.get('/api/online-orders', (req, res) => {
  const sql = `
  SELECT email, name, product_title, product_quantity
  FROM menu_orders;  
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    } else {
      res.json({ success: true, orders: result });
    }
  });
});
app.get('/api/menu_orders', (req, res) => {
  const { name } = req.query;

  // Check if name is provided
  if (!name) {
    return res.status(400).json({ success: false, message: 'Customer name is required' });
  }

  // Assuming you have a MySQL connection named `db`
  const sql = `SELECT name, product_title, product_price, product_quantity FROM menu_orders WHERE name = ?`;
  const values = [name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    } else {
      return res.status(200).json({ success: true, orders: result });
    }
  });
});
app.post('/api/submit-order', (req, res) => {
  const { tableNo, menu_items_id,quantity,status} = req.body;

  // Assuming 'orders' table schema: Name, TableNo, Food, Price, Quantity, Takeaway

  // SQL query to insert order details into the database
  const sql = `
  INSERT INTO orders (table_no, menu_items_id, quantity,status) 
    VALUES (?, ?, ?,?)
  `;
  const values = [tableNo,menu_items_id, quantity, status];

  // Execute the SQL query
  db.query(sql, values, (err) => {
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

app.post('/api/fulfilled-order', (req, res) => {
  const { orders } = req.body;

  // SQL query to insert order details into the database
  const sql = `
    INSERT INTO fulfilled_orders ( menu_item_title, menu_price, quantity,status) 
    VALUES ?`;

  // Extract values from orders array and map them into an array of arrays
  const values = orders.map(order => [order.menu_item_title, order.menu_price, order.quantity,order.status]);

  // Execute the SQL query with multiple values using bulk insert
  db.query(sql, [values], (err) => {
    if (err) {
      console.error('Error inserting orders:', err);
      res.status(500).json({ success: false, message: 'Failed to submit orders' });
    } else {
      console.log('Orders inserted into fulfilled_orders successfully');
      res.json({ success: true, message: 'Orders submitted successfully' });
    }
  });
});
app.get('/api/analytics-orders', (req, res) => {
  // SQL query to select data from the database
  const sql = 'SELECT `id`, `menu_item_title`, `menu_price`, `quantity`, `status`,`timestamp` FROM `fulfilled_orders`'; // Correct table name and query syntax

  // Execute the query
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch data from the database' });
    } else {
      console.log('Data retrieved successfully:', results);
      res.json({ success: true, data: results });
    }
  });
});


// Endpoint to fetch all orders
app.get('/api/tableorders', (req, res) => {
  const sql = `
  SELECT 
  m.title AS menu_item_title,
  o.quantity,
  o.status,
  m.price
FROM 
  orders o
JOIN 
  menu_items m ON o.menu_items_id = m.id
WHERE 
  o.table_no = ?;

  `;

  db.query(sql, [req.query.table_no], (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    } else {
      res.json({ success: true, orders: result });
    }
  });
});


// Endpoint to delete a waiter
app.delete('/api/waiters/:name', (req, res) => {
  const name = req.params.name;
  const sql = `DELETE FROM login WHERE name = ? AND user_role = 'waiter'`;
  db.query(sql, [name], (err) => {
    if (err) {
      console.error('Error deleting waiter:', err);
      res.status(500).json({ success: false, message: 'Failed to delete waiter' });
    } else {
      res.json({ success: true, message: 'Waiter deleted successfully' });
    }
  });
});

app.put('/api/waiters/:id', (req, res) => {
  const waiterId = req.params.id;
  const { name, contact_number, email } = req.body; // Destructure updated data from req.body
  const sql = `UPDATE login 
               SET name = ?, contact_number = ?, email = ? 
               WHERE id = ? AND user_role = 'waiter'`; // Corrected SQL query
  db.query(sql, [name, contact_number, email, waiterId], (err) => { // Pass updated values
    if (err) {
      console.error('Error updating waiter:', err);
      res.status(500).json({ success: false, message: 'Failed to update waiter' });
    } else {
      res.json({ success: true, message: 'Waiter updated successfully' });
    }
  });
});


// Endpoint to add a new waiter
app.post('/api/waiters', (req, res) => {
  const { name, email, password, contact_number} = req.body;
  const sql = `INSERT INTO login (name, email, password, contact_number,user_role) VALUES (?, ?, ?,?,'waiter') `;
  db.query(sql, [name, email, password,contact_number], (err, result) => {
    if (err) {
      console.error('Error adding waiter:', err);
      res.status(500).json({ success: false, message: 'Failed to add waiter' });
    } else {
      const newWaiter = { id: result.insertId, name, email, password,contact_number};
      res.json({ success: true, message: 'Waiter added successfully', waiter: newWaiter });
    }
  });
});
let imageEncodeCount = 0; 
app.get('/menu-items', (req, res) => {
   // Counter to track how many times image is being encoded
  const query = 'SELECT id, title, description, price, image FROM menu_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      res.status(500).json({ error: 'Error fetching menu items' });
    } else {
      // Convert image data to base64
      results.forEach((item) => {
        if (item.image) {
          imageEncodeCount++; // Increment the counter if image exists
          item.image = item.image.toString('base64');
        }
      });
      console.log('Number of times image is being encoded:', imageEncodeCount);
      res.json(results);
    }
  });
});





// Counter to track how many times image is being encoded

app.put('/edit-menu-items/:id', (req, res) => {
  const itemId = req.params.id;
  const { title, description, image, price } = req.body;

  // Log received data
  console.log('Received data:', { title, description, image, price, itemId });

  // Construct the SQL query based on whether the image is included
  let query, queryParams;
  if (image) {
    // If image is included, update all fields including the image directly using the image URL
    query = `UPDATE menu_items SET title=?, description=?, image=LOAD_FILE(?) , price=? WHERE id=?`;
    queryParams = [title, description, image, price, itemId];
  } else {
    // If image is not included, update other fields excluding the image
    query = `UPDATE menu_items SET title=?, description=?, price=? WHERE id=?`;
    queryParams = [title, description, price, itemId];
  }

  // Execute the constructed query
  db.query(query, queryParams, (err) => {
    if (err) {
      console.error('Error updating menu item:', err);
      res.status(500).json({ error: 'Error updating menu item' });
    } else {
      res.json({ message: 'Menu item updated successfully' });
    }
  });
});


// Function to encode the image data to base64





// Delete a menu item by ID
app.delete('/delete-menu-item/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM menu_items WHERE id = ?`;

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting menu item:', err);
      res.status(500).json({ error: 'Error deleting menu item' });
    } else {
      console.log('Menu item deleted successfully');
      res.sendStatus(200);
    }
  });
});
// Add a new menu item
app.post('/add-menu-item', (req, res) => {
  const { title, description, image, price } = req.body;
  const query = `INSERT INTO menu_items (title, description, image, price) VALUES (?, ?, LOAD_FILE(?), ?)`;
  const values = [title, description, image, price];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error adding menu item:', err);
      res.status(500).json({ error: 'Error adding menu item' });
    } else {
      console.log('Menu item added successfully');
      res.sendStatus(200);
    }
  });
});

// Updated backend code for fetching tables
app.get('/tables', (req, res) => {
  const query = 'SELECT * FROM table_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tables:', err);
      res.status(500).json({ error: 'Error fetching tables' });
    } else {
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
        if (item.table_image !== null) {
          item.table_image = item.table_image.toString('base64');
        }
      });
      res.json(results);
    }
  });
});
app.put('/edit-table-items/:id', (req, res) => {
  const itemId = req.params.id;
  const { table_title, table_description, table_status, table_image } = req.body;

  // Log received data
  console.log('Received data:', { table_title, table_description, table_status, table_image, itemId });

  // Construct the SQL query
  let query, queryParams;
  if (table_image !== undefined) {
    // If table_image is provided, update all fields including the image directly using the image URL
    query = `UPDATE table_items SET table_title=?, table_description=?, table_status=?, table_image=LOAD_FILE(?) WHERE id=?`;
    queryParams = [table_title, table_description, table_status, table_image, itemId];
  } else {
    // If table_image is not provided, update other fields excluding the image
    query = `UPDATE table_items SET table_title=?, table_description=?, table_status=? WHERE id=?`;
    queryParams = [table_title, table_description, table_status, itemId];
  }

  // Execute the constructed query
  db.query(query, queryParams, (err) => {
    if (err) {
      console.error('Error updating table item:', err);
      res.status(500).json({ error: 'Error updating table item' });
    } else {
      res.json({ message: 'Table item updated successfully' });
    }
  });
});




// Function to encode the image data to base64





// Delete a menu item by ID
app.delete('/delete-table-item/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM table_items WHERE id = ?`;

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting menu item:', err);
      res.status(500).json({ error: 'Error deleting menu item' });
    } else {
      console.log('Menu item deleted successfully');
      res.sendStatus(200);
    }
  });
});
// Add a new menu item
app.post('/add-table-item', (req, res) => {
  const { table_title, table_description,table_status ,table_image } = req.body;
  const query = `INSERT INTO table_items (table_title, table_description, table_status , table_image) VALUES (?, ?, ?, LOAD_FILE(?))`;
  const values = [table_title, table_description,table_status ,table_image];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error adding menu item:', err);
      res.status(500).json({ error: 'Error adding menu item' });
    } else {
      console.log('Menu item added successfully');
      res.sendStatus(200);
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
