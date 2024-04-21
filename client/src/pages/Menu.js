import '../styles/menu.css';// Make sure to import your CSS file
import menupic from "../assets/pexels-mister-mister-3490364.jpg";
import menupic1 from '../assets/menu_img1.jpg';
import menupic2 from '../assets/menu_img2.jpg';
import menupic3 from '../assets/menu_img3.jpg';
import menupic4 from '../assets/menu_img4.jpg';
import menupic5 from '../assets/menu_img5.jpg';
import menupic6 from '../assets/menu_img6.jpg';
import menupic7 from '../assets/menu_img7.jpg';
import menupic8 from '../assets/menu_img8.jpg';
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
          title = "Pâtes alfredo"
          description = "• Butter • Cheese • Shrimp"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic2}
          title = "Sphaghetti Bolongnese"
          description = "• Sphaghetti • Sauce • Cheese"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic3}
          title = "Baked Salmon with Lemon Sauce"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic4}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic5}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic6}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic7}
          title = "Pancake"
          description = "• Onion • Meat • Bake"
          price="20"
          buttons = "Takeaway"
          
          />
          <Card
          layout= "menu"
          image ={menupic8}
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
