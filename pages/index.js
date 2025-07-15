import Head from "next/head";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaShippingFast, FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const items = [
  {
    title: "Caps",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/caps.webp",
    Link: "/caps",
  },
  {
    title: "Hoodies",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/hoodie.webp",
    Link: "/hodiees",
  },
  {
    title: "Mouse Pad",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/mousepad.webp",
    Link: "/mousepad",
  },
  {
    title: "Mugs",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/mugs.webp",
    Link: "/mug",
  },
  {
    title: "OverSized T-Shirts",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/oversizedtshirt.webp",
    Link: "/tshirt",
  },
  {
    title: "Polo T-Shirts",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/polotshirts.webp",
    Link: "/tshirt",
  },
  {
    title: "SweatShirts",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/sweatshirt.webp",
    Link: "/sweatshirt",
  },
  {
    title: "T-Shirts",
    image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/constants/landing/collections/tshirt.webp",
    Link: "/tshirt",
  },
];

export default function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowCTA(scrollY > 200);
    }

    window.addEventListener("scroll", handleScroll);

    return () => removeEventListener("scroll", handleScroll);
  }, [])

  const images = [
    "/carousel1.webp",
    "/carousel2.webp",
    "/carousel3.webp",
    "/carousel4.webp",
    "/carousel5.webp",
  ];

  return (
    <>
      <Head>
        <title>CoderWear.com - Wear the Code</title>
        <meta name="description" content="Welcome to my Next.js application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* --- Carousel --- */}
      <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[95vh]">
        {/* Prev Button */}
        <div
          ref={prevRef}
          className="absolute z-10 left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full shadow-md cursor-pointer p-2 sm:p-3 flex items-center justify-center"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* Next Button */}
        <div
          ref={nextRef}
          className="absolute z-10 right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full shadow-md cursor-pointer p-2 sm:p-3 flex items-center justify-center"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[95vh]">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Button */}
        {showCTA && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            className="absolute z-20 bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <Link
              href="/tshirt"
              className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-5 sm:py-2 sm:px-6 md:py-2 md:px-8 rounded-xl text-sm sm:text-base md:text-lg xl:text-2xl shadow-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        )}
      </div>


      {/* --- Collections Section --- */}
      <div className="mt-10">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide">Collections</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
          {items.slice(0, items.length - 2).map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
                duration: 0.6,
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative hover:cursor-pointer"
            >
              <div className="overflow-hidden">
                <Link href={item.Link}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-100 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Last two items centered in same row */}
          <div className="md:col-span-3 flex justify-center gap-6">
            {items.slice(-2).map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 15,
                  duration: 0.6,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full sm:w-[45%] md:w-[30%] group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-100 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* --- Features Section --- */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Wear Code With CodeWear.com</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Wear whatever you want? What do you want? you want code? So why not wear code?</p>
          </div>
          <div className="flex flex-wrap justify-center -m-4">
            {[
              {
                icon: (
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-3xl"
                    height="1em"
                    width="1em"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428" />
                  </svg>
                ),
                title: "Premium Tshirts",
                desc: "Our T-Shirts are 100% made of cotton.",
              },
              {
                icon: <FaShippingFast className="w-7 h-7" />,
                title: "Free Shipping",
                desc: "We Ship All over the India for FREE",
              },
              {
                icon: <FaRupeeSign className="w-7 h-7" />,
                title: "Exciting Offers",
                desc: "We provide amazing offers & discounts on our products.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 15,
                  duration: 0.6,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="p-4 w-full sm:w-1/2 lg:w-1/3 flex justify-center"
              >
                <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center shadow-xl w-full max-w-sm hover:cursor-pointer">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{feature.title}</h2>
                  <p className="leading-relaxed text-base text-center">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
