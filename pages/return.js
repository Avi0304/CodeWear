import React from 'react'
import { LuBadge, LuCheck, LuCircleCheck, LuCircleX, LuClock, LuCreditCard, LuIdCard, LuMail, LuPackage, LuRefreshCcw, LuTruck } from 'react-icons/lu'

const Return = () => {
    return (
        <div className='min-h-screen'>
            <section className='py-16 lg:py-18'>
                <div className='container mx-auto px-4'>
                    <div className='max-w-3xl mx-auto text-center'>
                        <LuBadge className='mb-2 w-6 h-6 mx-auto text-pink-500' />
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-pink-500">
                            Hassle-Free <span className="text-primary">Return</span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-justify">
                            We want you to love your CodeWear products! If something isn't quite right, we've made returns and
                            exchanges as simple as debugging clean code. Here's everything you need to know.
                        </p>
                    </div>
                </div>
            </section>

            <section className='py-16 bg-gray-100/50'>
                <div className='container mx-auto px-4'>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Return Policy Overview</h2>
                    </div>

                    <div className='grid md:grid-cols-3 gap-8'>
                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                <LuClock className='w-10 h-10 text-pink-500' />
                            </div>
                            <h3 className="font-semibold mb-2 text-pink-600">30-Day Returns</h3>
                            <p className="text-sm text-muted-foreground">
                                Most items can be returned within 30 days of delivery for a full refund
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                <LuPackage className='w-10 h-10 text-pink-500' />
                            </div>
                            <h3 className="font-semibold mb-2 text-pink-600">Free Return Shipping</h3>
                            <p className="text-sm text-muted-foreground">
                                We provide prepaid return labels for all eligible returns in the US
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                <LuRefreshCcw className='w-10 h-10 text-pink-500' />
                            </div>
                            <h3 className="font-semibold mb-2 text-pink-600">Free Exchange</h3>
                            <p className="text-sm text-muted-foreground">
                                Easy size and design exchanges with free return shipping
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-16'>
                <div className='container mx-auto px-4'>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">How to Return an Item</h2>
                    </div>

                    <div className='grid md:grid-cols-4 gap-8'>
                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <div className="absolute -top-3 -right-3 text-lg font-bold bg-pink-100 rounded-full h-8 w-8 text-pink-600">
                                1
                            </div>
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LuMail className="w-7 h-7 text-pink-500" />
                            </div>
                            <h3 className="font-semibold mb-2 text-pink-600">Contact Us</h3>
                            <p className="text-sm text-muted-foreground">
                                Email us at returns@codewear.com with your order number and reason for return
                            </p>
                        </div>


                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <div className="absolute -top-3 -right-3 text-lg font-bold bg-pink-100 rounded-full h-8 w-8 text-pink-600">
                                2
                            </div>
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LuPackage className="w-7 h-7 text-pink-500" />
                            </div>
                            <h3 className="font-semibold mb-2 text-pink-600">Get Return Label</h3>
                            <p className="text-sm text-muted-foreground">
                                We'll send you a prepaid return shipping label within 24 hours
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <div className="absolute -top-3 -right-3 text-lg font-bold bg-pink-100 rounded-full h-8 w-8 text-pink-600">
                                3
                            </div>
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LuTruck className="w-7 h-7 text-pink-500" />
                            </div>
                            <h3 className="font-semibold mb-2 text-pink-600">Pack & Ship</h3>
                            <p className="text-sm text-muted-foreground">
                                Pack your items securely and attach the return label to your package
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <div className="absolute -top-3 -right-3 text-lg font-bold bg-pink-100 rounded-full h-8 w-8 text-pink-600">
                                4
                            </div>
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LuCreditCard className="w-7 h-7 text-pink-500" />
                            </div>
                            <h3 className="font-semibold mb-2 text-pink-600">Processing </h3>
                            <p className="text-sm text-muted-foreground">
                                Once we receive your return, we'll process your refund within 3-5 business days
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-16 bg-gray-100/50'>
                <div className='container mx-auto px-4'>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Product Specific Return Condtions</h2>
                    </div>

                    <div className='grid md:grid-cols-3 gap-8'>
                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <div className='flex space-x-4 items-center'>
                                <LuPackage className="w-5 h-5 text-pink-500" />
                                <h2 className='text-2xl font-semibold leading-none tracking-tight flex items-center gap-2'>Apparel (Mugs, MousePads)</h2>
                            </div>
                            <div className='space-y-4'>
                                <p className="text-sm font-medium mb-2 mt-4 text-start">Return Window:</p>
                                <div className="text-left">
                                    <p className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-pink-500 border-pink-200'>
                                        30 days
                                    </p>
                                </div>
                                <div className='text-left'>
                                    <p className='font-medium text-sm mb-2'>Condtions</p>
                                    <ul className='space-y-1'>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>Must be unused and in original  Condtions</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>Original Package reqiured.</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>No damage or defect caused by used</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm'>Exchange Avaiable</p>
                                        </div>
                                    </ul>
                                </div>

                            </div>
                        </div>


                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <div className='flex space-x-4 items-center'>
                                <LuPackage className="w-5 h-5 text-pink-500" />
                                <h2 className='text-2xl font-semibold leading-none tracking-tight flex items-center gap-2'>Apparel (T-Shirts, Hoodies)</h2>
                            </div>
                            <div className='space-y-4'>
                                <p className="text-sm font-medium mb-2 mt-4 text-start">Return Window:</p>
                                <div className="text-left">
                                    <p className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-pink-500 border-pink-200'>
                                        30 days
                                    </p>
                                </div>
                                <div className='text-left'>
                                    <p className='font-medium text-sm mb-2'>Condtions</p>
                                    <ul className='space-y-1'>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>Must be unworn with original tags attached</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>No signs of wear, washing, or alterations</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>Original packaging preferred but not required</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm'>Exchange Avaiable</p>
                                        </div>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow-lg hover:shadow-2xl transition duration-300 relative">
                            <div className='flex space-x-4 items-center'>
                                <LuPackage className="w-5 h-5 text-pink-500" />
                                <h2 className='text-2xl font-semibold leading-none tracking-tight flex items-center gap-2'>Stickers & Decals</h2>
                            </div>
                            <div className='space-y-4'>
                                <p className="text-sm font-medium mb-2 mt-4 text-start">Return Window:</p>
                                <div className="text-left">
                                    <p className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-pink-500 border-pink-200'>
                                        30 days
                                    </p>
                                </div>
                                <div className='text-left'>
                                    <p className='font-medium text-sm mb-2'>Condtions</p>
                                    <ul className='space-y-1'>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>Must be unused and on original backing</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>No peeling or damage to adhesive</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleCheck className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm text-gray-600'>Original packaging required</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuCircleX className='w-4 h-4 text-red-500 mt-0.5 flex-shrink-0' />
                                            <p className='text-sm'>Exchange Not Avaiable</p>
                                        </div>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Return