import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import WaitersList from './WaitersList';
import LeftNavbar from '../Components/leftNavbar';

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/orders');
      const orders = response.data.orders;
      const recent = orders.filter(order => order.Status !== 'Cancelled');
      const cancelled = orders.filter(order => order.Status === 'Cancelled');
      setRecentOrders(recent);
      setCancelledOrders(cancelled);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <LeftNavbar />
      <div className="dashboard">
        <h1>Dashboard</h1>

        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Table No</th>
              <th>Food</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Takeaway</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={orderOrderID}>
                <td>{order.Name}</td>
                <td>{order.TableNo}</td>
                <td>{order.Food}</td>
                <td>{order.Price}</td>
                <td>{order.Quantity}</td>
                <td>{order.TotalAmount}</td>
                <td>{order.Status}</td>
                <td>{order.Takeaway ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Cancelled Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Table No</th>
              <th>Food</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Takeaway</th>
            </tr>
          </thead>
          <tbody>
            {cancelledOrders.map(order => (
              <tr key={order.OrderID}>
                <td>{order.Name}</td>
                <td>{order.TableNo}</td>
                <td>{order.Food}</td>
                <td>{order.Price}</td>
                <td>{order.Quantity}</td>
                <td>{order.TotalAmount}</td>
                <td>{order.Status}</td>
                <td>{order.Takeaway ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sidebar">
        <WaitersList />
      </div>
    </div>
  );
}

export default Dashboard;
