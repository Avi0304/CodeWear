import ProductShowcse from '@/components/ProductShowcse'
import Image from 'next/image'
import React from 'react'
import { LuHeart, LuCode, LuUsers, LuTrendingUp, LuMail, LuMapPin, LuPhone, LuBadge } from 'react-icons/lu'


const About = () => {
  const values = [
    {
      icon: LuHeart,
      title: "Passion for Code",
      description: "We believe great products come from passionate coders building with care.",
    },
    {
      icon: LuCode,
      title: "Clean Code",
      description: "We value simplicity and clarity — both in our UI and our codebase.",
    },
    {
      icon: LuUsers,
      title: "User First",
      description: "Our community is at the heart of every decision we make.",
    },
    {
      icon: LuTrendingUp,
      title: "Growth Mindset",
      description: "We constantly learn, improve, and push the boundaries of what’s possible.",
    },
  ];

  return (
    <>
      <section className='py-16 lg:py-18'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <p className='inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-semibold transition-colors border border-pink-600 text-pink-600'>
              Est. 2020
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-pink-500">
              Where Code Meets <span className="text-primary">Style</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-justify">
              We're a team of passionate developers who transform your favorite code snippets, programming languages,
              and developer humor into high-quality merchandise. From comfortable hoodies and stylish t-shirts to
              practical mugs and mousepads, we create products that let you wear and use your coding passion every day.
            </p>
          </div>
        </div>
      </section>


      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-pink-500">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-justify">
                <p>
                  CodeWear started in a small apartment in 2020 when our founder, Alex, couldn't find quality developer
                  merchandise that truly represented the coding community. Tired of generic programming jokes on cheap
                  t-shirts, Alex decided to create something different - premium apparel and accessories featuring
                  beautiful, authentic code designs.
                </p>
                <p>
                  What began as designing custom t-shirts for friends quickly grew into a full product line. Today we
                  offer everything from cozy hoodies with elegant syntax highlighting to coffee mugs featuring your
                  favorite algorithms, mousepads with clean code principles, and laptop stickers celebrating different
                  programming languages.
                </p>
                <p>
                  Every product is carefully crafted with high-quality materials and printing techniques that ensure
                  your favorite code looks crisp and stays vibrant wash after wash, sip after sip, and click after
                  click.
                </p>
                <p>
                  Today, CodeWear serves thousands of developers worldwide, from junior programmers to senior
                  architects, all united by their passion for clean code and great design.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/codeswearcircle.png"
                alt="CodeWear team working"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <ProductShowcse />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product design to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl text-center p-6 shadow hover:shadow-lg transition duration-300"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-500 mb-2">50K+</div>
              <div className="text-muted-foreground">Products Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-500 mb-2">500+</div>
              <div className="text-muted-foreground">Unique Designs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-500 mb-2">25+</div>
              <div className="text-muted-foreground">Programming Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-500 mb-2">4.9★</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      <hr className='border border-gray-200' />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-600">
                Have questions, suggestions, or just want to say hello? We'd love to hear from you!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Email Card */}
              <div className="border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                <LuMail className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-gray-600 mb-4">Get in touch with our team</p>
                <button className="text-sm border border-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-pink-50 hover:border-pink-500 hover:text-pink-500 transition">
                  hello@codewear.com
                </button>
              </div>

              {/* Visit Us Card */}
              <div className="border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                <LuMapPin className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-sm text-gray-600 mb-4">Our headquarters</p>
                <p className="text-sm text-gray-700">
                  San Francisco, CA
                  <br />
                  United States
                </p>
              </div>

              {/* Call Us Card */}
              <div className="border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                <LuPhone className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-gray-600 mb-4">Mon-Fri, 9AM-6PM PST</p>
                <button className="text-sm border border-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-pink-50 hover:border-pink-500 hover:text-pink-500 transition">
                  +1 (555) 123-4567
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
