import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderID');
    const phoneNumber = searchParams.get('phone_number');
    
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState({
        phoneNumber: '',
        channel: 'SMS',
        otpLength: 6,
        expiry: 86400,
    });
    const [verifyOtp, setVerifyOtp] = useState(false);

    const changeHandler = (value) => {
        setUser({ ...user, phoneNumber: value });
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
                router.push(`/login?orderID=${result.orderId}&phone_number=${encodeURIComponent(user.phoneNumber)}`);
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
                body: JSON.stringify({ orderId, otp, phoneNumber }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = await resp.json();
            console.log('OTP Verification Result:', result); // Log result
            if (result.isOTPVerified === true) {
                const signInResult = await signIn('credentials', {
                    phoneNumber: phoneNumber,
                    redirect: false,
                });
                console.log('Sign-In Result:', signInResult); // Log sign-in result
    
                if (signInResult.error) {
                    alert('Sign-in failed: ' + signInResult.error);
                } else {
                    // Optionally save user if needed
                    await saveUser(phoneNumber);
                    router.push('/dashboard'); // Redirect if needed
                }
            } else {
                alert(result.error || 'OTP verification failed');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };
    

    const saveUser = async (phoneNumber) => {
        try {
            const resp = await fetch('/api/v1/save-user', {
                method: 'POST',
                body: JSON.stringify({ phoneNumber }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await resp.json();
            if (result.success) {
                console.log('User saved successfully');
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-modal" style={{ backgroundImage: `url(/images/popup-bg.png)` }}>
                <button className="close-button">×</button>
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
                            <div className="input-group">
                                <PhoneInput
                                    id="phone-number"
                                    defaultCountry="IN"
                                    value={user.phoneNumber}
                                    onChange={changeHandler}
                                    placeholder="Enter Your Phone Number"
                                />
                            </div>
                        )}
                        <button type="submit">
                            {verifyOtp ? 'Verify OTP' : 'Get OTP'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
