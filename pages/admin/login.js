"use client"
import React, { useState } from "react"
import {
    LuShield,
    LuEye,
    LuEyeOff,
    LuMail,
    LuLock,
    LuAlertCircle,
    LuSettings,
    LuPackage,
    LuInfo,
    LuUser
} from "react-icons/lu"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router';
import Link from "next/link";


export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password }
        console.log(data);

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await res.json();
        console.log(response);
        setEmail('');
        setPassword('');
        if (response.success) {
            localStorage.setItem('myuser', JSON.stringify({ token: response.token, email: response.email }));
            localStorage.setItem('userId', response.userId);
            toast.success('You Login to your Account Sucessfully...', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            console.log("redirecting...");

            setTimeout(() => {
                router.replace('/admin');
            }, 5000);
        } else {
            toast.error(response.error, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.log("Error in Logging: ", error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* Background Blurs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md z-10 relative">

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center shadow-lg">
                                {/* <LuUser className="w-10 h-10 text-white" /> */}
                                <img
                                    alt="Your Company"
                                    src="/codeswearcircle.png"
                                    className="mx-auto w-auto"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center border-2 border-white">
                                <LuSettings className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">CodeWear Admin</h1>
                        <p className="text-gray-600 text-sm">Sign in to your admin dashboard</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Admin Email
                            </label>
                            <div className="relative">
                                <LuMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@codewear.com"
                                    className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link href={'/admin/forget'}>
                                    <button type="button" className="text-sm text-pink-600 hover:underline">
                                        Forgot password?
                                    </button>
                                </Link>
                            </div>
                            <div className="relative">
                                <LuLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your admin password"
                                    className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 flex justify-center items-center bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-md font-semibold shadow hover:shadow-lg transition-all disabled:opacity-50 hover:cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LuShield className="w-4 h-4 mr-2" />
                                    Sign in to Admin
                                </>
                            )}
                        </button>
                    </form>

                    {/* Support */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Need help?{" "}
                        <button className="text-pink-600 hover:underline font-medium">Contact IT Support</button>
                    </p>
                </div>
            </div>
        </div>
    )
}
