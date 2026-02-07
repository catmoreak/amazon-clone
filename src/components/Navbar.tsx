import { Search, ShoppingCart, MapPin, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import amazonLogo from "../assets/amazon_logo.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <header className="font-sans">
      {/* Top Navbar */}
      <div className="bg-[#131921] text-white h-[60px] flex items-center px-4 gap-5">
        {/* Logo */}
        <div
          className="cursor-pointer p-2 hover:border hover:border-white"
          onClick={() => navigate("/")}
        >
          <img
            src={amazonLogo}
            alt="Amazon"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Deliver to */}
        <div className="flex flex-col justify-center cursor-pointer p-1 text-xs text-gray-300 hover:border hover:border-white">
          <span className="ml-[18px]">Hello</span>
          <div className="flex items-center font-bold text-sm text-white">
            <MapPin size={16} className="mr-1" />
            Select your address
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 h-10 rounded flex overflow-hidden bg-white">
          <div className="bg-[#f3f3f3] text-[#555] px-3 flex items-center text-xs border-r border-[#cdcdcd] cursor-pointer hover:bg-gray-300">
            All ▼
          </div>
          <input
            type="text"
            className="flex-1 border-none px-3 outline-none text-black"
            placeholder="Search Amazon.in"
          />
          <button className="bg-[#febd69] border-none px-4 cursor-pointer flex items-center hover:bg-[#f3a847]">
            <Search size={24} className="text-black" />
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex flex-col justify-center cursor-pointer p-1 hover:border hover:border-white">
          <div className="flex items-center font-bold text-sm text-white">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCnq4GouI-a71Uj8dRrMM_TUPRh8m-eUSnaggHsAXwi86H_9Db2NjAX34-XBv48KGMH8xIghtpnfb_6DHrz7hpLqZdRetYl2RSoRSrg&s=10"
              alt="India"
              className="w-5 mr-1"
            />
            EN ▼
          </div>
        </div>

        {/* Account & Lists */}
        <div
          className="flex flex-col justify-center cursor-pointer p-1 text-xs text-gray-300 hover:border hover:border-white"
          onClick={() => navigate("/signin")}
        >
          <span>Hello, sign in</span>
          <span className="font-bold text-sm text-white">
            Account & Lists ▼
          </span>
        </div>

        {/* Returns & Orders */}
        <div className="flex flex-col justify-center cursor-pointer p-1 text-xs text-gray-300 hover:border hover:border-white">
          <span>Returns</span>
          <span className="font-bold text-sm text-white">& Orders</span>
        </div>

        {/* Cart */}
        <div
          className="flex items-end cursor-pointer p-1 hover:border hover:border-white"
          onClick={() => navigate("/checkout")}
        >
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 left-4 text-[#f08804] font-bold text-base">
              {totalItems}
            </span>
          </div>
          <span className="font-bold ml-1">Cart</span>
        </div>
      </div>

      {/* Sub-Navbar */}
      <div className="bg-[#232f3e] text-white h-10 flex items-center px-4 text-sm gap-4">
        <div className="cursor-pointer p-1 flex items-center font-bold hover:border hover:border-white">
          <Menu size={20} className="mr-1" /> All
        </div>
        {[
          "Best Sellers",
          "Mobiles",
          "Customer Service",
          "Today's Deals",
          "Fashion",
          "Electronics",
          "Prime",
          "New Releases",
          "Home & Kitchen",
        ].map((item) => (
          <span
            key={item}
            className="cursor-pointer p-1 hover:border hover:border-white"
          >
            {item}
          </span>
        ))}
      </div>
    </header>
  );
};
