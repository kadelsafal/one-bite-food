import '../styles/home.css'; // Import CSS file for styling
import foodImage from '../assets/f2.jpg'; // Import image assets
import momoImage from '../assets/momo.jpg';
import pastaImage from '../assets/pasta.jpg';
import tunaImage from '../assets/tuna.jpg';
import f1Image from '../assets/f1.jpg';

const Homepage = () => {
  return (
    <main>
      <section className="section-picture">
        <div className="bgpic">
          <img src={foodImage} alt="Food" />
        </div>
      </section>
      <section className="section-about">
        <div className="about-content">
          <h2>About Us</h2>
          <p style={{ fontFamily: 'Manrope', fontSize: '18px' }}>{"Introducing &apos;One Bite Foods&apos;  an innovative restaurant dine-in booking system designed to streamline your dining experience. Say goodbye to long waits and frustrating reservations. With One Bite Foods, diners can effortlessly book their tables in advance, ensuring a seamless dining experience from start to finish. Whether it&apos;s a cozy dinner for two or a celebratory gathering with friends, One Bite Foods ensures that every dining occasion is memorable, convenient, and enjoyable."}</p>

        </div>
      </section>
      <section className="section-top-sales">
        <div className="pictures3">
          <h1>Our Top Sales</h1>
        <div className='card-items'>
          <div className="picture-item">
            <div className='pics-card'>
            <img src={momoImage} alt="Food" />
            </div>
            <p>MOMO</p>
          </div>
          <div className="picture-item">
          <div className='pics-card'>
            <img src={pastaImage} alt="Food" />
          </div>
            <p>Pasta</p>
          </div>
          <div className="picture-item">
          <div className='pics-card'> 
            <img src={tunaImage} alt="Food" />
            </div>
            <p>Tuna</p>
          </div>
          <div className="picture-item">
          <div className='pics-card'> 
            <img src={f1Image} alt="Food" />
           </div>
            <p>Noodles</p>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;