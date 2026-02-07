import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";
import { RufusChatbot } from "../components/RufusChatbot";
import amazonLogo from "../assets/amazon_logo.png";
import ledTV from "../assets/led.jpg";
import birdBath from "../assets/51pZI3RTpUL._AC_SX145_.jpg";
import petCage from "../assets/81jjj43aDoL._AC_SX290_.jpg";
import kitchenAppliances from "../assets/61mKZ+ixc8L._SX285_.jpg";
import fashionImage from "../assets/71mpLFLaA2L._SX285_.jpg";
import phoneImage from "../assets/61ca566nQ0L._AC_SX290_.jpg";
import laptopImage from "../assets/laptop.jpg";
import monitorImage from "../assets/monitor.png";
import printerImage from "../assets/printer.jpg";
import accessoriesImage from "../assets/acessories.webp";
import booksImage from "../assets/books.jpg";
import fitnessImage from "../assets/fitness.jpg";
import headphonesImage from "../assets/headphones.jpg";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-[1500px] mx-auto relative">
        <Hero />

        {/* Product Card Grid */}
        <div className="flex flex-wrap px-5 -mt-16 relative z-20">
          <ProductCard
            title="Upgrade your home | Amazon Brands & more"
            image=""
            multiImage={true}
            images={[
              {
                title: "Smart LED TVs",
                img: ledTV,
              },
              {
                title: "Kitchen Appliances",
                img: kitchenAppliances,
              },
              {
                title: "Pet Supplies",
                img: petCage,
              },
              {
                title: "Bird Bath",
                img: birdBath,
              },
            ]}
          />
          <ProductCard title="Fashion trends you like" image={fashionImage} />
          <ProductCard
            title="Latest Smartphones | Big Savings"
            image={phoneImage}
            productId="smartphone"
          />
          {/* Sign in Card */}
          <div className="bg-white p-5 m-2.5 h-[420px] flex flex-col shadow-md flex-1 min-w-[250px] rounded-lg">
            <h2 className="text-[21px] font-bold mb-2.5">
              Sign in for your best experience
            </h2>
            <button
              onClick={() => navigate("/signin")}
              className="bg-[#FFD814] border border-[#FCD200] rounded-lg px-4 py-2.5 text-[13px] font-bold mt-8 cursor-pointer hover:bg-[#F7CA00] transition-colors"
            >
              Sign in securely
            </button>
            <div className="mt-4">
              <img
                src="https://cdn-ilcleof.nitrocdn.com/sybpHlWlYnkreAJRPAWECXumSvqRHMzE/assets/images/optimized/rev-1c213c6/www.finplus.co.in/wp-content/uploads/2019/06/Amazon-is-growing-and-how.jpg"
                alt="Shopping"
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>

          {/* Second Row of Cards */}
          <ProductCard
            title="Starting ₹149 | Headphones"
            image={headphonesImage}
            linkText="See all offers"
            productId="smartphone"
          />
          <ProductCard
            title="Computers & accessories"
            image=""
            multiImage={true}
            productId="laptop"
            images={[
              {
                title: "Laptops",
                img: laptopImage,
              },
              {
                title: "Monitors",
                img: monitorImage,
              },
              {
                title: "Printers",
                img: printerImage,
              },
              {
                title: "Accessories",
                img: accessoriesImage,
              },
            ]}
          />
          <ProductCard
            title="Shop for your fitness essentials"
            image={fitnessImage}
            linkText="Explore more"
            productId="smartphone"
          />
          <ProductCard
            title="Starting ₹99 | Books, toys & more"
            image={booksImage}
            linkText="See more"
            productId="laptop"
          />

          {/* Third Row of Cards */}
          <ProductCard
            title="Fashion trends you like"
            image=""
            multiImage={true}
            images={[
              {
                title: "Jeans",
                img: "https://m.media-amazon.com/images/I/81-WinPfkRL._AC_UY1100_.jpg",
              },
              {
                title: "Tops",
                img: "https://m.media-amazon.com/images/I/61zbBd2mP0L._AC_UY1100_.jpg",
              },
              {
                title: "Dresses",
                img: "https://cdn-ilcleof.nitrocdn.com/sybpHlWlYnkreAJRPAWECXumSvqRHMzE/assets/images/optimized/rev-1c213c6/www.finplus.co.in/wp-content/uploads/2019/06/Amazon-is-growing-and-how.jpg",
              },
              {
                title: "Shoes",
                img: "https://m.media-amazon.com/images/I/31mkb1YjUnL._AC_SR290,290_.jpg",
              },
            ]}
          />
          <ProductCard
            title="Shop laptops & tablets"
            image="https://m.media-amazon.com/images/G/31/img26/intel/1/1-Intel_1400x800._CB787713553_.gif"
            linkText="See more"
            productId="laptop"
          />
          <ProductCard
            title="Revamp your home in style"
            image="https://m.media-amazon.com/images/G/31/OHL/janart26/store/header/redesign_your_home_m.jpg"
            linkText="Explore more"
            productId="smartphone"
          />
          <ProductCard
            title="Shop by Category"
            image=""
            multiImage={true}
            images={[
              {
                title: "Mobile Phones",
                img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/smart-phone-banner-design-template-caa98978d25e965873a22b01acb99ba7_screen.jpg?ts=1718877755",
              },
              {
                title: "Cameras",
                img: "https://images.fonearena.com/blog/wp-content/uploads/2023/08/Amazon-World-Photography-Day-Sale-2023.png",
              },
              {
                title: "Speakers",
                img: "https://m.media-amazon.com/images/G/31/img19/AmazonDevices/LandingPage2/Intro-Banner_750x300_02._CB448829657_.jpg",
              },
              {
                title: "Smart watches",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K9SXNfA_lA9NmymMDoEMs9q40DBSCR1UzQ&s",
              },
            ]}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#232f3e] text-white mt-12">
        <div className="text-center py-4 bg-[#37475a] cursor-pointer hover:bg-[#485769]">
          <span className="text-sm">Back to top</span>
        </div>
        <div className="max-w-[1200px] mx-auto px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-3 text-base">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">About Us</li>
                <li className="hover:underline cursor-pointer">Careers</li>
                <li className="hover:underline cursor-pointer">
                  Press Releases
                </li>
                <li className="hover:underline cursor-pointer">
                  Amazon Science
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-base">Connect with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">Facebook</li>
                <li className="hover:underline cursor-pointer">Twitter</li>
                <li className="hover:underline cursor-pointer">Instagram</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-base">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">
                  Sell on Amazon
                </li>
                <li className="hover:underline cursor-pointer">
                  Sell under Amazon Accelerator
                </li>
                <li className="hover:underline cursor-pointer">
                  Amazon Global Selling
                </li>
                <li className="hover:underline cursor-pointer">
                  Become an Affiliate
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-base">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">
                  COVID-19 and Amazon
                </li>
                <li className="hover:underline cursor-pointer">Your Account</li>
                <li className="hover:underline cursor-pointer">
                  Returns Centre
                </li>
                <li className="hover:underline cursor-pointer">
                  100% Purchase Protection
                </li>
                <li className="hover:underline cursor-pointer">
                  Amazon App Download
                </li>
                <li className="hover:underline cursor-pointer">Help</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 py-6">
          <div className="flex justify-center items-center gap-8">
            <div className="cursor-pointer">
              <img
                src={amazonLogo}
                alt="Amazon"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex gap-4 text-sm">
              <button className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-700">
                English
              </button>
              <button className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 flex items-center gap-1">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCnq4GouI-a71Uj8dRrMM_TUPRh8m-eUSnaggHsAXwi86H_9Db2NjAX34-XBv48KGMH8xIghtpnfb_6DHrz7hpLqZdRetYl2RSoRSrg&s=10"
                  alt="India"
                  className="w-5"
                />
                India
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#131A22] py-6">
          <div className="text-center text-xs text-gray-400">
            <p>© 2024, Amazon.in, Inc. or its affiliates</p>
          </div>
        </div>
      </footer>

      {/* Rufus AI Chatbot */}
      <RufusChatbot />
    </div>
  );
};
