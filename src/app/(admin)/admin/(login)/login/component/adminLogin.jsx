'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import logo from '@/app/assets/home_images/logo.png';
import LoadingOverlay from '../../../(dashboard)/components/LoadingOverlay';
import { handelAsyncErrors } from '@/helpers/asyncErrors';

function AdminLoginPage() {
    let router = useRouter();
    let [data, setData] = useState({
        email: '',
        password: ''
    });
    let [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: '' });
    };

    const logedInAdmin = async () => {
        if (!data.email || !data.password) {
            setError({
                email: !data.email ? 'Email is required' : '',
                password: !data.password ? 'Password is required' : '',
                general: ''
            });
            return;
        }

        setLoading(true);
        return handelAsyncErrors (async()=>{
            let resp = await fetch('/api/v1/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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
                setError(result.message || 'An error occurred');
            }
        })
        
            
        
    };

    return (
        <div className="admin_login_container">
             {loading && <LoadingOverlay />}
            <div className="admin_login_logo">
                <img src={logo.src} />
            </div>
            <h1>Admin Login</h1>
            <input type="email" name="email" placeholder="Email" value={data.email} onChange={onChangeHandler} />
            {error.email && <p className="admin_login_error">{error.email}</p>}
            <input type="password" name="password" placeholder="Password" value={data.password} onChange={onChangeHandler} />
            {error.password && <p className="admin_login_error">{error.password}</p>}
            <button onClick={logedInAdmin}>Login</button>
        </div>
    );
}

export default AdminLoginPage;
