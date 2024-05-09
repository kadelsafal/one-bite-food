import '../styles/menu.css'; // Make sure to import your CSS file
import menupic1 from '../assets/menu_img1.jpg';
import menupic2 from '../assets/menu_img2.jpg';
import menupic3 from '../assets/menu_img3.jpg';
import menupic4 from '../assets/menu_img4.jpg';
import menupic5 from '../assets/menu_img5.jpg';
import menupic6 from '../assets/menu_img6.jpg';
import menupic7 from '../assets/menu_img7.jpg';
import menupic8 from '../assets/menu_img8.jpg';
import Card from "../Card";

function WaiterOrder() {
  return (
    <div>
      <main>
        <div className='heading-txt'>
          <h1>Waiter Order</h1>
        </div>
        <div className='cards'>
          <Card
            layout= "menu"
            image ={menupic1}
            title = "Pâtes alfredo"
            description = "• Butter • Cheese • Shrimp"
            price="760"
            buttons = "Takeaway"
          />
          <Card
            layout= "menu"
            image ={menupic2}
            title = "Sphaghetti Bolongnese"
            description = "• Sphaghetti • Sauce • Cheese"
            price="520"
            buttons = "Takeaway"
          />
          <Card
            layout= "menu"
            image ={menupic3}
            title = "Baked Salmon with Lemon Sauce"
            description = "• Salmon • Brocolli • Potato"
            price="450"
            buttons = "Takeaway"
          />
          <Card
            layout= "menu"
            image ={menupic4}
            title = "Spicy Chicken Nuggets"
            description = "• Chicken • Corrainder "
            price="320"
            buttons = "Takeaway"
          />
          <Card
            layout= "menu"
            image ={menupic5}
            title = "Butter Chicken"
            description = "• Chicken • Butter • Naan"
            price="250"
            buttons = "Takeaway"
          />
          <Card
            layout= "menu"
            image ={menupic6}
            title = "Fries Platter"
            description = "• Potato • Cheese • Corrainder"
            price="380"
            buttons = "Takeaway"
          />
          <Card
            layout= "menu"
            image ={menupic7}
            title = "Pork Chops & Potatoes Skillet"
            description = "• Chicken • Potatoes "
            price="880"
            buttons = "Takeaway"
          />
          <Card
            layout= "menu"
            image ={menupic8}
            title = "Avocado Salad"
            description = "• Avocado • Tomato • Olive oil"
            price="425"
            buttons = "Takeaway"
          />
           <Card
            layout= "menu"
            image ={menupic8}
            title = "Avocado Salad"
            description = "• Avocado • Tomato • Olive oil"
            price="425"
            buttons = "Takeaway"
          />
        </div>
      </main>
    </div>
  );
}

export default WaiterOrder;
