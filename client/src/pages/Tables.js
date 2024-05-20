import { useState, useEffect } from 'react';
import Reservation from './reservation'; 
import '../styles/table.css'; // Importing CSS styles for the table component
import titlepic from '../assets/food4.jpg'; // Importing title image


import Card from "../Card"; // Importing Card component
import LoginPopup from '../Components/loginpop';
import PropTypes from 'prop-types';

function Tables({ isLoggedIn, handleLogin,tableStatus,setTableStatus }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservation, setShowReservation] = useState(false); // Initialize with false
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Initialize with false
  const [TableItems, setTableItems] = useState([]);

  const options = [
    { value: "Table 1", label: "Table 1" },
    { value: "Table 2", label: "Table 2" },
    { value: "Table 3", label: "Table 3" },
    { value: "Table 4", label: "Table 4" },
    { value: "Table 5", label: "Table 5" },
    { value: "Table 6", label: "Table 6" },
  ];
  const fetchTableStatus = async () => {
    try {
      const statuses = {};
      for (const option of options) {
        const response = await fetch('http://localhost:3001/api/checkTable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tableNumber: option.value }) // Using option.value directly
        });
        const data = await response.json();
        statuses[option.value] = data.booked ? 'booked' : 'available';
      }
      setTableStatus(statuses);
    } catch (error) {
      console.error('Error fetching table status:', error);
    }
  };
  
  useEffect(() => {
    fetchTableItems();
  }, []);
  
  const fetchTableItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/table-items');
      const data = await response.json();
      setTableItems(data);
    } catch (error) {
      console.error('Error fetching table items:', error);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchTableStatus();
    }
  }, [isLoggedIn]);

  const handleTableClick = (table) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      window.scrollTo(0, 0); // Scroll to top of the page
      return;
    }

    setSelectedTable(table);
    setShowReservation(true);
  };

  const handleReservationSuccess = () => {
    fetchTableStatus(); // Refresh table status after successful reservation
  };

  return (
    <div>
      <main>
        <div className='title'>
          <div className='bgpic'>
            <img src={titlepic} alt='img' />
          </div>
        </div>
        <section id='cards'>
          <div className='heading-txt'>
            <h1>Tables</h1>
          </div>
          <div className='cards'>
          {TableItems.map((item, index) => (
  <Card 
    key={index}
    layout="default"
    image={item.table_image ? `data:image/jpeg;base64,${item.table_image}` : null} // Add null check here
    title={item.table_title} // Assuming each table item object has a 'title' property
    description={item.table_description} // Assuming each table item object has a 'description' property
    button={tableStatus[item.table_title] === 'booked' ? "• Booked" : "Book a table"}
    booked={tableStatus[item.table_title] === 'booked' ? "• Booked" : "Available"}
    onClick={() => handleTableClick(item.table_title)}
  />
))}

          </div>
        </section>
        
        {reservation && isLoggedIn && (
  <Reservation 
    selectedTableValue={selectedTable}
    onClose={() => setShowReservation(false)} 
    onReservationSuccess={handleReservationSuccess} // Pass the onReservationSuccess function here
    tableStatus={tableStatus}
    setTableStatus={setTableStatus}
    
  />
)}

        
        {showLoginPopup && (
          <LoginPopup 
            onClose={() => setShowLoginPopup(false)} 
            handleLogin={handleLogin} 
          />
        )}
      </main>
    </div>
  );
}

Tables.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  tableStatus: PropTypes.object.isRequired,
  setTableStatus: PropTypes.func.isRequired
};

export default Tables;

