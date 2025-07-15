import React from 'react'
import Link from 'next/link'
import Product from '../models/Product';
import mongoose from "mongoose";
import Head from 'next/head';

const Caps = ({ products }) => {
    return (
        <>
            <Head>
                <title>CoderWear.com - caps</title>
                <meta name="description" content="Welcome to my Next.js application." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <section className="text-gray-600 body-font">
                    <div className='flex flex-col mx-14 lg:mx-50 mt-6'>
                        <h1 className='font-semibold text-black m-2 mb-4 text-2xl md:text-4xl text-center capitalize'>Explore our caps  Collection </h1>
                        <p className='text-sm font-medium text-gray-600 dark:text-gray-400 tracking-tighter'>
                            Upgrade your desk setup with the wide selection of caps available at Codeswear.com. Our caps are perfect for every workspace—whether you're coding, gaming, or just browsing. Choose from a variety of styles including programming-inspired designs, anime themes, and minimalist patterns. All of our caps are made with premium materials for smooth tracking, comfort, and long-lasting durability. Shop now and find the perfect cap to match your vibe!
                        </p>
                    </div>
                    <div className="container px-5 py-10 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center">

                            {Object.keys(products).length === 0 && <p>Sorry ! All caps are Out Of Stock, New caps are Coming Soon </p>}

                            {
                                Object.keys(products).map((item) => {

                                    return <Link passHref={true} href={`/product/${products[item].slug}`} key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer m-3 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-3">
                                        <div className="block relative rounded overflow-hidden">
                                            <img
                                                alt="ecommerce"
                                                className="m-auto md:m-0 h-[40vh]  md:h-[46vh] w-full block"
                                                src={products[item].img}
                                            />
                                        </div>
                                        <div className="mt-4 text-center md:text-left">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirts</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                            <p className="mt-1">₹ {products[item].price}</p>
                                            <p className="mt-1">
                                                {products[item].size.includes('XS') && <span className='border border-gray-300 px-1 mx-1'>XS</span>}
                                                {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                                                {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                                                {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                                                {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                                                {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XLL</span>}
                                                {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                                            </p>

                                            <div className='mt-1'>
                                                {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('navyblue') && <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('grey') && <button className="border-2 border-gray-300 ml-1 bg-gray-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('maroon') && <button className="border-2 border-gray-300 ml-1 bg-red-800 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {products[item].color.includes('navy') && <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            </div>
                                        </div>
                                    </Link>
                                })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {

        await mongoose.connect(process.env.MONGO_URI);
    }

    let products = await Product.find({ category: 'Caps' });

    let cap = {}

    for (let item of products) {
        if (item.title in cap) {
            if (!cap[item.title].color.includes(item.color) && item.avaiableQty > 0) {
                cap[item.title].color.push(item.color)
            }
            if (!cap[item.title].size.includes(item.size) && item.avaiableQty > 0) {
                cap[item.title].size.push(item.size)
            }
        } else {
            cap[item.title] = JSON.parse(JSON.stringify(item))
            if (item.avaiableQty > 0) {
                cap[item.title].color = [item.color],
                    cap[item.title].size = [item.size]
            }
        }
    }
    console.log(cap);


    return {
        props: { products: JSON.parse(JSON.stringify(cap)) }
    }
}

export default Caps