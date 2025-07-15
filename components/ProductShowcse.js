import React from 'react'
import { LuBox } from 'react-icons/lu'


const ProductShowcase = () => {
  const products = [
    {
      name: "Code Syntax Hoodies",
      description: "Cozy hoodies featuring beautiful syntax highlighting from your favorite languages",
      image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/hoodies/joker-premium-hoodie-white/0.webp",
      category: "Apparel",
    },
    {
      name: "Algorithm T-Shirts",
      description: "Comfortable tees with elegant algorithm visualizations and clean code snippets",
      image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/customized-tshirt-blue/0.webp",
      category: "Apparel",
    },
    {
      name: "Developer Coffee Mugs",
      description: "Start your day right with mugs featuring programming humor and code snippets",
      image: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/mugs/caution-i-curse-when-mug-red/0.webp",
      category: "Accessories",
    },
    {
      name: "Code Mousepads",
      description: "Precision mousepads with keyboard shortcuts, regex patterns, and coding references",
      image: "https://preview.redd.it/pzwuaggpkou81.jpg?width=1080&crop=smart&auto=webp&s=a598b69956dd8ae745c405c7532e7b8c1815b63b",
      category: "Accessories",
    },
    {
      name: "Language Stickers",
      description: "High-quality vinyl stickers for laptops featuring programming language logos and syntax",
      image: "https://stickerly.shop/cdn/shop/products/ProgrammerStickers_2.jpg?v=1702111608&width=1946",
      category: "Stickers",
    },
    {
      name: "Function Tote Bags",
      description: "Practical tote bags with minimalist code designs perfect for conferences and daily use",
      image: "https://ih1.redbubble.net/image.1852866394.8396/tb,1000x1000,medium-pad,750x1000,f8f8f8.jpg",
      category: "Accessories",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <LuBox className="mx-auto w-8 h-8 text-pink-500 mb-2" />
          <h2 className="text-3xl font-bold mb-4">Our Product Range</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            From apparel to accessories, we create high-quality merchandise that celebrates coding culture.
          </p>
          <p className="text-gray-500">Wear your code with pride</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-2xl transition duration-300"
            >
              <div className="h-120 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <span className="text-xs inline-block px-2 py-1 rounded-full text-center  bg-pink-200 text-pink-600  mb-2">
                  {product.category}
                </span>
                <h3 className="font-semibold text-lg text-pink-600 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
