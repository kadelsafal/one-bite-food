import '../styles/settings.css';
import { useContext,useState } from 'react';
import { UserContext } from '../Components/UserContext';
import icon from '../assets/profile-user_64572 (1).png'; 
import showPasswordIcon from '../assets/view.png';
import hidePasswordIcon from '../assets/hide (1).png';
function Settings() {
    // Extracting name and email from the UserContext
    const { name, email } = useContext(UserContext);
    // State to manage the visibility of password fields
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    // State variables for old and new passwords
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // State to manage the visibility of passwords
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Function to handle the "Change Password" button click
    const handleChangePasswordClick = () => {
        setShowPasswordFields(true);
        setFeedbackMessage('');
    };
     // State variable for feedback message from the backend
     const [feedbackMessage, setFeedbackMessage] = useState('');

      // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (oldPassword.trim() === '' || newPassword.trim() === '') {
            setFeedbackMessage('Please enter both old and new passwords.');
            return; // Exit early if password fields are empty
        }
        try {
            const response = await fetch('http://localhost:3001/api/change-pwd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    oldPassword,
                    newPassword,
                }),
            });
            const data = await response.json();
            setFeedbackMessage(data.message);
            if (data.success) {
                // Password changed successfully, clear input fields
                setOldPassword('');
                setNewPassword('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

 
    return (
        <main>
            <div className="settings-container"style={{ top: showPasswordFields ? '43%' : '34%'}}>
                <div className='settings-content'>
                    <div className='user-icons'>
                        <img src={icon} alt='img' />
                    </div>
                    <div className="text-field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} disabled />
                    </div>
                    <div className="text-field">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" value={email} disabled />
                    </div>
                    {!showPasswordFields && (
                        <button className='change_pwd_btn' onClick={handleChangePasswordClick}>Change Password</button>
                    )}
                    {/* Conditionally render password fields */}
                    {showPasswordFields && (
                        
                        <div>
                            <div className="text-field">
                                <label htmlFor="oldPassword">Old Password:</label>
                                <div className="password-input">
                                    <input type={showOldPassword ? "text" : "password"} id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                    <img src={showOldPassword ? showPasswordIcon : hidePasswordIcon} alt="Show/Hide Password" onClick={() => setShowOldPassword(!showOldPassword)} />
                                </div>
                            </div>
                            <div className="text-field">
                                <label htmlFor="newPassword">New Password:</label>
                                <div className="password-input">
                                    <input type={showNewPassword ? "text" : "password"} id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <img src={showNewPassword ? showPasswordIcon : hidePasswordIcon} alt="Show/Hide Password" onClick={() => setShowNewPassword(!showNewPassword)} />
                                </div>
                            </div>

                            <button className='change_pwdbtn' onClick={handleSubmit}>Change Password</button>
                            {feedbackMessage && <p>{feedbackMessage}</p>}
                        </div>
                        
                    )}
                </div>
            </div>
        </main>
    );
}

export default Settings;
