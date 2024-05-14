import { useState } from 'react'; // Import React and useState from react library
import '../styles/settings.css'; // Check the CSS import path
import LeftNavbar from '../Components/leftNavbar'; // Check the import path and component name

const WaiterSetting = () => {
  // State variables for waiters, username, and password
  const [waiters, setWaiters] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle adding a new waiter
  const handleAddWaiter = () => {
    if (username && password) {
      const newWaiter = { username, password };
      setWaiters([...waiters, newWaiter]);
      setUsername('');
      setPassword('');
    }
  };

  // Function to handle removing a waiter
  const handleRemoveWaiter = (index) => {
    const updatedWaiters = [...waiters];
    updatedWaiters.splice(index, 1);
    setWaiters(updatedWaiters);
  };

  return (
    <div className="waiter-setting-container">
      <LeftNavbar /> {/* Include LeftNavbar component */}
      <h2>Waiter Settings</h2>
      <div className="waiter-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddWaiter}>Add Waiter</button>
      </div>
      <div className="waiter-list">
        {/* Render list of waiters */}
        {waiters.map((waiter, index) => (
          <div key={index} className="waiter-item">
            <span>Username: {waiter.username}</span>
            <span>Password: {waiter.password}</span>
            <button onClick={() => handleRemoveWaiter(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaiterSetting;
