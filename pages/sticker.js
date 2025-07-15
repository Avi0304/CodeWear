import React from 'react'
import Link from 'next/link'
import Product from '../models/Product';
import mongoose from "mongoose";
import Head from 'next/head';


const Sticker = ({ products }) => {
  return (
    <>
      <Head>
        <title>CoderWear.com - Stickers</title>
        <meta name="description" content="Welcome to my Next.js application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <section className="text-gray-600 body-font">
          <div className='flex flex-col mx-14 lg:mx-50 mt-6'>
            <h1 className='font-semibold text-black m-2 mb-4 text-2xl md:text-4xl text-center capitalize'>
              Explore our Stickers Collection
            </h1>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400 tracking-tighter mb-3'>
              Add personality to your laptops, notebooks, or workspaces with our vibrant collection of stickers at Codeswear.com. Whether you're into coding, anime, memes, or motivational quotes, we’ve got the perfect sticker for you. Printed on premium waterproof vinyl, our stickers are durable, fade-resistant, and stick around for the long haul. Shop now and start customizing your gear with style!
            </p>
          </div>

          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">

              {Object.keys(products).length === 0 && <p>Sorry ! All stickers are Out Of Stock, New stickers are Coming Soon </p>}

              {
                Object.keys(products).map((item) => {

                  return <Link passHref={true} href={`/product/${products[item].slug}`} key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer m-2 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-3">
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto md:m-0 h-[40vh] md:h-[46vh] w-full block"
                        src={products[item].img}
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirts</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                      <p className="mt-1">₹ {products[item].price}</p>
                      <p className="mt-1">
                        {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                        {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                        {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                        {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                        {products[item].size.includes('XLL') && <span className='border border-gray-300 px-1 mx-1'>XLL</span>}
                      </p>

                      <div className='mt-1'>
                        {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('bottlegreen') && <button className="border-2 border-gray-300 ml-1 bg-green-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('navyblue') && <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      </div>
                    </div>
                  </Link>
                })}
            </div>
          </div>
        </section>
      </div >
    </>
  )
}

export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {

    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: 'Stickers' });

  let stickers = {}

  for (let item of products) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.avaiableQty > 0) {
        stickers[item.title].color.push(item.color)
      }
      if (!stickers[item.title].size.includes(item.size) && item.avaiableQty > 0) {
        stickers[item.title].size.push(item.size)
      }
    } else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.avaiableQty > 0) {
        stickers[item.title].color = [item.color],
          stickers[item.title].size = [item.size]
      }
    }
  }
  console.log(stickers);


  return {
    props: { products: JSON.parse(JSON.stringify(stickers)) }
  }
}

export default Sticker