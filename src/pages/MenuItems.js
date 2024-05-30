import '../styles/MenuTable.css';
import { useState, useEffect} from 'react';
import LeftNavbar from '../Components/leftNavbar';
import Card from '../Card';

import deletepic from '../assets/icons8-delete-button-30.png';
import editpic from '../assets/icons8-edit-30.png';
import addIcon from '../assets/icons8-add-50.png';

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
 
  const [newMenuItem, setNewMenuItem] = useState({
    title: '',
    description: '',
    image: '',
    price: ''
  });
  const [editItemId, setEditItemId] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);


  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/menu-items');
      const data = await response.json();
      setMenuItems(data);
      const originalImageData = {};
      data.forEach((item) => {
        originalImageData[item.id] = item.image;
      });
      
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleEdit = (id) => {
    setEditItemId(editItemId === id ? null : id);
    // Populate the input fields with existing values when switching to edit mode
    if (editItemId !== id) {
      const menuItemToUpdate = menuItems.find(item => item.id === id);
      setNewMenuItem({
        title: menuItemToUpdate.title,
        description: menuItemToUpdate.description,
        image: menuItemToUpdate.image, // Ensure the image value is correctly populated
        price: menuItemToUpdate.price
      });
    }
  };
  
  const handleSave = async (id) => {
    try {
      const menuItemToUpdate = menuItems.find(item => item.id === id);
      const requestBody = {
        title: menuItemToUpdate.title,
        description: menuItemToUpdate.description,
        price: menuItemToUpdate.price,
        // Check if the user has provided a new image URL
        image: menuItemToUpdate.image, // Default to current image
      };
  
      // Check if the URL input is not empty
      if (menuItemToUpdate.image !== menuItemToUpdate.imageInput) {
        requestBody.image = menuItemToUpdate.imageInput;
      }
  
      // Send PUT request
      const response = await fetch(`http://localhost:3001/edit-menu-items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Handle response
      if (response.ok) {
        setEditItemId(null);
        fetchMenuItems();
      } else {
        console.error('Failed to save menu item');
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };
  
  
  

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/delete-menu-item/${id}`, {
      method: 'DELETE'
    });
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenuItems);
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:3001/add-menu-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMenuItem)
      });
  
      if (response.ok) {
        fetchMenuItems(); // Fetch updated menu items
        setShowSuccessDialog(true); // Show success dialog
        setShowAddFields(false); // Hide the add fields
        setNewMenuItem({  // Reset newMenuItem state
          title: '',
          description: '',
          image: '',
          price: ''
        });
      } else {
        console.error('Failed to add menu item');
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };
  

 

  const handleImageUrlChange = (e, menuItemId) => {
    const { value } = e.target;
    setMenuItems(prevMenuItems =>
      prevMenuItems.map(item =>
        item.id === menuItemId ? { ...item, imageInput: value } : item
      )
    );
  };
  
  
  const handleClose = () => {
    setShowAddFields(false); // Set showAddFields state to false to hide the overlay
  };
  
  
  return (
    <div className='menu-container'>
      <LeftNavbar />
      <main>
        <div className='heading-txt'>
          <h1>Waiter Order</h1>
        </div>
        <div className='cards'>
          {menuItems.map((menuItem) => (
            <div key={menuItem.id}>
              {editItemId === menuItem.id ? (
                <Card
                  layout='menu'
                  edit={<img src={editpic} alt='edit' onClick={() => handleEdit(null)} />}
                  delte={<img src={deletepic} alt='delete' onClick={() => handleDelete(menuItem.id)} />}
                  image={
                  // Inside the Card component:
<div className="image-container">
 
  {menuItem.image && (
    <img src={`data:image/jpeg;base64,${menuItem.image}`} alt='Your image' className="image" />
  )}
</div>
                  }
                  
                  title={
                    <input
                      type='text'
                      value={menuItem.title}
                      onChange={(e) => {
                        const updatedTitle = e.target.value;
                        setMenuItems(prevMenuItems => prevMenuItems.map(item => {
                          if (item.id === menuItem.id) {
                            return { ...item, title: updatedTitle };
                          }
                          return item;
                        }));
                      }}
                    />
                  }
                  description={
                    <input
                      type='text'
                      value={menuItem.description}
                      onChange={(e) => {
                        const updatedDescription = e.target.value;
                        setMenuItems(prevMenuItems => prevMenuItems.map(item => {
                          if (item.id === menuItem.id) {
                            return { ...item, description: updatedDescription };
                          }
                          return item;
                        }));
                      }}
                    />
                  }
                  price={
                    <input
                      type='text'
                      value={menuItem.price}
                      onChange={(e) => {
                        const updatedPrice = e.target.value;
                        setMenuItems(prevMenuItems => prevMenuItems.map(item => {
                          if (item.id === menuItem.id) {
                            return { ...item, price: updatedPrice };
                          }
                          return item;
                        }));
                      }}
                    />
                  }
                  buttons={
                    <div>
                    <input
                      type='text'
                      value={menuItem.imageInput}
                      onChange={e => handleImageUrlChange(e, menuItem.id)}
                      className='image-url-input'
                      placeholder='Enter Image URL'
                    />
                    <button onClick={() => handleSave(menuItem.id)}>
                      Save
                    </button>
                  </div>
                  }
                />
              ) : (
                <Card
                  layout='menu'
                  edit={<img src={editpic} alt='edit' onClick={() => handleEdit(menuItem.id)} />}
                  delte={<img src={deletepic} alt='delete' onClick={() => handleDelete(menuItem.id)} />}
                  image={`data:image/jpeg;base64,${menuItem.image}`}
                  title={menuItem.title}
                  description={menuItem.description}
                  price={menuItem.price}
                  buttons={<button>Order</button>}
                />
              )}
            </div>
          ))}
          
          {showAddFields && (
            <div className='Addfield-overlay'>
        <div className='Addfield-box'>
        <button className="close-button" onClick={handleClose}>Close</button>
        <label>Title
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={newMenuItem.title}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, title: e.target.value })}
          /></label>
          <label>Description:
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={newMenuItem.description}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
          /></label>
          <label>Image Url :
          <input
            type='text'
            name='image'
            placeholder='Image URL'
            value={newMenuItem.image}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
          /></label>
          <label>Price :
          <input
            type='text'
            name='price'
            placeholder='Price'
            value={newMenuItem.price}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
          /></label>
          <button onClick={handleAdd}>Add</button>
        </div>
        </div>
      )}
      <div className='card-contentsbtn'>
        <button onClick={() => setShowAddFields(true)}>
          <img src={addIcon} alt='img' />
        </button>
      </div>
        </div>
      </main>

      {showSuccessDialog && (
        <div className='success-dialog'>
          <div className='success-dialog-content'>
            <h2>Orders Submitted Successfully</h2>
            <button onClick={() => setShowSuccessDialog(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuItems;
