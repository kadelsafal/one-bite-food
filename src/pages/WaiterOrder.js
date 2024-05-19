import { useState, useEffect } from 'react';
import '../styles/menu.css'; // Make sure to import your CSS file

import Card from "../Card";
import LeftNavbar from '../Components/leftNavbar';
import axios from 'axios';

function WaiterOrder() {
  const [showOrderModal, setShowOrderModal] = useState(false); // State to manage modal visibility
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    tableNo: '',
    menuItemId: '', // Added menuItemId to store the selected menu item ID
    quantity: '',
    diningOption: '', // Added diningOption to store the selected dining option (Takeaway or Table Dining)
  });

  useEffect(() => {
    fetchMenuItems();
    fetchTables();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/menu-items');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  // State to manage success dialog visibility
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Function to handle opening the order modal
  const openOrderModal = (menuItem) => {
    setShowOrderModal(true);
    // Set the selected menu item ID and title when opening the modal
    setOrderDetails({ 
      ...orderDetails, 
      menuItemId: menuItem.id,
      menuItem: menuItem // Set the selected menuItem object
    });
  };

  // Function to handle closing the order modal
  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleSubmitOrders = async (e) => {
    e.preventDefault();
    try {
      // Prepare the order data to be sent to the backend
      const orderData = {
        tableNo: orderDetails.tableNo,
         menu_items_id: orderDetails.menuItemId,
        quantity: orderDetails.quantity,
        status: orderDetails.diningOption, // Assuming diningOption corresponds to status
      };
  
      // Log the orderData to the console
      console.log('Order Data:', orderData);
  
      // Send order data to the backend to be stored in the database
      const response = await axios.post('http://localhost:3001/api/submit-order', orderData);
  
      if (response.status === 200) {
        // Orders successfully submitted, close the modal or overlay
        closeOrderModal();
        // Optionally, you can reset the orders state here
        setOrders([...orders, orderData]);
  
        // Show success dialog
        setShowSuccessDialog(true);
  
        // Automatically close the success dialog after 2 seconds
        setTimeout(() => {
          setShowOrderModal(false);
          setShowSuccessDialog(false);
        }, 6000);
      } else {
        throw new Error('Failed to submit orders');
      }
    } catch (error) {
      console.error('Error submitting orders:', error);
      // Handle error
    }
  };
  
  
  return (
    <div className='container'>
      <LeftNavbar />
      <main>
        <div className='heading-txt'>
          <h1>Waiter Order</h1>
        </div>
        <div className='cards'>
          {menuItems.map((menuItem) => (
            <Card
              key={menuItem.id}
              layout="menu"
              image={`data:image/jpeg;base64,${menuItem.image}`}
              title={menuItem.title}
              description={menuItem.description}
              price={menuItem.price}
              buttons={<button onClick={() => openOrderModal(menuItem)}>Order</button>}
            />
          ))}
        </div>
      </main>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="order-overlay">
          <div className="order-modal">
            <div className="order-modal-content">
              <h2>Enter Order Details</h2>
              <p>Selected Food: {orderDetails.menuItem.title}</p>
              <form onSubmit={handleSubmitOrders}>
                <label>
                  Table:
                  <select
                    value={orderDetails.tableNo}
                    onChange={(e) => setOrderDetails({ ...orderDetails, tableNo: e.target.value })}
                  >
                    <option value="">Select Table</option>
                    {tables.map(table => (
                      <option key={table.id} value={table.table_title}>{table.table_title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={orderDetails.quantity}
                    onChange={(e) => setOrderDetails({ ...orderDetails, quantity: parseInt(e.target.value) })}
                  />
                </label>
                <label>
                  Dining Option:
                  <select
                    value={orderDetails.diningOption}
                    onChange={(e) => setOrderDetails({ ...orderDetails, diningOption: e.target.value })}
                  >
                    <option value="">Select Option</option>
                    <option value="Takeaway">Takeaway</option>
                    <option value="Table Dining">Table Dining</option>
                  </select>
                </label>
                <button type="submit">Submit Order</button>
                <button type="button" onClick={closeOrderModal}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="success-dialog">
          <div className="success-dialog-content">
            <h2>Orders Submitted Successfully</h2>
            <button onClick={() => setShowSuccessDialog(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WaiterOrder;
