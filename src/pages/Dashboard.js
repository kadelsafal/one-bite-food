import '../styles/dashboard.css'
import WaitersList from './WaitersList';

const Dashboard = () => {
  // Mock data for recent orders and cancelled orders
  const recentOrders = [
    // Sample recent orders data
    { id: 1, name: "John Doe", tableNo: 5, food: "Burger", price: 10, quantity: 2, totalAmount: 20, status: "Pending", takeaway: true },
    { id: 2, name: "Alice Smith", tableNo: 3, food: "Pizza", price: 12, quantity: 1, totalAmount: 12, status: "Completed", takeaway: false },
  ];

  const cancelledOrders = [
    // Sample cancelled orders data
    { id: 1, name: "Jane Doe", tableNo: 7, food: "Salad", price: 8, quantity: 1, totalAmount: 8, status: "Cancelled", takeaway: false },
    { id: 1, name: "Abhi Giri", tableNo: 7, food: "Salad", price: 8, quantity: 1, totalAmount: 8, status: "Cancelled", takeaway: false },
    { id: 1, name: "Aarya Bhattarai", tableNo: 7, food: "Salad", price: 8, quantity: 1, totalAmount: 8, status: "Cancelled", takeaway: false }
  ];

  return (
    <div className="dashboard-container">
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
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.tableNo}</td>
              <td>{order.food}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>{order.takeaway ? 'Yes' : 'No'}</td>
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
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.tableNo}</td>
              <td>{order.food}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>{order.takeaway ? 'Yes' : 'No'}</td>
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
