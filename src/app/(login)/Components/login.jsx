import { useState } from 'react';
import popupbg from '../../../../public/images/popup-bg.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';


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

    const closeLogin = () => {
        router.push(`/`)
    }

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
            // Verify OTP
            const otpResp = await fetch('/api/v1/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ orderId, otp, phoneNumber }),
            });
    
            const otpResult = await otpResp.json();
            if (otpResult.isOTPVerified === true) {
                // Check if user exists in the database
                const usersResp = await fetch('/api/v1/otpuser/getallusers');
                const usersResult = await usersResp.json();
    
                // Check if user exists based on phoneNumber
                const userExists = usersResult.result.some(user =>
                    user.phoneNumber === phoneNumber
                );
    
                if (userExists) {
                    // User exists, proceed to sign in
                    await signIn('credentials', {
                        phoneNumber: phoneNumber,
                        callbackUrl: '/',
                        redirect: true,
                    });
                } else {
                    // No user found, show a toast and redirect to signup page
                    toast.info('No user found. Redirecting to signup page...');
                    setTimeout(() => {
                        router.push('/signup');
                    }, 3000); // Delay to allow the user to see the toast message
                }
            } else {
                alert(otpResult.error || 'OTP verification failed');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };
    

    return (
        <div className="login-wrapper">
            <div className="login-modal" style={{ backgroundImage: `url(${popupbg.src})` }}>
                <button className="close-button" onClick={closeLogin}>×</button>
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
                        <p>Don't have an account <Link href={`/signup`}>Signup</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
