import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker'; // Importing the date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Importing styles for the date picker
import '../styles/reservation.css'; // Importing custom CSS styles for the reservation popup
import { useContext } from 'react';
import { UserContext } from '../Components/UserContext';
import Select from 'react-select';

function Reservation({ onClose, selectedTableValue,onReservationSuccess, setTableStatus}) {
    // State variables for name, time, and date
    
    const [date, setDate] = useState(null);
    const { email } = useContext(UserContext);
    const { name } = useContext(UserContext);
    const [selectedTable, setselectedTable] = useState(selectedTableValue ? { value: selectedTableValue, label: selectedTableValue } : null); // Initialize selectedTable with selectedTableValue
    const [BookStatus, setBookStatus] = useState(null);
    const options = [
        { value: "Table 1", label: "Table 1" },
        { value: "Table 2", label: "Table 2" },
        { value: "Table 3", label: "Table 3" },
        { value: "Table 4", label: "Table 4" },
        { value: "Table 5", label: "Table 5" },
        { value: "Table 6", label: "Table 6" },
        
    ]
    useEffect(() => {
        // Set the default value of the Select component based on the table clicked
        if (selectedTableValue) {
            const tableOption = options.find(option => option.value === selectedTableValue);
            setselectedTable(tableOption);
        }
    }, [selectedTableValue]);
// Function to check if a table is booked
const checkTableAvailability = async (tableNumber) => {
    try {
      const response = await fetch('http://localhost:3001/api/checkTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableNumber })
      });
      const data = await response.json();
      return data.booked; // Return true if table is booked, false otherwise
    } catch (error) {
      console.error('Error checking table availability:', error);
      return true; // Assume table is booked in case of an error
    }
  };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!date || !selectedTable) {
            setBookStatus({ success: false, message: 'Please fill in all fields' });
            return;
        }
        
        const tableNumber = selectedTable.value;
        console.log("Selected table for submission:", tableNumber);
        const isalreadyTableBooked = await checkTableAvailability(tableNumber);
        if (isalreadyTableBooked) {
          setBookStatus({ success: false, message: 'Table is already booked' });
          return;
        }
    
        try {
            const response = await fetch('http://localhost:3001/api/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, date, tableNumber, name })
            });
            const data = await response.json();
            if (data.success) {
                console.log('Reservation saved successfully');
                setBookStatus({ success: true, message: data.message });
                 // Update table status to "booked"
            setTableStatus(prevStatus => {
                return {
                    ...prevStatus,
                    [tableNumber]: 'booked'
                };
            });
                console.log('Calling onReservationSuccess with tableNumber:', tableNumber); // Add this line
                
                if (onReservationSuccess) {
                    onReservationSuccess(tableNumber);
                    console.log('Calling onReservationSuccess with tableNumber:', tableNumber);
                    
                }
                setTimeout(() => {
                    onClose();
                     
                }, 2000);
            } else {
                console.error('Failed to save reservation:', data.message);
                setBookStatus({ success: false, message: data.message });
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
        }
    };
    
    // Effect hook to handle overflow styling
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Preventing scrolling when the reservation popup is open
        return () => {
            document.body.style.overflow = 'unset'; // Re-enable scrolling when the reservation popup is closed
        };
    }, []);
    const handleTableSelect = selectedOption => {
        console.log("Selected table:", selectedOption);
        setselectedTable(selectedOption);
    };
    
    
    return (
        <main>
            {/* Reservation popup container */}
            <div className='reservation-container'>
                <div className={`reservation-content ${BookStatus ? 'blur-background' : ''}`}>
                    {/* Close button */}
                    <div className='closebtn'>
                        <button className="close-btn" onClick={onClose}>X</button>
                    </div>
                    {/* Reservation content */}
                    
                        {/* Right box containing reservation form */}
                        <div className='reservation-rightbox'>
                            <h1>Reservation</h1>
                            <p>We provide a convenient online reservation system. Simply select your desired date, time.</p>
                            {/* Reservation form */}
                            <form onSubmit={handleFormSubmit}>
                                {/* Name input field */}
                                <div className='textfield'>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        disabled
                                        required
                                    />
                                </div>
                              
                                {/* Date picker */}
                                <div className='datefield'>
                                    <label htmlFor="date">Date:</label>
                                    <DatePicker
                                        id="date"
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        minDate={new Date()}
                                        maxDate={new Date(Date.now())} // Two days from now
                                        dateFormat="yyyy-MM-dd"
                                        required
                                    />
                                </div>
                                <div className='tablefield'>
                                    <label htmlFor='table'>Select Table : </label>
                                    <Select
                                        options={options}
                                        value={selectedTable}
                                        placeholder="Select your Table"
                                        onChange={handleTableSelect}
                                        
                                    
                                        isSearchable
                                        noOptionsMessage={() => "No table found"}
                                        
                                    />
                                </div>
                                {/* Submit button */}
                                <button type="submit" > Submit</button>
                            </form>
                        </div>
                    </div>

                    
                </div>
                {/* Book status dialog */}
                {BookStatus && (
                        <div className={`book-dialog ${BookStatus.success ? 'success' : 'error'}`}>
                            <p>{BookStatus.message}</p>
                            <button onClick={() => setBookStatus(null)}>Close</button>
                        </div>
                    )}
           
        </main>
    );
}

// PropTypes for Reservation component
Reservation.propTypes = {
    onClose: PropTypes.func.isRequired, // Function to close the reservation popup
    selectedTableValue: PropTypes.string,
    onReservationSuccess: PropTypes.func.isRequired, // Callback function to trigger when reservation is successfully submitted
    tableStatus: PropTypes.object.isRequired,
    setTableStatus: PropTypes.func.isRequired,
};


export default Reservation;
