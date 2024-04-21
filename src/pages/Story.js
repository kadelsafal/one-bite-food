import '../styles/story.css';
/*import backgroundImg from '../assets/food2.jpg'; // Import the background image*/

function About() {

  return (
    <div className="container">
      <main>
        <div className="about">
          <h1>About Us</h1>
          <p>
            At OneBite Foods, we&apos;re more than just a restaurant—we&apos;re a culinary destination, a place where flavors come alive and memories are made. Nestled in the heart of Kathmandu city, our passion for food knows no bounds. From our talented chefs who craft each dish with care to our dedicated staff who ensure every guest feels welcomed, we&apos;re committed to providing an unforgettable dining experience. Our menu is a celebration of global flavors and local ingredients, curated to tantalize your taste buds and leave you craving for more. But beyond the food, it&apos;s the stories we share and the connections we forge that truly define us. Whether you&apos;re joining us for a romantic dinner for two or a lively gathering with friends, we invite you to savor every moment at OneBite Foods, where every bite tells a story.
          </p>
        </div>
        <div className="story"> {/* Added className for the Our Story section */}
          <h1>Our Story</h1>
          <p>At OneBite Foods, our story begins with a shared passion for culinary excellence and a deep-rooted commitment to creating unforgettable dining experiences. Nestled in the heart of Kathmandu city, our journey unfolds with each carefully crafted dish, each moment shared between friends and loved ones. From the bustling kitchens where our talented chefs infuse global flavors with local ingredients to the warm hospitality of our dedicated staff, we strive to exceed expectations at every turn. Our story is one of innovation, tradition, and above all, a love for food that transcends borders. Join us as we continue to write the chapters of our culinary adventure, where every bite tells a tale of passion, creativity, and the joy of good food shared with great company.</p>
        </div>
      </main>
    </div>
  );
}

export default About;
