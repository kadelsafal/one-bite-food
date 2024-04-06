import React, { useState,useEffect } from 'react'
import {FaBars, FaTimes } from "react-icons/fa";
import Logo from '../assets/vector.png';
import Cart from '../assets/shopping cart.png'
import {Link, useLocation} from "react-router-dom";
import '../styles/navbar.css'
  function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation(); // Access the current location
  
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
  
    // Function to determine which navbar class to apply based on location
    const getNavbarClass = () => {
      if (location.pathname === '/Menu') {
        return 'menu-design';
      } else {
        return ''; // Return empty string for default design
      }
    };
  return (
    <header>
    <div className={`navbar ${getNavbarClass()} ${isScrolled ? 'scrolled' : ''}`}>
        <div className='leftSide'>
          <div className='logos'>
            <img src={Logo} alt='img' />
            <div className='txtheader'>
            <Link to ="/"><h1>One Bite Food</h1></Link>
            
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
        <div className='rightSide'>
          <div className='logo-buttons'>
            <img src={Cart} alt='img'/>
            <div className='txtbtn'>
              <button className='book-btn'>
              <Link to ="/table">
              <h3>Book a Table</h3></Link>
              </button>
              
            
            </div>
            
            </div>
        </div>
    </div>
    </header>
  );
}

export default Navbar
