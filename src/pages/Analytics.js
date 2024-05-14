import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/analytics.css';
import LeftNavbar from '../Components/leftNavbar';

const Analytics = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/orders');
      const ordersData = response.data.orders;
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
    }
  };

  return (
    <div className="analytics-page">
  <LeftNavbar />
  <div className='rightSide'>
  <div className="sales-summary">
    <h1 className="title">Admin analytics for OneBite Foods</h1>
    <h2 className="sales-amount">Today&apos;s Sales: $6,452</h2>
    <h3 className="sales-period">This week: $42,502</h3>
    <h3 className="sales-period">This month: $56,201</h3>
  </div>
  <div className="order-table-container">
    <h2 className="section-title">Orders</h2>
    {error ? (
      <p className="error-message">{error}</p>
    ) : (
      <table className="order-table">
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
          {orders.map(order => (
            <tr key={order.OrderID}>
              <td>{order.Name}</td>
              <td>{order.TableNo}</td>
              <td>{order.food}</td>
              <td>{order.Price}</td>
              <td>{order.Quantity}</td>
              <td>{order.TotalAmount}</td>
              <td>{order.Status}</td>
              <td>{order.Takeaway ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  </div>
</div>

  );
};

export default Analytics;
