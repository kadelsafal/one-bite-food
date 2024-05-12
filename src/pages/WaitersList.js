import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WaiterList.css';

const WaiterList = () => {
  // State to store fetched waiter data
  const [waiters, setWaiters] = useState([]);

  // Effect to fetch waiter data from the API endpoint
  useEffect(() => {
    // Fetch waiter data from the API endpoint
    axios.get('http://localhost:3001/api/waiter') // Assuming backend is running on port 3001
      .then(response => {
        // Update state with the fetched waiter data
        setWaiters(response.data.waiters);
      })
      .catch(error => {
        console.error('Error fetching waiter data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div className="waiter-list">
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
