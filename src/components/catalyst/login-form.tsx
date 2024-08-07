// src/app/components/LoginForm.tsx

'use client';

import { useState, FormEvent } from 'react';
import { loginUser } from '@/lib/api';
import axios from 'axios';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const data = await loginUser(username, password);
            console.log('Token:', data.token);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.detail || 'Failed to log in');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-600">{error}</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
