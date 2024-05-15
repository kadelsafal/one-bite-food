// Takeawaycart.js
import '../styles/cart.css';
import PropTypes from 'prop-types';
import { useContext,useState } from 'react';
import { UserContext } from '../Components/UserContext';
function Takeawaycart({ onClose, selectedItems,setSelectedItems, showCart }) {
    console.log("After opening cart");
  console.log("Takeaway cart",selectedItems);
  const decreaseQuantity = (index) => {
    const updatedItems = [...selectedItems]; // Create a copy of the selectedItems array
    const item = updatedItems[index]; // Get the item at the specified index
    if (item.quantity > 1) {
      item.quantity -= 1; // Decrease the quantity
      setSelectedItems(updatedItems); // Update the selectedItems state
    }else {
      updatedItems.splice(index, 1);
      setSelectedItems(updatedItems);
    }
}
// Calculate total price
const total = selectedItems.reduce((acc, item) => {
  return acc + (item.price * item.quantity);
}, 0);

const { email } = useContext(UserContext);
const { name } = useContext(UserContext);
const [dialogstatus, setdialogstatus] = useState(null);

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!email || !name) {
      throw new Error('Email and name are required fields');
    }

    // Iterate over each selected item and send separately
    for (const item of selectedItems) {
      const orderData = {
        product_title: item.title,
        product_price: item.price,
        product_quantity: item.quantity,
        product_total_price: item.price * item.quantity,
      };

      const response = await fetch('http://localhost:3001/api/menu_orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, ...orderData }),
      });

      const data = await response.json();
      if (data.success) {
        setdialogstatus({ message: "Form inserted Successfully" });
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        console.error('Data inserting failed:', data.message);
        setdialogstatus({ success: false, message: data.message });
      }

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    }
  } catch (error) {
    console.error('Error submitting form:', error.message);
    setdialogstatus({ message: 'Failed to submit form. Please try again later.' });
  }
};

    return (

    <main className={showCart ? "show" : "hide"}>
      <div className="cart-container">
        <div className="cart-content">
          <div className='close_btn'>
            <button className="close-btn" onClick={onClose}>X</button>
          </div>
          <div className="cart-main">
            <h1>Takeaway</h1>
            <p>Your Orders List:</p>
                        <div className='cart-order'>
            {selectedItems && selectedItems.length > 0 ? (
                selectedItems.map((item, index) => (
                <div className="orders"key={index}>
                  <p>{index+1}</p>
                    <p className='title-order'>{item.title} </p>
                    <p>{item.quantity}</p>
                    <p>{item.description}</p>
                    <p>${item.price}</p> {/* Ensure item.price is displayed correctly */}
                    <button className='delete' onClick={() => decreaseQuantity(index)}>D</button>
                    <p>Total Price: ${item.price * item.quantity}</p>
                    
                </div>
                ))
            ) : (
                <p>You have no items.</p>
            )}
            </div>
            <div className='total-cart-price'>
              <p>Total Cart Price: ${total}</p>{/* Display total cart price */}
            </div>
            <div className='payment-button'>
            <button className="payment-button"onClick={handleFormSubmit}>Pay on Cash Delivery</button>
          </div>   
          </div>
          
        </div>
        {dialogstatus && (
                        <div className={`book-dialog ${dialogstatus.success ? 'success' : 'error'}`}>
                            <p>{dialogstatus.message}</p>
                            <button onClick={() => setdialogstatus(null)}>Close</button>
                        </div>
                    )}
      </div>
    </main>
  );
}

Takeawaycart.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.object), // Ensure selectedItems is required
  showCart: PropTypes.bool.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default Takeawaycart;
