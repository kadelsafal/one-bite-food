import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WaiterList.css';

const WaiterList = () => {
  const [waiters, setWaiters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWaiters();
  }, []);

  const fetchWaiters = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/waiters');
      setWaiters(response.data.waiters);
    } catch (error) {
      console.error('Error fetching waiters:', error);
      setError('Failed to fetch waiters. Please try again later.');
    }
  };

  return (
    <div className="waiter-list">
      {error && <p className="error-message">{error}</p>}
      <h2>Active Waiters</h2>
      <ul>
        {waiters.map(waiter => (
          <li key={waiter.id}>
            {/* Display the waiter's picture */}
            <div className="waiter-picture" style={{ backgroundImage: `url(${waiter.image_url})` }}></div>
            {/* Display the waiter's name */}
            <span className="waiter-name">{waiter.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WaiterList;
