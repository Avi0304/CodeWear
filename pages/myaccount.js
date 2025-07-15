import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaLock } from "react-icons/fa";
import Head from 'next/head';


const myaccount = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, SetState] = useState('');
    const [pincode, setPincode] = useState('');
    const [oldpassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [disable, setdisable] = useState(true);
    const [myuser, setmyUser] = useState({})

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        setmyUser(myuser);
        setEmail(myuser.email);
        fetchUser(myuser.token);
    }, [])



    useEffect(() => {
        if (
            name.length > 3 &&
            email.length > 3 &&
            phone.length > 3 &&
            address.length > 3 &&
            city.length > 3 &&
            state.length > 3 &&
            pincode.length > 3
        ) {
            setdisable(false);
        } else {
            setdisable(true);
        }
    }, [name, email, phone, address, city, state, pincode]);

    const handlechange = async (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name === 'pincode') {
            const pin = e.target.value;
            setPincode(pin);

            if (pin.length === 6) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
                    const pinJson = await res.json();

                    if (pinJson[pin]) {
                        setCity(pinJson[pin][0]);         // set city
                        SetState(pinJson[pin][1]);        // set state
                    } else {
                        setCity("");
                        SetState("");
                    }
                } catch (error) {
                    console.error("Error fetching pincode data:", error);
                    setCity("");
                    SetState("");
                }
            } else {
                setCity("");
                SetState("");
            }
        }

        else if (e.target.name == 'city') {
            setCity(e.target.value)
        }
        else if (e.target.name == 'state') {
            SetState(e.target.value)
        }
        else if (e.target.name === 'oldpassword') {
            setOldPassword(e.target.value);
        } else if (e.target.name === 'newPassword') {
            setNewPassword(e.target.value);
        }
    }

    const fetchUser = async (token) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        const response = await res.json();
        setName(response.Name);
        setAddress(response.address);
        setPhone(response.phone);
        setPincode(response.pincode);
        console.log(response);
    }

    const handleUser = async (e) => {
        e.preventDefault();
        const token = myuser.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                name,
                phone,
                address,
                pincode
            })
        });

        const response = await res.json();
        if (response.success) {
            toast.success('Account Detail Update Successfully!', {
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

    const handlePassword = async (e) => {
        e.preventDefault();
        const token = myuser.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                oldpassword,
                newPassword
            })
        });

        const response = await res.json();
        if (response.success) {
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
        }
    }


    return (
        <>
            <Head>
                <title>CoderWear.com - MyAccount</title>
                <meta name="description" content="Welcome to my Next.js application." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='container sm:m-auto p-2'>
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

                <h1 className='font-bold text-3xl my-8 text-center'>Update Your Account</h1>

                <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
                <div className="mx-auto flex">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" name="name" value={name} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be update.)</label>
                            {myuser.token ? <input type="email" id="email" name="email" value={email} readOnly className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : <input type="email" id="email" name="email" value={email} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
                        </div>
                    </div>
                </div>

                <div className="px-2 w-full">
                    <div className="mb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                        <textarea id="address" name="address" rows={2} value={address} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>

                    </div>
                </div>

                <div className="mx-auto flex">

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                            <input type="text" id="phone" name="phone" value={phone} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                            <input type="text" id="pincode" name="pincode" value={pincode} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                </div>
                <div className='flex justify-center'>
                    <button onClick={handleUser} className="flex  mr-2 space-x-5 text-white bg-pink-500 border-0 py-2 px-2 hover:cursor-pointer focus:outline-none hover:bg-pink-600 rounded text-sm disabled:bg-pink-400">Submit</button>
                </div>

                <h2 className='font-semibold text-xl'>2. Change Password</h2>
                <div className="mx-auto flex">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Old Password</label>
                            <input type="password" id="oldpassword" name="oldpassword" value={oldpassword} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">New Password</label>
                            <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mb-5'>
                    <button onClick={handlePassword} className="flex items-center justify-center mr-2 space-x-5 text-white bg-pink-500 border-0 hover:cursor-pointer py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm disabled:bg-pink-400"> <FaLock className='mr-2' /> Change Password</button>
                </div>
            </div>
        </>
    )
}

export default myaccount