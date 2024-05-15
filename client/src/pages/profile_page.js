import  { useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { UserContext } from '../Components/UserContext';
import '../styles/profile.css';
import icon1 from '../assets/icons8-logout-50.png';
import icon2 from '../assets/image.png';

function ProfilePage({ handleLogout ,onClose,onOpenSettings}) {
    
    const { name } = useContext(UserContext);
    
    
    return (
        <main>
            <div className="profile-container">
                <div className="profile-content">
                    <div className="Heading">
                        <p>{name}</p>
                            
                    </div>
                    <div className="profile-buttons">
                    <button className="logout-button" onClick={() => { handleLogout(); onClose(); }}><img src={icon1} alt='img' />Logout</button>
                    <button className="settings-button" onClick={() => { onOpenSettings();}}><img src={icon2} alt='img' />Settings</button>

                    </div>
                </div>
            </div>

        </main>
    );
}

// PropTypes validation
ProfilePage.propTypes = {
    handleLogout: PropTypes.func.isRequired, // Validate handleLogout prop
    onClose: PropTypes.func.isRequired ,
    onOpenSettings: PropTypes.func.isRequired ,
};

export default ProfilePage;
