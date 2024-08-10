
'use client';
 
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
    let [erros, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false);

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({...erros,[e.target.name]:''})
    };

    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const excuteErrors = () => {
        let { email, password } = data
        let valid = true
        let errorFields = {}
        if(!email){
            valid =false
            errorFields.email ='email is required'
        }
        if(!password){
            valid =false
            errorFields.password ='password is required'
        }
        setErrors(errorFields)
        return valid
    }

    const logedInAdmin = async () => {
        if(excuteErrors()){
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
                        redirect: true
                    });
    
                } else {
                    console.log('error')
                }
            } catch (err) {
                 console.log('error')
            }
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
            {erros.email && <span className='admin_login_error'>{erros.email}</span>}
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
            {erros.password && <span className='admin_login_error'>{erros.password}</span>}
           
            
            <button onClick={logedInAdmin}>Login</button>
             
        </>
    );
}

export default AdminLoginPage;
