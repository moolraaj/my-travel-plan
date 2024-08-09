// 'use client'
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import logo from '@/app/assets/home_images/logo.png'

// function AdminLoginPage() {
    
//     let [data, setData] = useState({
//         email: '',
//         password: ''
//     });
//     let [error, setError] = useState('');

//     const onChangeHandler = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     };

//     const logedInAdmin = async () => {
//         try {
//             let resp = await fetch('/api/v1/admin/login', {
//                 method: 'POST',
                
//                 body: JSON.stringify(data)
//             });

//             let result = await resp.json();

//             if (result) {
//                  await signIn('credentials', {
//                     email: data.email,
//                     password: data.password,
//                     callbackUrl: '/admin/dashboard',
//                     redirect: true
//                 });

                

                 
//             } else {
//                 setError(result.message || 'An error occurred');
//             }
//         } catch (err) {
//             setError('An error occurred');
//         }
//     };

//     return (
//         <>
//         <div className="admin_login_logo">
//             <img src={logo.src} alt="admin_login_logo" />
//         </div>
//             <h1>Admin Login</h1>
//             <div className="input-group">
//             <label htmlFor="email">Email*</label>
//             <input type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder='example@gmail.com'/>
//             </div>
//             <div className="input-group">
//             <label htmlFor="email">Password*</label>
//             <input type="password" name="password" value={data.password} onChange={onChangeHandler} placeholder='password'/>
//             </div>
//             <button onClick={logedInAdmin}>Login</button>
//             {error && <p>{error}</p>}
//         </>
//     );
// }

// export default AdminLoginPage;



'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '@/app/assets/home_images/logo.png';

function AdminLoginPage() {
    const [data, setData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onRememberMeChange = () => {
        setData({ ...data, rememberMe: !data.rememberMe });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const logedInAdmin = async () => {
        try {
            let resp = await fetch('/api/v1/admin/login', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            let result = await resp.json();
            if (result) {
                await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    callbackUrl: '/admin/dashboard',
                    redirect: false
                });

            } else {
                setError(result.message || 'An error occurred');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <>
            <div className="admin_login_logo">
                <img src={logo.src} alt="admin_login_logo" />
            </div>
            <h1>Admin Login</h1>
            <div className="input-group">
                <label htmlFor="email">Email*</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    placeholder="example@gmail.com"
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password*</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder="password"
                    />
                    <span onClick={togglePasswordVisibility} className="password-toggle">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            </div>
            <div className="remember-me">
                <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={data.rememberMe}
                    onChange={onRememberMeChange}
                />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button onClick={logedInAdmin}>Login</button>
            {error && <p>{error}</p>}
        </>
    );
}

export default AdminLoginPage;
