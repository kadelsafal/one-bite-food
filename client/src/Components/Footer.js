
import '../styles/footer.css'; // Importing CSS styles for the footer
import Logo from '../assets/vector.png'; // Importing logo image
import facebook from '../assets/icons8-facebook-64.png'; // Importing Facebook icon
import instagram from '../assets/icons8-instagram-64.png'; // Importing Instagram icon
import utube from '../assets/icons8-youtube-64.png'; // Importing YouTube icon
import linkedln from '../assets/icons8-linkedin-64.png'; // Importing LinkedIn icon
import twitter from '../assets/icons8-twitter-64.png'; // Importing Twitter icon
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

function Footer() {
  return (
    <div>
        <div className='footer'>
        < div className='fleftside'>
            <div className='flogos'>
                <img src={Logo} alt='img' />
                    <div className='txtheader'>
                    <Link to ="/"><h1>One Bite Food</h1></Link>
                    
                    </div>
                    
            </div>
        
      
            <div className='fmiddle'>
                <Link to="/Menu" >Menu</Link>
                <Link to="/Story" >Our Story</Link>
                <Link to="/Location">Location</Link>
                <Link to="/Tables" >Tables</Link>
            </div>

            <div className='texts'>
                <p>© 2024Brand, Inc.</p>
                <p>  • Privacy  </p>
                <p> • Terms </p>
                <p> • Sitemap</p>
            </div>
            </div>
      
      <div className='frightside'>
        <div className='address'>
            <p>Kathmandu, Nepal</p>
            <p>info@restaurant.com</p>
        </div>
        <div className='social-icons'>
            <img src={facebook} alt='icon' />
            <img src={instagram} alt='icon' />
            <img src={twitter} alt='icon' />
            <img src={utube} alt='icon' />
            <img src={linkedln} alt='icon' />
                
                
                
        </div>              
        </div>
      </div>
    </div>
  )
}

export default Footer
