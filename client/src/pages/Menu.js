import '../styles/menu.css'; 
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import menupic from "../assets/pexels-mister-mister-3490364.jpg";
import Card from "../Card";
import Takeawaycart from './Takeawaycart';
import Navbar from '../Components/Navbar';

function Menu({ selectedItems, setSelectedItems}) { // Destructure setSelectedItems from props
  
  const [showCart, setShowCart] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
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
  
  const addToTakeawayCart = (item, quantity) => {
    const existingItemIndex = selectedItems.findIndex((selectedItem) => selectedItem.title === item.title);
    const price = parseFloat(item.price);
    
    if (existingItemIndex !== -1) {
      setSelectedItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity, // Increment quantity by the provided amount
        };
        return updatedItems;
      });
    } else {
      setSelectedItems(prevItems => [...prevItems, { ...item, price, quantity }]);
    }
  };
  
  return (
    <div>
      <main>
        <div className='pic'>
          <img src={menupic} alt='img'  />
        </div>
        <div className='heading-txt'>
          <h1>Our Menu</h1>
        </div>
        <div className='cards'>
          {menuItems.map((menuItem) => (
            <Card
              key={menuItem.id} // Assuming each menu item has a unique ID
              layout="menu"
              image={`data:image/jpeg;base64,${menuItem.image.toString('base64')}`}
              title={menuItem.title}
              description={menuItem.description}
              price={menuItem.price}
              addToTakeawayCart={(quantity) => addToTakeawayCart(menuItem, quantity)}
            />
          ))}
        </div>
      </main>
      <Takeawaycart onClose={() => setShowCart(false)} selectedItems={selectedItems} setSelectedItems={setSelectedItems} showCart={showCart} />
      <Navbar selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
    </div>
  );
}

Menu.propTypes = {
  selectedItems: PropTypes.array.isRequired, // Validate selectedItems prop
  setSelectedItems: PropTypes.func.isRequired, // Validate setSelectedItems prop
};

export default Menu;
