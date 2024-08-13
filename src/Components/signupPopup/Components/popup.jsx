import { useState } from 'react';
import popupbg from '../../../../public/images/popup-bg.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { signIn } from 'next-auth/react';

const SignupPopup = ({ setIsLogin, setIsSignup }) => {
    const [info, setInfo] = useState({
        orderId: '',
        phoneNumber: ''
    });

    const [otp, setOtp] = useState('');
    const [user, setUser] = useState({
        phoneNumber: '',
        name: '',
        channel: 'SMS',
        otpLength: 6,
        expiry: 86400,
    });
    const [verifyOtp, setVerifyOtp] = useState(false);

    const closeSignup = () => {
        setIsSignup(false);
        setIsLogin(false);
    };

    const changeHandler = (value, e) => {
        if (e) {
            setUser({ ...user, [e.target.name]: e.target.value });
        } else {
            setUser({ ...user, phoneNumber: value });
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch('/api/v1/send-otp', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await resp.json();
            if (result) {
                setInfo({ 
                    orderId: result.orderId, 
                    phoneNumber: user.phoneNumber 
                });
                setVerifyOtp(true);
            } else {
                alert(result.error || 'Error sending OTP');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };

    const verifyOtpHandler = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch('/api/v1/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ orderId: info.orderId, otp, phoneNumber: info.phoneNumber }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await resp.json();
            if (result.isOTPVerified === true) {
                saveUser(info.phoneNumber, user.name);
                await signIn('credentials', {
                    phoneNumber: info.phoneNumber,
                    name: user.name,
                });
                setIsLogin(false);
                setIsSignup(false);
            } else {
                alert(result.error || 'OTP verification failed');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };

    const saveUser = async (phoneNumber, name) => {
        try {
            const resp = await fetch('/api/v1/otpuser/login', {
                method: 'POST',
                body: JSON.stringify({ phoneNumber, name }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await resp.json();
            if (result) {
                console.log(result);
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const openLogIN = () => {
        setIsLogin(true);
        setIsSignup(false);
    };

    return (
        <div className="signup_popup_outer">
            <div className="signup_popup_inner">
                <div className="login-wrapper">
                    <div className="login-modal" style={{ backgroundImage: `url(${popupbg.src})` }}>
                        <button className="close-button" onClick={closeSignup}>×</button>
                        <div className="image-section">
                            <img src="/images/popup-img.png" alt="Travel" />
                        </div>
                        <div className="form-section">
                            <h2>{verifyOtp ? 'Enter OTP to Verify Your Phone Number' : 'Enter Mobile Number To Personalize Your Trip'}</h2>
                            <form onSubmit={verifyOtp ? verifyOtpHandler : handleSendOtp}>
                                {verifyOtp ? (
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            name="otp"
                                            value={otp}
                                            placeholder="Enter OTP"
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="input-group">
                                            <input
                                                id="name"
                                                name="name"
                                                value={user.name}
                                                onChange={(e) => changeHandler(null, e)}
                                                placeholder="Enter Your Name"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <PhoneInput
                                                id="phone-number"
                                                defaultCountry="IN"
                                                value={user.phoneNumber}
                                                onChange={(value) => changeHandler(value)}
                                                placeholder="Enter Your Phone Number"
                                            />
                                        </div>
                                    </>
                                )}
                                <button type="submit">
                                    {verifyOtp ? 'Verify OTP' : 'Get OTP'}
                                </button>
                               {<p>Already have an account? <span onClick={openLogIN}>Login</span></p>} 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPopup;
