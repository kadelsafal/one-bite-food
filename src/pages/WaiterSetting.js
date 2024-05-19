import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/settings.css';
import LeftNavbar from '../Components/leftNavbar';

const WaiterSetting = () => {
  const [waiters, setWaiters] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const [newWaiter, setNewWaiter] = useState({ name: '', email: '', password: '', contact_number: '' });
  const [error, setError] = useState('');
  const [editOverlayVisible, setEditOverlayVisible] = useState(false);
  const [addOverlayVisible, setAddOverlayVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchWaiters();
    // Add event listener to detect clicks outside the table
    document.addEventListener('click', handleOutsideClick);

    // Cleanup function to remove event listener on component unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    const target = event.target;
    // Check if the click target is not within the table or edit/delete buttons
    if (!target.closest('table') && !target.closest('.waiter-list button') && !target.closest('.overlay-content')) {
      setSelectedWaiter(null); // Clear the selected waiter
    }
  };


  const fetchWaiters = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/waiters');
      setWaiters(response.data.waiters);
    } catch (error) {
      console.error('Error fetching waiters:', error);
      setError('Failed to fetch waiters. Please try again later.');
    }
  };

  const handleEditWaiter = async () => {
    if (selectedWaiter) {
      try {
        await axios.put(`http://localhost:3001/api/waiters/${selectedWaiter.id}`, selectedWaiter);
        fetchWaiters();
        setEditOverlayVisible(false); // Close the edit overlay after submitting changes
        setEditing(false);
      } catch (error) {
        console.error('Error editing waiter:', error);
        setError('Failed to edit waiter. Please try again later.');
      }
    } else {
      alert('Please select a waiter to edit.');
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewWaiter(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
    setSelectedWaiter(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const selectWaiter = (waiter) => {
    setSelectedWaiter(waiter);
  };
  const handleDeleteWaiter = async () => {
    if (selectedWaiter) {
      try {
        await axios.delete(`http://localhost:3001/api/waiters/${selectedWaiter.name}`);
        fetchWaiters();
        setSelectedWaiter(null); // Deselect the waiter after deletion
      } catch (error) {
        console.error('Error deleting waiter:', error);
        setError('Failed to delete waiter. Please try again later.');
      }
    } else {
      alert('Please select a waiter to delete.');
    }
  };
  const handleAddWaiter = async () => {
    try {
      // Construct the new waiter object from the form inputs
      const waiterData = {
        name: newWaiter.name,
        email: newWaiter.email,
        contact_number: newWaiter.contact_number,
        password: newWaiter.password
      };
  
      // Send a POST request to add the new waiter
      await axios.post('http://localhost:3001/api/waiters', waiterData);
  
      // Refresh the waiter list
      fetchWaiters();
      setSelectedWaiter(null);
      // Close the add overlay after submitting changes
      setAddOverlayVisible(false);
    } catch (error) {
      console.error('Error adding waiter:', error);
      setError('Failed to add waiter. Please try again later.');
    }
  };
  const handleEditButtonClick = () => {
    if (!selectedWaiter) {
      setMessage('Please select a waiter to edit.');
    } else {
      setEditing(true);
      setEditOverlayVisible(true);
    }
  };
 

  return (
    <div className="waiter-setting-container">
      <LeftNavbar />
      {error && <p className="error-message">{error}</p>}
      {message && <p className="info-message">{message}</p>}
      <div className="waiter-list">
        <h2>Waiter Settings</h2>
        <h3>Waiters List</h3>
        <table className='round'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {waiters.map(waiter => (
              <tr
                key={waiter.id}
                className={`${selectedWaiter && selectedWaiter.id === waiter.id ? 'selected-row' : ''} ${waiter.id % 2 === 0 ? 'even-row' : ''}`}
                onClick={() => selectWaiter(waiter)}
              >
                <td>{waiter.name}</td>
                <td>{waiter.email}</td>
                <td>{waiter.contact_number}</td>
                <td>{waiter.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='waiters-btns'>
          <button className="edit-btn" onClick={handleEditButtonClick}>Edit</button>
          <button className="delete-btn" onClick={() => { handleDeleteWaiter(); setSelectedWaiter(null); }}>Delete</button>
          <button className="add-btn" onClick={() => {setSelectedWaiter(null);setAddOverlayVisible(true)}}>Add Waiter</button>
        </div>
      </div>
      {/* Edit Waiter Overlay */}
      {editOverlayVisible && selectedWaiter && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Edit Waiter</h3>
            <input
              type="text"
              value={selectedWaiter.name}
              onChange={e => handleInputChange(e, 'name')}
              placeholder="Name"
            />
            <input
              type="text"
              value={selectedWaiter.email}
              onChange={e => handleInputChange(e, 'email')}
              placeholder="Email"
            />
            <input
              type="text"
              value={selectedWaiter.contact_number}
              onChange={e => handleInputChange(e, 'contact_number')}
              placeholder="Contact Number"
            />
            <input
              type="password"
              value={selectedWaiter.password}
              onChange={e => handleInputChange(e, 'password')}
              placeholder="Password"
            />
            <div className="overlay-buttons">
              {editing && (
                <>
                   <button onClick={() => { handleEditWaiter(); setSelectedWaiter(null); }}>Submit</button>
                   <button onClick={() => { setEditOverlayVisible(false); setSelectedWaiter(null); }}>Cancel</button>

                </>
              )}
            </div>
          </div>
        </div>
      )}
       {/* Add Waiter Overlay */}
       {addOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Add Waiter</h3>
            <input
              type="text"
              value= {newWaiter.name}
              onChange={e => handleInputChange(e, 'name')}
              placeholder="Name"
            />
            <input
              type="text"
              value={newWaiter.email}
              onChange={e => handleInputChange(e, 'email')}
              placeholder="Email"
            />
            <input
              type="text"
              value={newWaiter.contact_number}
              onChange={e => handleInputChange(e, 'contact_number')}
              placeholder="Contact Number"
            />
            <input
              type="password"
              value={newWaiter.password}
              onChange={e => handleInputChange(e, 'password')}
              placeholder="Password"
            />
            <div className="overlay-buttons">
              <button onClick={handleAddWaiter}>Submit</button>
              <button onClick={() => setAddOverlayVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaiterSetting;
