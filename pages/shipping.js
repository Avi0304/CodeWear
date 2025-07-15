import React from 'react'
import { LuClock, LuEarth, LuGlobe, LuTruck } from 'react-icons/lu'

const Shipping = () => {
    return (
        <>
            <section className='py-16 lg:py-18'>
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className='inline-flex items-center rounded-full bg-gray-200/50 px-2.5 py-0.5 text-xs font-semibold transition-colors '>
                            <LuTruck className='mr-2 w-4 h-4' />
                            Fast & Reliable
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6"><span className='text-pink-500'>Shipping</span> Information</h1>
                        <p className="text-lg text-gray-600 mb-8">Get your favorite code-themed merchandise delivered quickly and safely to your door.</p>
                    </div>
                </div>
            </section>

            <section className='py-16 lg:py-18 bg-gray-100/50'>
                <div className="container mx-auto px-4">
                    <div className='max-w-3xl mx-auto text-center'>
                        <h1 className="text-2xl font-bold text-center mb-8">Shipping Options</h1>
                        <div className='grid md:grid-cols-3 gap-6'>
                            <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                                <div className="w-12 h-12 flex bg-pink-100 rounded-lg items-center justify-center mx-auto mb-4">
                                    <LuTruck className='w-7 h-7 text-pink-500' />
                                </div>
                                <h3 className='font-semibold mb-2'>Standard Shipping</h3>
                                <p className="text-sm text-gray-600 mb-2">5-7 business days</p>
                                <p className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-pink-500 border-pink-200'>
                                    Free on Order ₹ 50+
                                </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                                <div className="w-12 h-12 flex bg-pink-100 rounded-lg items-center justify-center mx-auto mb-4">
                                    <LuClock className='w-7 h-7 text-pink-500' />
                                </div>
                                <h3 className='font-semibold mb-2'>Express Shipping</h3>
                                <p className="text-sm text-gray-600 mb-2">2-3 business days</p>
                                <p className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-pink-500 border-pink-200'>
                                    ₹ 40
                                </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                                <div className="w-12 h-12 flex bg-pink-100 rounded-lg items-center justify-center mx-auto mb-4">
                                    <LuEarth className='w-7 h-7 text-pink-500' />
                                </div>
                                <h3 className='font-semibold mb-2'>International Shipping</h3>
                                <p className="text-sm text-gray-600 mb-2">7-14 business days</p>
                                <p className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-pink-500 border-pink-200'>
                                    Calculated at checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <section className='py-16 lg:py-18'>
                <div className="container mx-auto px-4">
                    <div className='max-w-3xl mx-auto text-center'>
                        <div className='grid md:grid-cols-2 gap-8'>
                            <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                                <div className='flex gap-5 items-center mb-4'>
                                    <LuClock className='text-pink-500 w-5 h-5 ' />
                                    <h3 className='font-semibold '>Processing Time</h3>
                                </div>
                                <div className='text-gray-600 text-justify'>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Orders are processed within 1-2 business days. You'll receive a tracking number once your order
                                        ships.
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Orders placed after 2 PM EST will be processed the next business day.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                                <div className='flex gap-5 items-center mb-4'>
                                    <LuGlobe className='text-pink-500 w-5 h-5 ' />
                                    <h3 className='font-semibold '>International Shipping</h3>
                                </div>
                                <div className='text-gray-600 text-justify'>
                                    <p className="text-muted-foreground text-sm mb-4">
                                       We ship worldwide! International customers are responsible for any customs fees or duties.
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      We ship worldwide! International customers are responsible for any customs fees or duties.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >


        </>
    )
}

export default Shipping