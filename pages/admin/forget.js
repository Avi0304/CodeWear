import React, { useState, useEffect } from "react"
import {
    LuShield,
    LuMail,
    LuArrowLeft,
    LuCheck,
    LuClock,
    LuTriangleAlert,
    LuPackage,
    LuSend,
    LuKey,
} from "react-icons/lu"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRouter } from 'next/router'

export default function AdminForgotPassword() {
    const [email, setEmail] = useState("")
    const [npassword, setNewPassword] = useState("")
    const [cpassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState("email")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter();

    useEffect(() => {
        if (router.query.token) {
            setStep("reset");
        }
    }, [router.query.token]);

    const sendEmail = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("myuser"));
        const token = user.token;



        const data = {
            email,
            token,
            sendEmail: true
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgetpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status == 200) {
            toast.success('Send Link on Your Email!', {
                position: "top-left",
                autoClose: 3001,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            console.log(token);


            setTimeout(() => {
                router.push(`/admin/forget?token=${token}`);
            }, 3002);
        } else {
            toast.error('Error in Sending Password Link!', {
                position: "top-left",
                autoClose: 3001,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

    }


    const resetpassword = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("myuser") || "{}");
        const token = user.token;


        const data = {
            token,
            npassword,
            cpassword,
            sendEmail: false
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgetpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status) {
            toast.success('Update Password Successfully!', {
                position: "top-left",
                autoClose: 3001,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setTimeout(() => {
                router.push(`/admin/login`);
            }, 3002);
        } else {
            toast.error('Error in Password Update!', {
                position: "top-left",
                autoClose: 3001,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const handleBackToLogin = () => window.history.back()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative">
            <ToastContainer
                position="top-left"
                autoClose={3001}
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
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-6">
                    <div className="text-center mb-6">
                        <div className="relative flex justify-center mb-4">
                            <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
                                <img
                                    alt="Your Company"
                                    src="/codeswearcircle.png"
                                    className="mx-auto w-auto"
                                />
                            </div>
                            <div className="absolute -bottom-2 -mr-18 w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center border-2 border-white shadow">
                                <LuKey className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {step === "email"
                                ? "Reset Admin Password"
                                : "Set New Password"}
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm">
                            {step === "email"
                                ? "Enter your admin email to receive reset instructions"
                                : "Enter your new password below"}
                        </p>
                    </div>

                    {step === "email" ? (
                        <form onSubmit={sendEmail} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                    Admin Email Address
                                </label>
                                <div className="relative">
                                    <LuMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="admin@codewear.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
                                    />
                                </div>
                                {error && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <LuTriangleAlert className="w-4 h-4 mr-1" />
                                        {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:brightness-110 transition disabled:opacity-50 hover:cursor-pointer"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <LuSend className="w-4 h-4" />
                                        <span>Send Reset Instructions</span>
                                    </div>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={resetpassword} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">New Password</label>
                                <input
                                    type="password"
                                    value={npassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
                                <input
                                    type="password"
                                    value={cpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
                                />
                            </div>
                            {error && (
                                <p className="text-sm text-red-600 flex items-center mt-1">
                                    <LuTriangleAlert className="w-4 h-4 mr-1" />
                                    {error}
                                </p>
                            )}
                            {success && (
                                <p className="text-sm text-green-600 flex items-center mt-1">
                                    <LuCheck className="w-4 h-4 mr-1" />
                                    {success}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-green-600 text-white font-semibold rounded-lg flex items-center justify-center shadow-md hover:brightness-110 transition disabled:opacity-50 hover:cursor-pointer"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Updating Password...</span>
                                    </div>
                                ) : (
                                    <span>Reset Password</span>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <button
                            onClick={handleBackToLogin}
                            className="text-pink-600 hover:text-pink-700 flex items-center justify-center text-sm font-medium"
                        >
                            <LuArrowLeft className="w-4 h-4 mr-1" />
                            Back to Admin Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
