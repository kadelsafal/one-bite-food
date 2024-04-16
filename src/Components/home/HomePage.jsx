import React from 'react';
import './HomePage.css'; // Import CSS file for styling


function Homepage() {
  return (
    <div className="homepage">
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
        <section>
        <div className="picture">
        <img src="../src/assets/food1.jpg" alt="Food" />
        </div>
        </section>
        <section>
          <h2>About Us</h2>
          <p style={{ fontFamily: 'Manrope', fontSize: '18px' }}>"Introducing 'One Bite Foods' – an innovative restaurant dine-in booking system designed to streamline your dining experience. Say goodbye to long waits and frustrating reservations. With One Bite Foods, diners can effortlessly book their tables in advance, ensuring a seamless dining experience from start to finish. Whether it's a cozy dinner for two or a celebratory gathering with friends, One Bite Foods ensures that every dining occasion is memorable, convenient, and enjoyable."</p>
        </section>
        <section>
          
          <div className="pictures3">
            <h3>Our Top Sales</h3>
          <img src="../src/assets/momo.jpg" alt="Food" />
          <img src="../src/assets/pasta.jpg" alt="Food" />
          <img src="../src/assets/tuna.jpg" alt="Food" />
          <img src="../src/assets/food4.jpg" alt="Food" />
          </div>
          

        </section>
        <section>
          <h4>Find our Location</h4>
          <p >""Find OneBite Foods, where flavors unite, a culinary haven nestled just right."</p>
          <button>Our Location</button>
          <div className="picture2">
          <img src="../src/assets/food3.jpg" alt="Food" />
        </div>
        </section>
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

export default Homepage;
