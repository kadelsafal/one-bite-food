import '../styles/MenuTable.css';
import { useState, useEffect} from 'react';
import LeftNavbar from '../Components/leftNavbar';
import Card from '../Card';

import deletepic from '../assets/icons8-delete-button-30.png';
import editpic from '../assets/icons8-edit-30.png';
import addIcon from '../assets/icons8-add-50.png';

function TableItems() {
  const [tableItems, setTableItems] = useState([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
 
  const [newTableItem, setNewTableItem] = useState({
    table_title: '',
    table_description: '',
    table_status:'',
    table_image: ''
  });
  const [editItemId, setEditItemId] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);


  useEffect(() => {
    fetchTableItems();
  }, []);

  const fetchTableItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/table-items');
      const data = await response.json();
      setTableItems(data);
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
      const tableItemToUpdate = tableItems.find(item => item.id === id);
      setNewTableItem({
        table_title: tableItemToUpdate.table_title,
        table_description: tableItemToUpdate.table_description,
        table_status: tableItemToUpdate.status,
        table_image: tableItemToUpdate.image // Ensure the image value is correctly populated
        
      });
    }
  };
  
 
  const handleSave = async (id) => {
    try {
      const tableItemToUpdate = tableItems.find(item => item.id === id);
      const requestBody = {
        table_title: tableItemToUpdate.table_title,
        table_description: tableItemToUpdate.table_description,
        table_status: tableItemToUpdate.table_status,
        // Default to current table_image value
        table_image: tableItemToUpdate.table_image,
      };
  
      
      // Check if the URL input is not empty and has been changed
    if (tableItemToUpdate.imageInput && tableItemToUpdate.table_image !== tableItemToUpdate.imageInput) {
      requestBody.table_image = tableItemToUpdate.imageInput;
    } else {
      // If the image has not been changed, remove the 'table_image' field from the request body
      delete requestBody.table_image;
    }
  
      // Send PUT request
      const response = await fetch(`http://localhost:3001/edit-table-items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Handle response
      if (response.ok) {
        setEditItemId(null);
        fetchTableItems();
      } else {
        console.error('Failed to save table item');
      }
    } catch (error) {
      console.error('Error saving table item:', error);
    }
  };
  
  

  
  

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/delete-table-item/${id}`, {
      method: 'DELETE'
    });
    const updatedTableItems = tableItems.filter((item) => item.id !== id);
    setTableItems(updatedTableItems);
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:3001/add-table-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTableItem)
      });
  
      if (response.ok) {
        fetchTableItems(); // Fetch updated menu items
        setShowSuccessDialog(true); // Show success dialog
        setShowAddFields(false); // Hide the add fields
        setNewTableItem({  // Reset newMenuItem state
          table_title: '',
          table_description: '',
          table_status:'',
          table_image: ''
        });
      } else {
        console.error('Failed to add table item');
      }
    } catch (error) {
      console.error('Error adding table item:', error);
    }
  };
  

 

  const handleImageUrlChange = (e, tableItemId) => {
    const { value } = e.target;
    console.log('Is URL empty?', value === '');
    setTableItems(prevTableItems =>
      prevTableItems.map(item =>
        item.id === tableItemId ? { ...item, imageInput: value } : item
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
          {tableItems.map((tableItem) => (
            <div key={tableItem.id}>
              {editItemId === tableItem.id ? (
                <Card
                  layout="default"
                  edit={<img src={editpic} alt='edit' onClick={() => handleEdit(null)} />}
                  delte={<img src={deletepic} alt='delete' onClick={() => handleDelete(tableItem.id)} />}
                  image={
                  // Inside the Card component:
<div className="image-container">
 
{tableItem.table_image && (
  <img src={`data:image/jpeg;base64,${tableItem.table_image}`} alt='Your image' className="image" />
)}

</div>
                  }
                  
                  title={
                    <input
                      type='text'
                      value={tableItem.table_title}
                      onChange={(e) => {
                        const updatedTitle = e.target.value;
                        setTableItems(prevTableItems => prevTableItems.map(item => {
                          if (item.id === tableItem.id) {
                            return { ...item, table_title: updatedTitle };
                          }
                          return item;
                        }));
                      }}
                    />
                  }
                  description={
                    <input
                      type='text'
                      value={tableItem.table_description}
                      onChange={(e) => {
                        const updatedDescription = e.target.value;
                        setTableItems(prevTableItems => prevTableItems.map(item => {
                          if (item.id === tableItem.id) {
                            return { ...item, table_description: updatedDescription };
                          }
                          return item;
                        }));
                      }}
                    />
                  }
                  booked={
                    <select
                      value={tableItem.table_status}
                      onChange={(e) => {
                        const updatedStatus = e.target.value;
                        setTableItems(prevTableItems => prevTableItems.map(item => {
                          if (item.id === tableItem.id) {
                            return { ...item, table_status: updatedStatus };
                          }
                          return item;
                        }));
                      }}
                    >
                      <option value="booked">Booked</option>
                      <option value="available">Available</option>
                    </select>
                  }
                  button={
                    <div>
                    <input
                      type='text'
                      value={tableItem.imageInput}
                      onChange={e => handleImageUrlChange(e, tableItem.id)}
                      className='image-url-input'
                      placeholder='Enter Image URL'
                    />
                    <button onClick={() => handleSave(tableItem.id)}>
                      Save
                    </button>
                  </div>
                  }
                />
              ) : (
                <Card
                layout="default"
                edit={<img src={editpic} alt='edit' onClick={() => handleEdit(tableItem.id)} />}
                delte={<img src={deletepic} alt='delete' onClick={() => handleDelete(tableItem.id)} />}
                image={`data:image/jpeg;base64,${tableItem.table_image}`} // Assuming each table item object has an 'image' property
                title={tableItem.table_title} // Assuming each table item object has a 'title' property
                description={tableItem.table_description} // Assuming each table item object has a 'description' property
                button={tableItem.table_status === 'booked' ? "• Booked" : "Book a table"}
                booked={
                  tableItem.table_status 
                }
                onClick={() => handleEdit(tableItem.id)}
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
            value={newTableItem.title}
            onChange={(e) => setNewTableItem({ ...newTableItem, title: e.target.value })}
          /></label>
          <label>Description:
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={newTableItem.description}
            onChange={(e) => setNewTableItem({ ...newTableItem, description: e.target.value })}
          /></label>
          <label>Image Url :
          <input
            type='text'
            name='image'
            placeholder='Image URL'
            value={newTableItem.image}
            onChange={(e) => setNewTableItem({ ...newTableItem, image: e.target.value })}
          /></label>
          <label>Price :
          <input
            type='text'
            name='price'
            placeholder='Price'
            value={newTableItem.price}
            onChange={(e) => setNewTableItem({ ...newTableItem, price: e.target.value })}
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

export default TableItems;
