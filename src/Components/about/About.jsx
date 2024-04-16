// About.js
import React from 'react';
import './About.css';

function About() {
  return (
    <div>
      <header>
        <div className="logo">
          <img src="onebite_logo.png" alt="OneBite Foods Logo" />
          <h1 style={{ fontFamily: 'Laxend', fontSize: '48px' }}>OneBite Foods</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Location</a></li>
            <li><a href="#">Tables</a></li>
            <li><a href="#">Book a table</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="popup">
          <h2>About Us</h2>
          <p>
            At OneBite Foods, we're more than just a restaurant—we're a culinary destination, a place where flavors come alive and memories are made. Nestled in the heart of Kathmandu city, our passion for food knows no bounds. From our talented chefs who craft each dish with care to our dedicated staff who ensure every guest feels welcomed, we're committed to providing an unforgettable dining experience. Our menu is a celebration of global flavors and local ingredients, curated to tantalize your taste buds and leave you craving for more. But beyond the food, it's the stories we share and the connections we forge that truly define us. Whether you're joining us for a romantic dinner for two or a lively gathering with friends, we invite you to savor every moment at OneBite Foods, where every bite tells a story.
          </p>
          <h3>Our Story</h3>
          <p>At OneBite Foods, our story begins with a shared passion for culinary excellence and a deep-rooted commitment to creating unforgettable dining experiences. Nestled in the heart of Kathmandu city, our journey unfolds with each carefully crafted dish, each moment shared between friends and loved ones. From the bustling kitchens where our talented chefs infuse global flavors with local ingredients to the warm hospitality of our dedicated staff, we strive to exceed expectations at every turn. Our story is one of innovation, tradition, and above all, a love for food that transcends borders. Join us as we continue to write the chapters of our culinary adventure, where every bite tells a tale of passion, creativity, and the joy of good food shared with great company.</p>
        </div>
        <div className="background-image"></div>
        
      </main>
      <footer>
      <li><a href="#">Contact</a></li>
      <p>Kathmandu,Nepal</p>
      <p>Email: info@onebitefoods </p>
        <p style={{ fontFamily: 'Manrope', fontSize: '18px' }}>&copy; 2024 OneBite Foods. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
