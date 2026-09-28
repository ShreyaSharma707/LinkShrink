import React, { useState } from 'react';
import { loginUser } from '../api/user.api.js';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('sarkaranurag104@gmail.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    console.log(auth)

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user))
            navigate({to:"/dashboard"})
            setLoading(false);
            console.log("signin success")
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="surface px-8 pb-8 pt-7">
                <p className="eyebrow mb-3">Welcome back</p>
                <h2 className="text-3xl font-bold">Sign in to LinkShrink</h2>

                {error && (
                    <div className="status-error mb-4 rounded-md p-3 text-sm">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="input-field px-3 py-3"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-2 block text-sm font-bold" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="input-field px-3 py-3"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className={`primary-button w-full px-4 py-3 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="cursor-pointer text-sm text-[var(--ink-soft)]">
                        Don't have an account? <span onClick={() => state(false)} className="font-bold text-[var(--coral-dark)] hover:underline">Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;