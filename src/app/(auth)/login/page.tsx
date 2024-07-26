'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';


export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const router = useRouter();
    const { login } = useAuthStore();


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await login(email, password);
            router.push('/villas');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.detail || 'Failed to log in');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-sm space-y-10">
                    <div>
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    {error && (
                        <div className="text-red-600 text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative -space-y-px rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm leading-6">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm leading-6 text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Start a 14-day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
