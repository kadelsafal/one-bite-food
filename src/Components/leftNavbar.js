// Navbar.js
import logo from "../assets/vector.png";
import dashboard from "../assets/dashboard.png";
import menu from "../assets/menu.png";
import setting from "../assets/settings.png";
import analysis from "../assets/analysis.png";
import '../styles/leftNavbar.css'
import {Link} from 'react-router-dom';

const Navbar = () => {
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
          <a href="/dashboard"></a>
        </li>
        <li>
          <img src={menu} alt="Menu" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/waiter-order'>Waiter Order</Link>
          <a href="/menu"></a>
        </li>
        <li>
          <img src={setting} alt="Setting" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/setting'>Setting</Link>
          <a href="/setting"></a>
        </li>
        <li>
          <img src={analysis} alt="Analysis" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/analysis'>Analysis</Link>
          <a href="/analysis"></a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
