import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Forget = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [npassword, setnpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const handleChange = async (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.name == 'npassword') {
      setnpassword(e.target.value);
    }
    else if (e.target.name == 'cpassword') {
      setcpassword(e.target.value);
    }
  }


  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push("/")
    }
    console.log(router.query.token);

  }, [router.isReady]);


  const sendEmail = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("myuser") || "{}");
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

      setTimeout(() => {
        router.push(`/forget?token=${token}`);
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
        router.push(`/login`);
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/codeswearcircle.png"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Forget Password
        </h2>

        <p className="mt-4 text-center text-sm/6 text-gray-500">Or {''}
          <Link href={'/login'} className="font-semibold text-pink-600 hover:text-pink-500">
            Login
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {!router.query.token && <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={email}
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              onClick={sendEmail}
            >
              Continue
            </button>
          </div>
        </form>
        }

        {router.query.token && <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              New Password
            </label>
            <div className="mt-2">
              <input
                id="npassword"
                name="npassword"
                type="password"
                value={npassword}
                required
                placeholder='Enter the New Password'
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                value={cpassword}
                placeholder='Enter the Confirm Pasword'
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"
                onChange={handleChange}
              />
            </div>
            {npassword && cpassword && npassword === cpassword && (
              <p className="text-green-600 text-sm mt-1 text-center">
                Passwords match
              </p>
            )}

            {npassword && cpassword && npassword !== cpassword && (
              <p className="text-red-600 text-sm mt-1 text-center">
                Passwords does not match
              </p>
            )}

          </div>

          <div>
            <button
              type="submit"
              disabled={npassword !== cpassword}
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:bg-pink-400"
              onClick={resetpassword}
            >
              Continue
            </button>
          </div>
        </form>
        }
      </div>
    </div>
  )
}

export default Forget