import '../styles/story.css';
import image from '../assets/food3.jpg';
import image2 from '../assets/foood3.jpg'
function Story() {
  return (
      <main>
<div className='pic' >
          <img src={image2} alt='img'  />
        </div>
        <div className="popup-box">
          <div className='about-us'>
                  <div className='about-text'>
                      <h2>About Us</h2>
                      <p>
                        At OneBite Foods, we&apos;re more than just a restaurant—we&apos;re a culinary destination, a place where flavors come alive and memories are made. Nestled in the heart of Kathmandu city, our passion for food knows no bounds. From our talented chefs who craft each dish with care to our dedicated staff who ensure every guest feels welcomed, we&apos;re committed to providing an unforgettable dining experience. Our menu is a celebration of global flavors and local ingredients, curated to tantalize your taste buds and leave you craving for more. But beyond the food, it&apos;s the stories we share and the connections we forge that truly define us. Whether you&apos;re joining us for a romantic dinner for two or a lively gathering with friends, we invite you to savor every moment at OneBite Foods, where every bite tells a story.
                      </p>
                  </div>
                  <div className='story-pics'>
                  <img src={image} alt='img' />
                  </div>
            </div>
        </div>
      </main>
  
  );
}

export default Story;
