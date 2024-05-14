import { useState } from 'react';
import '../styles/menu.css'; // Make sure to import your CSS file
import menupic1 from '../assets/menu_img1.jpg';
import menupic2 from '../assets/menu_img2.jpg';
import menupic3 from '../assets/menu_img3.jpg';
import menupic4 from '../assets/menu_img4.jpg';
import menupic5 from '../assets/menu_img5.jpg';
import menupic6 from '../assets/menu_img6.jpg';
import menupic7 from '../assets/menu_img7.jpg';
import menupic8 from '../assets/menu_img8.jpg';
import Card from "../Card";
import LeftNavbar from '../Components/leftNavbar';
import axios from 'axios';

function WaiterOrder() {
  const [showOrderModal, setShowOrderModal] = useState(false); // State to manage modal visibility
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    tableNo: '',
    food: '',
    price: '',
    quantity: '',
    takeaway: false,
  }); 
  
  // State to manage success dialog visibility
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Function to handle opening the order modal
  const openOrderModal = () => {
    setShowOrderModal(true);
  };

  // Function to handle closing the order modal
  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleSubmitOrders = async () => {
    try {
      // Prepare the order data to be sent to the backend
      const orderData = {
        name: orderDetails.name,
        tableNo: orderDetails.tableNo,
        food: orderDetails.food,
        price: orderDetails.price,
        quantity: orderDetails.quantity,
        takeaway: orderDetails.takeaway,
      };
  
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
          {/* Your card components */}
          <Card
            layout="menu"
            image={menupic1}
            title="Pâtes alfredo"
            description="• Butter • Cheese • Shrimp"
            price="760"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
          <Card
            layout="menu"
            image={menupic2}
            title="Sphaghetti Bolongnese"
            description="• Sphaghetti • Sauce • Cheese"
            price="520"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
          <Card
            layout="menu"
            image={menupic3}
            title="Baked Salmon with Lemon Sauce"
            description="• Salmon • Brocolli • Potato"
            price="450"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
          <Card
            layout="menu"
            image={menupic4}
            title="Spicy Chicken Nuggets"
            description="• Chicken • Corrainder "
            price="320"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
          <Card
            layout="menu"
            image={menupic5}
            title="Butter Chicken"
            description="• Chicken • Butter • Naan"
            price="250"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
          <Card
            layout="menu"
            image={menupic6}
            title="Fries Platter"
            description="• Potato • Cheese • Corrainder"
            price="380"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
          <Card
            layout="menu"
            image={menupic7}
            title="Pork Chops & Potatoes Skillet"
            description="• Chicken • Potatoes "
            price="880"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
          <Card
            layout="menu"
            image={menupic8}
            title="Avocado Salad"
            description="• Avocado • Tomato • Olive oil"
            price="425"
            buttons={<button onClick={openOrderModal}>Order</button>}
          />
        </div>
      </main>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="order-overlay">
          <div className="order-modal">
            <div className="order-modal-content">
              <h2>Enter Order Details</h2>
              <form onSubmit={handleSubmitOrders}>
                {/* Your input fields */}
                {/* Name */}
                <input
                  type="text"
                  placeholder="Name"
                  value={orderDetails.name}
                  onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                  required
                />
                {/* Table Number */}
                <input
                  type="number"
                  placeholder="Table Number"
                  value={orderDetails.tableNo}
                  onChange={(e) => setOrderDetails({ ...orderDetails, tableNo: e.target.value })}
                  required
                />
                {/* Food */}
                <input
                  type="text"
                  placeholder="Food"
                  value={orderDetails.food}
                  onChange={(e) => setOrderDetails({ ...orderDetails, food: e.target.value })}
                  required
                />
                {/* Price */}
                <input
                  type="number"
                  placeholder="Price"
                  value={orderDetails.price}
                  onChange={(e) => setOrderDetails({ ...orderDetails, price: e.target.value })}
                  required
                />
                {/* Quantity */}
                <input
                  type="number"
                  placeholder="Quantity"
                  value={orderDetails.quantity}
                  onChange={(e) => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
                  required
                />
                {/* Takeaway Checkbox */}
                <label>
                  <input
                    type="checkbox"
                    checked={orderDetails.takeaway}
                    onChange={(e) => setOrderDetails({ ...orderDetails, takeaway: e.target.checked })}
                  />
                  Takeaway
                </label>
                {/* Submit and Cancel buttons */}
                <div>
                  <button type="submit">Add Order</button>
                  <button type="button" onClick={closeOrderModal}>Cancel</button>
                </div>
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

