'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

function AdminLoginPage() {
    let router = useRouter();
    let [data, setData] = useState({
        email: '',
        password: ''
    });
    let [error, setError] = useState('');

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const logedInAdmin = async () => {
        try {
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

                console.log(result)

                 
            } else {
                setError(result.message || 'An error occurred');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <>
            <h1>Admin Login</h1>
            <input type="email" name="email" value={data.email} onChange={onChangeHandler} />
            <input type="password" name="password" value={data.password} onChange={onChangeHandler} />
            <button onClick={logedInAdmin}>Login</button>
            {error && <p>{error}</p>}
        </>
    );
}

export default AdminLoginPage;
