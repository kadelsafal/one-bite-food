import '../styles/location.css';
import header_img from '../assets/table.webp';
import location_map from '../assets/location_map.png'

function Location() {
  return (
    <div className='location-page'>
      <div className='location-header'>
        <img src={header_img} alt="food" className='food-image'/>
      </div>
      <h1>OUR LOCATION</h1>
      <div className='location-map'>
        <img src={location_map} alt="Location" className='location-image'/>
      </div>
    </div>
  );
}

export default Location;
