
import './card.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
function Card({ layout, title, description, image,onClick, button ,booked, Available, price,addToTakeawayCart }) {
  const [quantity, setQuantity] = useState(1);
 
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
}
const decrementQuantity = () => {
  if (quantity > 0) {
    setQuantity(quantity - 1);
  }
}

  if (layout === 'menu') {
    return (
      <div className='card-box'>
         <div className="card">
          <img src={image} alt="Card" className="card-image" />
        </div>
        <div className='menu-card'>
          <div className='menu-description'>
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <p className='price'>${price}</p>
          </div>
          <div className='menu-button'>
            <div className="quantity-controls">
            <button className='quantity-button' onClick={decrementQuantity}>-</button>
            <span className="quantity">{quantity}</span>
            <button className='quantity-button' onClick={incrementQuantity}>+</button>
          </div>
          <button className='button' onClick={() => addToTakeawayCart(quantity)}>Takeaway</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='card-box'>
        <div className="card">
          <img src={image} alt="Card" className="card-image" />
        </div>
        <div className='card-contents'>
          <div className="descriptions">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <button className='buttons' onClick={onClick}>{button} </button>
          </div>
          <div className='booked-menu'>
            <p>{booked}</p>
            {booked !== '' }
            
          </div>
          {/* Conditionally render the "option" div */}
          {booked ? null : (
            <div className='option'>
              <p>{Available}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  layout: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  buttonns: PropTypes.array.isRequired,
  button: PropTypes.string.isRequired,
  booked: PropTypes.string.isRequired,
  Available: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.func.isRequired,
  addToTakeawayCart: PropTypes.func.isRequired,
  
};
Card.defaultProps = {
  // Other default props...
  addToTakeawayCart: () => {}, // Provide a default function
};

export default Card;
