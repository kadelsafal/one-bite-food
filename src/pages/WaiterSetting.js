import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/settings.css';
import LeftNavbar from '../Components/leftNavbar';

const WaiterSetting = () => {
  const [waiters, setWaiters] = useState([]);
  const [newWaiter, setNewWaiter] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(null); // Track which waiter is in edit mode

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

  const handleInputChange = (e, id, fieldName) => {
    const { value, name } = e.target;
    if (id) {
      const updatedWaiters = waiters.map(waiter => {
        if (waiter.id === id) {
          return { ...waiter, [fieldName]: value };
        }
        return waiter;
      });
      setWaiters(updatedWaiters);
    } else {
      setNewWaiter({ ...newWaiter, [name]: value });
    }
  };

  const handleAddWaiter = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/waiters', newWaiter);
      setWaiters([...waiters, response.data.waiter]);
      setNewWaiter({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding waiter:', error);
      setError('Failed to add waiter. Please try again later.');
    }
  };

  const handleDeleteWaiter = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/waiters/${id}`);
      setWaiters(waiters.filter(waiter => waiter.id !== id));
    } catch (error) {
      console.error('Error deleting waiter:', error);
      setError('Failed to delete waiter. Please try again later.');
    }
  };

  const handleEditWaiter = async (id) => {
    try {
      const editedWaiter = waiters.find(waiter => waiter.id === id);
      await axios.put(`http://localhost:3001/api/waiters/${id}`, editedWaiter);
      setEditMode(null); // Disable edit mode after editing
    } catch (error) {
      console.error('Error updating waiter:', error);
      setError('Failed to update waiter. Please try again later.');
    }
  };

  return (
    <div className="waiter-setting-container">
      <LeftNavbar />
      {error && <p className="error-message">{error}</p>}
      <div className="waiter-list">
        <h2>Waiter Settings</h2>
        <h3>Waiters List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {waiters.map(waiter => (
            <tr key={waiter.id}>
              <td>{editMode === waiter.id ? (
                <input type="text" value={waiter.name} onChange={e => handleInputChange(e, waiter.id, 'name')} />
              ) : waiter.name}</td>
              <td>{editMode === waiter.id ? (
                <input type="text" value={waiter.email} onChange={e => handleInputChange(e, waiter.id, 'email')} />
              ) : waiter.email}</td>
              <td>
                {editMode === waiter.id ? (
                  <button onClick={() => handleEditWaiter(waiter.id)}>Save</button>
                ) : (
                  <button onClick={() => setEditMode(waiter.id)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteWaiter(waiter.id)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      <div className="add-waiter">
        <h3>Add Waiter</h3>
        <input type="text" name="name" value={newWaiter.name} placeholder="Name" onChange={handleInputChange} />
        <input type="text" name="email" value={newWaiter.email} placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" value={newWaiter.password} placeholder="Password" onChange={handleInputChange} />
        <button onClick={handleAddWaiter}>Add Waiter</button>
      </div>
      </div>
    </div>
  );
};

export default WaiterSetting;
