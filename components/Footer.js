import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-slate-100 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link href={'/'}>
            <p className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <Image src="/logo.png" alt="" width={200} height={20} />
            </p>
          </Link>
          <p className="mt-2 text-sm text-gray-500 px-4">Wear the  &lt; Code / &gt; - </p>
          <p className='text-sm text-gray-500 px-4'>Preimum Coding Thsirt, hoddies, apperals</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Shop</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={'/tshirt'} className="text-gray-600 hover:text-gray-800">TShirt</Link>
              </li>
              <li>
                <Link href={'/hodiees'} className="text-gray-600 hover:text-gray-800">Hoddiees</Link>
              </li>
              <li>
                <Link href={'/sticker'} className="text-gray-600 hover:text-gray-800">Stickers</Link>
              </li>
              <li>
                <Link href={'/mug'} className="text-gray-600 hover:text-gray-800">Mugs</Link>
              </li>
              <li>
                <Link href={'/caps'} className="text-gray-600 hover:text-gray-800">Caps</Link>
              </li>
              <li>
                <Link href={'/mousepad'} className="text-gray-600 hover:text-gray-800">MousePads</Link>
              </li>
              <li>
                <Link href={'/sweatshirt'} className="text-gray-600 hover:text-gray-800">SweatShirts</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Customer Service</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={'/contact'} className="text-gray-600 hover:text-gray-800">Contact US</Link>
              </li>
              <li>
                <Link href={'/about'} className="text-gray-600 hover:text-gray-800">About Us</Link>
              </li>
              <li>
                <Link href={'/return'} className="text-gray-600 hover:text-gray-800">Return Policy</Link>
              </li>
              <li>
                <Link href={'/shipping'} className="text-gray-600 hover:text-gray-800">Shipping Policy</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">POLICY</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Private Policy</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Terms and Conditions</a>
              </li>

            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            {/* <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2> */}
            <nav className="list-none mb-10">
              <Image
                src="/pay.png"
                alt="Payment Methods"
                width={300}
                height={100}
                className="object-cover"
              />
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 CodesWear.com — All Right Reserved
            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@knyttneve</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer