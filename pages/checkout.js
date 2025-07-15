import React, { useState, useEffect, use } from 'react'
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiFillShopping } from "react-icons/ai";
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({ userId, cart, subtotal, AddtoCart, removeFromCart }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, SetState] = useState('');
  const [pincode, setPincode] = useState('');
  const [disable, setdisable] = useState(true);
  const [myuser, setmyUser] = useState({})

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    setmyUser(myuser);
    setEmail(myuser.email);
  },[])

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
          console.log(pinJson);

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
  }

  const handlePayment = async () => {
    if (disable) return;

    const stripe = await stripePromise;

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart,
        email,
        name,
        phone,
        userId,
        address: {
          line1: address,
          city,
          state,
          postal_code: pincode,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.id) {
      console.error('Failed to create Stripe session:', data.error || 'Unknown error');
      toast.error(data.error, {
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
      return;
    }

    const result = await stripe.redirectToCheckout({ sessionId: data.id });

    if (result.error) {
      console.error('Stripe redirect error:', result.error.message);
      alert('Stripe redirection failed: ' + result.error.message);
    }
  };


  return (
    <div className='container sm:m-auto p-2'>
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
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>

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
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
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

      <div className="mx-auto flex">

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" value={state} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" value={city} onChange={handlechange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <h2 className='font-semibold text-xl'>2. Review Cart</h2>

      <div className="sideCart  bg-pink-100 m-2 p-6 z-50">

        <span className='absolute top-5 right-2 cursor-pointer text-pink-500 text-2xl' >
          <AiFillCloseCircle />
        </span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='my-4 text-base font-semibold text'>
            Your Cart is Empty!
          </div>
          }
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='font-semibold'>{cart[k].name} ({cart[k].size} / {cart[k].variant}) </div>
                <div className='w-1/3 flex items-center justify-center text-lg'>
                  <AiFillMinusCircle className='text-pink-500 cursor-pointer' onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size,) }} /> <span className='mx-2 text-sm'>{cart[k].qty}</span> <AiFillPlusCircle className='text-pink-500 cursor-pointer' onClick={() => { AddtoCart(k, 1, cart[k].price, cart[k].name, cart[k].variant, cart[k].size, cart[k].img) }} />
                </div>
              </div>
            </li>
          })}
        </ol>
        <span className="font-bold">SubTotal: ₹ {subtotal}</span>

      </div>
      <div className="mx-4">
        <button onClick={handlePayment} disabled={disable} className="flex mr-2 space-x-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm disabled:bg-pink-400"> <AiFillShopping className='m-1' /> Pay ₹ {subtotal}</button>
      </div>
    </div>
  )
}

export default Checkout