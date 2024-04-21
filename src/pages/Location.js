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
            <div className='location-details'>
        <div className='address'>
          <h2>Address:</h2>
          <p>123 Lazimpat, Kathmandu, Bagmati,  Nepal</p>
        </div>
      <div className='location-map'>
        <img src={location_map} alt="Location" className='location-image'/>
      </div>
      <div className='contact'>
          <h2>Contact Us:</h2>
          <p>Phone: (123) 456-7890</p>
          <p>Email: onebitefoods@example.com</p>
        </div>
        <div className='additional-info'>
        <h2>Additional Information:</h2>
        <p>Nearby Landmarks: Office of Presidnet of Nepal</p>
        <p>Public Transportation: Bus Stop, Tampo Service </p>
        <p>Parking Availability: Parking Lot for 50 cars and 20 bikes</p>
        <p>Operating Hours: Monday-Saturday: 9am-10pm, Sunday: 10am-8pm</p>
      </div>
    </div>
    </div>
  );
}

export default Location;
