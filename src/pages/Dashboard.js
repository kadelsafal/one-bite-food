import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import WaitersList from './WaitersList';
import LeftNavbar from '../Components/leftNavbar';

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [onlineOrders, setOnlineOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchOnlineOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/orders');
      const orders = response.data.orders;
      const recent = orders.filter(order => order.Status !== 'Cancelled'); // Assuming the status property is 'Status', adjust as necessary
      setRecentOrders(recent);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const fetchOnlineOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/online-orders');
      const orders = response.data.orders;
      setOnlineOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <LeftNavbar />
      <div className="dashboard">
        <h1>Dashboard</h1>

        <h2>Recent Table Orders</h2>
        <div className='recent-orders'>
        <table>
          <thead>
            <tr>
              <th>Table No</th>
              <th>Menu_item name</th>
              <th>Quantity</th>
              <th>Status</th>
              
              
              
            </tr>
          </thead>
          <tbody>
            
          {recentOrders.map(order => (
  <tr key={order.id}> {/* Assuming 'id' is the unique identifier */}
    <td>{order.table_no}</td>
    <td>{order.menu_item_title}</td>
    <td>{order.quantity}</td>
    <td>{order.status}</td>
    
     {/* Corrected access to menu_item_title */}
    
  </tr>
))}

          </tbody>
        </table>
        </div>
        <h2>Online  Takeaway Orders</h2>
        {/* You can add your cancelled orders table here */}
        <div className='recent-orders'>
        
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Product_title</th>
              <th>Product_quantity</th>
              
              
              
            </tr>
          </thead>
          <tbody>
            
          {onlineOrders.map(order => (
  <tr key={order.id}> {/* Assuming 'id' is the unique identifier */}
    <td>{order.email}</td>
    <td>{order.name}</td>
    <td>{order.product_title}</td>
    <td>{order.product_quantity}</td>
    
     {/* Corrected access to menu_item_title */}
    
  </tr>
))}

          </tbody>
        </table>
      </div>
      </div>
      <div className="sidebar">
        <WaitersList />
      </div>
    </div>
  );
}

export default Dashboard;
