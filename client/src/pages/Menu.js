import React from 'react';
import '../styles/menu.css'; // Make sure to import your CSS file
import menupic from '../assets/pexels-mister-mister-3490364.jpg';
import menupic1 from '../assets/table1.jpg';
import menupic2 from '../assets/foood3.jpg';
import Card from "../Card";
function Menu() {
  return (
    <div>
      <main>
        <div className='pic' >
          <img src={menupic} alt='img'  />
        </div>
        <div className='heading-txt'>
          <h1>Our Menu</h1>
        </div>
        <div className='cards'>
          <Card
          layout= "menu"
          image ={menupic1}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic2}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic2}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic1}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic1}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic1}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic1}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic1}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
         
        </div>
      </main>
    </div>
  );
}

export default Menu;
