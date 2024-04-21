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
        <div className="picture">
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
          <h3>Our Top Sales</h3>
          <div className="picture-item">
            <img src={momoImage} alt="Food" />
            <p>MOMO</p>
          </div>
          <div className="picture-item">
            <img src={pastaImage} alt="Food" />
            <p>Pasta</p>
          </div>
          <div className="picture-item">
            <img src={tunaImage} alt="Food" />
            <p>Tuna</p>
          </div>
          <div className="picture-item">
            <img src={f1Image} alt="Food" />
            <p>Noodles</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;