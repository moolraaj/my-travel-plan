import { useState } from 'react';
import popupbg from '../../../../public/images/popup-bg.png';


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP submission logic here
    console.log('Phone Number:', phoneNumber);
  };

  return (
    <div className="login-wrapper">
      <div className="login-modal" style={{ backgroundImage: `url(${popupbg.src})` }}>
      <button className="close-button">×</button>
        <div className="image-section">
          <img src="/images/popup-img.png" alt="Travel" />   
        </div>
        <div className="form-section">
          <h2>Enter Mobile Number To Personalise Your Trip</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span>+91</span>
              <input
                type="text"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Get Otp</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
