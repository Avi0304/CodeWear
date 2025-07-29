import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiFillShopping } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";


const Navbar = ({ Logout, user, cart, AddtoCart, removeFromCart, clearCart, subtotal }) => {


  const [dropdown, setdropdown] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const router = useRouter();

  const toogleDropDown = () => {
    setdropdown(!dropdown);

  }

  useEffect(() => {
    console.log("User is : ", user);

    Object.keys(cart).length !== 0 && setSideBar(true)

    let exempted = ['/checkout', '/order', '/orders']
    if (exempted.includes(router.pathname)) {
      setSideBar(false)
    }
  }, [])

  const toggleCart = () => {
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full');
    //   ref.current.classList.add('translate-x-0');
    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0');
    //   ref.current.classList.add('translate-x-full');
    // }
    setSideBar(!sideBar)
  }

  const ref = useRef()
  return (
    <div className={`flex flex-col justify-center items-center md:justify-start md:flex-row py-2 shadow-lg sticky top-0 bg-white z-10`}>
      <div className='logo mr-auto md:mx-5'>
        <Link href={'/'}> <Image src={"/logo.png"} width={200} height={40} alt='codewear' /></Link>
      </div>

      <div className='nav'>
        <ul className='flex flex-wrap items-center justify-center sm:justify-center md:justify-start space-x-6 sm:space-x-4 font-bold md:text-md sm:text-base'>
          <Link href="/tshirt">
            <li className={`hover:text-pink-700 ${router.pathname === '/tshirt' ? 'text-pink-600' : ''}`}>Tshirt</li>
          </Link>
          <Link href={'/hodiees'}>
            <li className={`hover:text-pink-700 ${router.pathname === '/hodiees' ? 'text-pink-600' : ''}`}>Hodiees</li>
          </Link>
          <Link href={'/sticker'}>
            <li className={`hover:text-pink-700 ${router.pathname === '/sticker' ? 'text-pink-600' : ''}`}>Stickers</li>
          </Link>
          <Link href={'/mug'}>
            <li className={`hover:text-pink-700 ${router.pathname === '/mug' ? 'text-pink-600' : ''}`}>Mugs</li>
          </Link>
          <Link href={'/mousepad'}>
            <li className={`hover:text-pink-700 ${router.pathname === '/mousepad' ? 'text-pink-600' : ''}`}>MousePads</li>
          </Link>
          <Link href={'/caps'}>
            <li className={`hover:text-pink-700 ${router.pathname === '/caps' ? 'text-pink-600' : ''}`}>Caps</li>
          </Link>
          <Link href={'/sweatshirt'}>
            <li className={`hover:text-pink-700 ${router.pathname === '/sweatshirt' ? 'text-pink-600' : ''}`}>Sweatshirts</li>
          </Link>
        </ul>
      </div>


      <div className='cart items-center cursor-pointer absolute right-0 mx-5 top-4 flex' >

        {user.value && user.role === 'customer' ? (
          <div className='relative' onMouseOver={() => setdropdown(true)} onMouseLeave={() => setdropdown(false)}>
            <MdAccountCircle className='text-xl md:text-2xl mx-2 text-pink-600 cursor-pointer' />
            {dropdown && (
              <div className='bg-white  shadow-2xl absolute  right-2 py-4 rounded-md px-5 w-32 z-50'>
                <ul>
                  <li className={`py-1 hover:text-pink-600 text-sm font-bold ${router.pathname === '/myaccount' ? 'text-pink-600' : ''}`}>
                    <Link href="/myaccount">My Account</Link>
                  </li>
                  <li className={`py-1 hover:text-pink-600 text-sm font-bold ${router.pathname === '/orders' ? 'text-pink-600' : ''}`}>
                    <Link href="/orders">Orders</Link>
                  </li>
                  <li className={`py-1 hover:text-pink-600 text-sm font-bold cursor-pointer `} onClick={Logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link href={'/login'}>
            <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2 hover:bg-pink-500 hover:cursor-pointer'>Login</button>
          </Link>
        )}


        <AiOutlineShoppingCart className='text-xl md:text-2xl text-pink-600' onClick={toggleCart} />
        <p className='bg-pink-600 rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2.5 text-white text-xs font-semibold'>{Object.keys(cart).length}</p>
      </div >

      <div
        ref={ref}
        className={`w-72 h-screen sideCart fixed top-0 bg-pink-100 py-10 px-8 z-50 transform transition-transform overflow-y-auto ${sideBar ? 'right-0' : '-right-96'
          }`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          className="absolute top-5 right-2 cursor-pointer text-pink-500 text-2xl"
          onClick={toggleCart}
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 text-base font-semibold text">
              Your Cart is Empty!
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name} ({cart[k].size} / {cart[k].variant})
                  </div>
                  <div className="w-1/3 flex items-center justify-center text-lg">
                    <AiFillMinusCircle
                      className="text-pink-500 cursor-pointer"
                      onClick={() =>
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].variant,
                          cart[k].size
                        )
                      }
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      className="text-pink-500 cursor-pointer"
                      onClick={() =>
                        AddtoCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].variant,
                          cart[k].size
                        )
                      }
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold my-2">SubTotal: ₹ {subtotal}</div>
        <div className="flex">
          <Link href={"/checkout"}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="disabled:bg-pink-400 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm cursor-pointer"
            >
              <AiFillShopping className="m-1" /> Checkout
            </button>
          </Link>

          <button
            disabled={Object.keys(cart).length === 0}
            className="disabled:bg-pink-400 cursor-pointer flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

    </div >
  )
}

export default Navbar