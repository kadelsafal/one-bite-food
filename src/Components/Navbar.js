import { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import {FaBars, FaTimes } from "react-icons/fa";
import Logo from '../assets/vector.png';
import Cart from '../assets/shopping cart.png';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import icon from '../assets/profile-user_64572 (1).png';
import icon1 from '../assets/icons8-logout-50.png';
import LoginPopup from '../Components/loginpop';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const toggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Update isLoggedIn to true when user logs in
    setIsLoginPopupOpen(false); // Close the login popup after successful login
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // Update isLoggedIn to false when user logs out
  };
  return (
    <header>
      <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className='leftSide'>
          <div className='logos'>
            <img src={Logo} alt='img' />
            <div className='txtheader'>
              <Link to="/"><h1>One Bite Food</h1></Link>
            </div>
          </div>
        </div>

        <div className={`middle ${isMenuOpen ? 'responsive' : ''}`}>
          <Link to="/Menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/Story" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
          <Link to="/Location" onClick={() => setIsMenuOpen(false)}>Location</Link>
          <Link to="/Tables" onClick={() => setIsMenuOpen(false)}>Tables</Link>
          
          <button className='nav-btn close' onClick={toggleNav}>
            <FaTimes />
          </button>
        </div>

        <button className='nav-btn' onClick={toggleNav}>
          <FaBars />
        </button>

        {/* Conditionally render user icon or empty div based on login status */}
        {isLoggedIn ? (
          <div className='user-icon'>
            <div className='icon'>
              <button className='profile-btn'onClick={() => console.log('User Profile')}><img src={icon} alt='img' /></button>
              <button className='logout-btn'onClick={(handleLogout)}><img src={icon1} alt='img' /></button>
            </div>
          </div>
        ) : (
          <div className='empty'></div>
        )}

        <div className='rightSide'>
          <div className='logo-buttons'>
            <img src={Cart} alt='img' />

            <div className='txtbtn'>
              {isLoggedIn ? (
                <button className='book-btn'><h3>Book a Table</h3></button>
              ) : (
                <button className='book-btn' onClick={() => { setIsLoginPopupOpen(true); scrollToTop(true); }}><h3>Book a Table</h3></button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isLoginPopupOpen && (
        <LoginPopup onClose={() => setIsLoginPopupOpen(false)} onOpenSignupPopup={() => {}} handleLogin={handleLogin} />
      )}
    </header>
  );
}

Navbar.propTypes = {
  onOpenLoginPopup: PropTypes.func.isRequired,
};


export default Navbar
