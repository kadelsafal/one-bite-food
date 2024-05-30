import { useState, useEffect } from 'react';
import LeftNavbar from '../Components/leftNavbar';
import axios from 'axios';
import '../styles/pay.css';

function TablePay() {
  // State variables
  const [tables, setTables] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    tableNo: '',
    orders: [],
    totalCost: 0
  });

  // Fetch tables function
  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  // Fetch orders for the selected table
  // Fetch orders function (both online and table orders)
  const fetchOrders = async () => {
    try {
      let response;
      if (orderDetails.takeaway) {
        response = await axios.get(`http://localhost:3001/api/menu_orders?name=${orderDetails.name}`);
      } else {
        response = await axios.get(`http://localhost:3001/api/tableorders?table_no=${orderDetails.tableNo}`);
      }
      const fetchedOrders = response.data.orders;
      console.log('Fetched orders:', fetchedOrders); // Log the fetched orders
      setOrderDetails({ ...orderDetails, orders: fetchedOrders });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const deleteOrders = async (tableNo) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteorders?table_no=${tableNo}`);
      console.log('Orders deleted successfully');
    } catch (error) {
      console.error('Error deleting orders:', error);
    }
  };
  const insertOrdersToFulfilled = async () => {
    const { tableNo, takeaway, orders } = orderDetails;
  
    if (tableNo && orders && orders.length > 0) {
      try {
        const dataToSend = {
          orders: orders
          .filter(order => order.menu_item_title) // Filter out orders without menu_item_title
          .map(order => ({
            menu_item_title: order.menu_item_title,
            menu_price: order.price,
            quantity: order.quantity,
            status: 'Table Dining' // Set status for table orders
          }))
        };
        console.log('Data to be sent to API (Table):', dataToSend);
        await axios.post('http://localhost:3001/api/fulfilled-order', dataToSend);
        console.log('Orders inserted into fulfilled_orders (Table) successfully');
      } catch (error) {
        console.error('Error inserting orders into fulfilled_orders (Table):', error);
      }
    }
  
    if (takeaway && orders && orders.length > 0) {
      try {
        const dataToSend = {
          orders: orders
          .filter(order => order.product_title) // Filter out orders without menu_item_title
          .map(order => ({
            menu_item_title: order.product_title,
            menu_price: order.product_price,
            quantity: order.product_quantity,
            status: 'Takeaway' // Set status for takeaway orders
          }))
        };
        console.log('Data to be sent to API (Takeaway):', dataToSend);
        await axios.post('http://localhost:3001/api/fulfilled-order', dataToSend);
        console.log('Orders inserted into fulfilled_orders (Takeaway) successfully');
      } catch (error) {
        console.error('Error inserting orders into fulfilled_orders (Takeaway):', error);
      }
    }
  };
   
const handlesearch = () =>{
  if (orderDetails.name.trim() !== '') {
    console.log("name",orderDetails.name);
    fetchOrders();
    console.log("Button clicked");
  } else {
    console.log("Name is required");
  }
};
  // Fetch tables on component mount
  useEffect(() => {
    fetchTables();
  }, []);

  // Fetch orders for the selected table on component mount
  useEffect(() => {
    fetchOrders(orderDetails.tableNo);
  }, [orderDetails.tableNo]);

  // Function to handle payment
  const handlePayment = () => {
    insertOrdersToFulfilled(orderDetails.tableNo, orderDetails.orders);
    deleteOrders(orderDetails.tableNo);
  };

  // Calculate total cost
  useEffect(() => {
    let totalCost = 0;
    orderDetails.orders.forEach(order => {
      // Check if the order is for table dining
      if (!orderDetails.takeaway) {
        totalCost += order.quantity * order.price;
      } else {
        // For takeaway orders
        totalCost += order.product_quantity * order.product_price;
      }
    });
    setOrderDetails({ ...orderDetails, totalCost });
  }, [orderDetails.orders, orderDetails.takeaway]);
  return (
    <div className='pay-container'>
    <LeftNavbar />
    <div className='Payment-content'>
      
    <h1>Payment</h1>
    <div className='Payment box'>
      <form>
      <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={orderDetails.takeaway}
              onChange={(e) => setOrderDetails({ ...orderDetails, takeaway: e.target.checked })}
            />
            <p>Takeaway</p>
          </label>
          {/* Add additional elements here if needed */}
        </div>
        {orderDetails.takeaway && (
          <div className='box'>
          <form>
            <label>
              Customer Name:
              <input
                type="text"
                value={orderDetails.name}
                onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
              />
            </label>
            <button className="search_btn" type="button" onClick={handlesearch}>Search</button>
            <table>
              <thead>
                <tr>
                  <th>Menu Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.product_title}</td>
                    <td>{order.product_quantity}</td>
                    <td>{order.product_price}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          </div>
        )}
        {!orderDetails.takeaway && (
         <form>
          
            <label>
              Select Table:
              <select
                value={orderDetails.tableNo}
                onChange={(e) => {
                  const tableNo = e.target.value;
                  setOrderDetails({ ...orderDetails, tableNo });
                  fetchOrders(tableNo);
                }}
              >
                <option value="">Select Table</option>
                {tables.map(table => (
                  <option key={table.id} value={table.table_title}>{table.table_title}</option>
                ))}
              </select>
            </label>
            <table>
              <thead>
                <tr>
                  <th>Menu Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.menu_item_title}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </form>
        )}
        <p className='total-cost'>Total Cost: {orderDetails.totalCost}</p>
        <button className='pay-btn' onClick={handlePayment}>Pay With Cash</button>
      </form>
    </div>
  </div>
  </div>
  );
}

export default TablePay;
