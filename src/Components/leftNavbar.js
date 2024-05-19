import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from "../assets/vector.png";
import dashboard from "../assets/dashboard.png";
import menu from "../assets/menu.png";
import setting from "../assets/settings.png";
import analysis from "../assets/analysis.png";
import payment from '../assets/image.png';
import menupic from '../assets/icons8-restaurant-menu-30.png';
import tablepic from '../assets/icons8-restaurant-table-30.png';
import '../styles/leftNavbar.css';
import { UserContext } from './UserContext'; 
import PropTypes from 'prop-types';

const Navbar = () => {
  const { userRole } = useContext(UserContext);
  const history = useHistory();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowLogoutDialog(true);
    setTimeout(() => {
      history.push('/');
    }, 2000);
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="One Bite Foods Logo" />
        <h1>One Bite Foods</h1>
      </div>

      <ul>
        <li>
          <img src={dashboard} alt="Dashboard" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <img src={menu} alt="Menu" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/waiter-order'>Waiter Order</Link>
        </li>
        {userRole !== 'waiter' && ( // Hide settings link if userRole is 'waiter'
          <li>
            <img src={setting} alt="Setting" style={{ width: '20px', marginRight: '5px' }} />
            <Link to='/setting'>Setting</Link>
          </li>
        )}
        <li>
          <img src={analysis} alt="Analysis" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/analysis'>Analysis</Link>
        </li>
        <li>
          <img src={payment} alt="Table Payment" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/tablePay'>Payment</Link>
        </li>
        <li>
          <img src={menupic} alt="Menu Table" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/MenuTable'>Menu Card</Link>
        </li>
        <li>
          <img src={tablepic} alt="Table Card" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/TableItems'>Table Card</Link>
        </li>
        
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      {showLogoutDialog && (
        <div className="logout-dialog">
          <p>Successful Logout</p>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Navbar;
