import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/analytics.css';
import LeftNavbar from '../Components/leftNavbar';

const Analytics = () => {
  const [orders, setOrders] = useState([]);

  const [error, setError] = useState(null);
  const [weeklySales, setWeeklySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/analytics-orders');
      const ordersData = response.data.data; // Correct property name to access the data
      setOrders(ordersData);
      calculateSalesAndOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
    }
  };
  useEffect(() => {
    if (orders.length > 0) {
      calculateSalesAndOrders(orders);
    }
  }, [orders]);
  const calculateSalesAndOrders = (ordersData) => {
    
    const thisWeek = getWeekStartDate(new Date()).toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().split('-').slice(0, 2).join('-');
    
    
    const weekly = ordersData.filter(order => order.timestamp.split(' ')[0] >= thisWeek);
    const monthly = ordersData.filter(order => order.timestamp.split('-').slice(0, 2).join('-') === thisMonth);
    
   
    const weeklyTotal = weekly.reduce((acc, order) => acc + order.menu_price * order.quantity, 0);
    const monthlyTotal = monthly.reduce((acc, order) => acc + order.menu_price * order.quantity, 0);
  
   
  
  
    
    setWeeklySales(weeklyTotal);
    setMonthlySales(monthlyTotal);
   
  };
  
  const getWeekStartDate = (date) => {
    const weekStartDate = new Date(date);
    weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());
    return weekStartDate;
  };
 
  return (
    <div className="analytics-page">
      <LeftNavbar />
      <div className='rightSide'>
        <div className="sales-summary">
          <h1 className="title">Admin analytics for OneBite Foods</h1>
          
          
          <h3 className="sales-period">This week: ${weeklySales}</h3>
          <h3 className="sales-period">This month: ${monthlySales}</h3>
          
        </div>
        <div className="order-table-container">
          <h2 className="section-title">Orders</h2>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>menu_item_title</th>
                  <th>menu_price</th>
                  <th>quantity</th>            
                  <th>status</th>
                  <th>timestamp</th>
                </tr>
              </thead>
              <tbody>
  {orders && orders.length > 0 ? (
    orders.map(order => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.menu_item_title}</td>
        <td>{order.menu_price}</td>
        <td>{order.quantity}</td>
        <td>{order.status}</td>
        <td>{order.timestamp}</td>
      </tr>
    ))
  ) : null}
</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
