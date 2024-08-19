import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        phoneNumber: '',
        registerusername: '',
    });
    const [otp, setOtp] = useState('');
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [nameRequired, setNameRequired] = useState(false);

    const closeLogin = () => {
        router.push(`/`);
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
                setVerifyOtp(true);

                const loginResp = await fetch('/api/v1/otpuser/login', {
                    method: 'POST',
                    body: JSON.stringify({ phoneNumber: user.phoneNumber }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const loginResult = await loginResp.json();

                if (loginResult.success) {
                    setNameRequired(!loginResult.nameExists);

                    if (loginResult.nameExists) {
                        setUser({ ...user, registerusername: loginResult.registerusername });
                    }
                } else {
                    alert(loginResult.error || 'OTP verification failed');
                }
            } else {
                alert(result.error || 'Error sending OTP');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };

    const verifyOtpHandler = async (e) => {
        e.preventDefault();
        if (nameRequired && !user.registerusername) {
            alert('Please enter your name.');
            return;
        }

        try {
            await signIn('credentials', {
                phoneNumber: user.phoneNumber,
                registerusername: user.registerusername,
                callbackUrl: '/',
                redirect: true,
            });
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-modal">
                <button className="close-button" onClick={closeLogin}>×</button>
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
                                {nameRequired && (
                                    <div className="input-group">
                                        <input
                                            id="registerusername"
                                            name="registerusername"
                                            value={user.registerusername}
                                            onChange={(e) => changeHandler(null, e)}
                                            placeholder="Enter Your Name"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="input-group">
                                <PhoneInput
                                    id="phone-number"
                                    defaultCountry="IN"
                                    value={user.phoneNumber}
                                    onChange={(value) => changeHandler(value)}
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
