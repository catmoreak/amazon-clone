import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  Star,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { RufusChatbot } from "../components/RufusChatbot";
import { useCart } from "../context/CartContext";

interface ProductData {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  highlights: string[];
  description: string;
  inStock: boolean;
  fastDelivery: boolean;
  seller: string;
  category: string;
  specifications: { [key: string]: string };
}

// Sample product data - in a real app, this would come from an API
const productsData: { [key: string]: ProductData } = {
  smartphone: {
    id: "smartphone",
    title:
      "Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)",
    brand: "Samsung",
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    rating: 4.5,
    reviews: 12453,
    images: [
      "https://m.media-amazon.com/images/I/71WcjsOVOmL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71RVuBs6ZzL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71goHZ7LS8L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81vxWpPpgNL._SX679_.jpg",
    ],
    highlights: [
      "200MP Wide-Angle Camera with OIS",
      '6.8" QHD+ Dynamic AMOLED 2X Display',
      "Snapdragon 8 Gen 3 Processor",
      "5000mAh Battery with 45W Fast Charging",
      "S Pen Included",
      "IP68 Water & Dust Resistance",
    ],
    description:
      "Meet Galaxy S24 Ultra, the ultimate smartphone that goes beyond boundaries. With revolutionary AI capabilities, stunning camera system, and powerful performance.",
    inStock: true,
    fastDelivery: true,
    seller: "Cloudtail India",
    category: "Electronics > Mobiles & Accessories > Smartphones",
    specifications: {
      Brand: "Samsung",
      "Model Name": "Galaxy S24 Ultra",
      "Network Service Provider": "Unlocked for All Carriers",
      "Operating System": "Android 14.0",
      "Cellular Technology": "5G",
      "Memory Storage": "256 GB",
      RAM: "12 GB",
      "Screen Size": "6.8 inches",
      "Battery Power": "5000 mAh",
      Weight: "233 g",
    },
  },
  laptop: {
    id: "laptop",
    title: "Apple MacBook Air M3 Chip 13-inch (Midnight, 8GB RAM, 256GB SSD)",
    brand: "Apple",
    price: 114990,
    originalPrice: 124900,
    discount: 8,
    rating: 4.6,
    reviews: 8932,
    images: [
      "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71HzwKKFL4L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg",
    ],
    highlights: [
      "Apple M3 chip with 8-core CPU and 8-core GPU",
      "13.6-inch Liquid Retina display",
      "8GB Unified Memory",
      "256GB SSD Storage",
      "Up to 18 hours battery life",
      "MagSafe 3 charging port",
    ],
    description:
      "The M3 chip brings even greater capabilities to the super-portable 13-inch MacBook Air. With up to 18 hours of battery life.",
    inStock: true,
    fastDelivery: true,
    seller: "Apple Authorized Reseller",
    category: "Computers & Accessories > Laptops",
    specifications: {
      Brand: "Apple",
      Model: "MacBook Air M3",
      "Screen Size": "13.6 inches",
      Processor: "Apple M3",
      RAM: "8 GB",
      Storage: "256 GB SSD",
      "Operating System": "macOS",
      Weight: "1.24 kg",
      "Battery Life": "Up to 18 hours",
    },
  },
};

export const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [pincode, setPincode] = useState("");
  const [buyingOption, setBuyingOption] = useState("onetime");

  // Get product data based on productId, default to smartphone if not found
  const product =
    productsData[productId || "smartphone"] || productsData["smartphone"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", product.title, "Quantity:", quantity);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      seller: product.seller,
    });
    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    console.log("Buying now:", product.title);
    navigate("/checkout");
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-[1500px] mx-auto px-4 py-2">
        <div className="flex items-center text-xs text-gray-600">
          <span className="hover:text-orange-600 cursor-pointer">
            Electronics
          </span>
          <ChevronRight size={16} className="mx-1" />
          <span className="hover:text-orange-600 cursor-pointer">
            Mobiles & Accessories
          </span>
          <ChevronRight size={16} className="mx-1" />
          <span className="hover:text-orange-600 cursor-pointer">
            Smartphones
          </span>
          <ChevronRight size={16} className="mx-1" />
          <span className="text-gray-800">{product.brand}</span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {/* Thumbnail Images */}
              <div className="flex lg:flex-col gap-2 mb-4 lg:absolute lg:left-0 lg:top-0">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 border-2 ${selectedImage === idx ? "border-orange-500" : "border-gray-300"} cursor-pointer hover:border-orange-400 rounded`}
                    onMouseEnter={() => setSelectedImage(idx)}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="lg:ml-14">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full max-w-[500px] mx-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-medium mb-2">{product.title}</h1>

            {/* Brand */}
            <div className="text-sm mb-2">
              Brand:{" "}
              <span className="text-blue-600 hover:text-orange-600 cursor-pointer">
                {product.brand}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <span className="text-sm mr-1">{product.rating}</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-orange-400 text-orange-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-blue-600 ml-3 hover:text-orange-600 cursor-pointer">
                {product.reviews.toLocaleString()} ratings
              </span>
            </div>

            {/* Amazon's Choice Badge */}
            <div className="inline-block bg-[#232f3e] text-white text-xs px-2 py-1 mb-3">
              Amazon's Choice
            </div>

            <hr className="my-4" />

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="text-red-700 text-2xl font-medium">
                  -{product.discount}%
                </span>
                <span className="text-3xl ml-2">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                M.R.P.:{" "}
                <span className="line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <div className="text-sm mt-2">Inclusive of all taxes</div>
              <div className="text-sm text-green-700 font-medium mt-1">
                EMI starts at ₹{Math.round(product.price / 12).toLocaleString()}
                . No Cost EMI available
              </div>
            </div>

            <hr className="my-4" />

            {/* Offers */}
            <div className="mb-4">
              <h3 className="font-bold text-base mb-2">Offers</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 mr-2">
                    Bank Offer
                  </span>
                  <span className="text-sm">
                    10% instant discount on HDFC Bank Credit Cards
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 mr-2">
                    Partner Offers
                  </span>
                  <span className="text-sm">
                    Get GST invoice and save up to 28% on business purchases
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Product Highlights */}
            <div className="mb-4">
              <h3 className="font-bold text-base mb-2">About this item</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-4">
              <h3 className="font-bold text-base mb-2">Technical Details</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications)
                    .slice(0, showAllSpecs ? undefined : 4)
                    .map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-2 pr-4 text-gray-600 w-1/3">{key}</td>
                        <td className="py-2">{value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {Object.keys(product.specifications).length > 4 && (
                <button
                  onClick={() => setShowAllSpecs(!showAllSpecs)}
                  className="text-blue-600 text-sm mt-2 hover:text-orange-600 flex items-center"
                >
                  {showAllSpecs ? "Show less" : "Show more"}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transform transition-transform ${showAllSpecs ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Buy Box */}
          <div className="lg:col-span-1">
            <div className="border border-gray-300 rounded-lg p-4">
              {/* Buying Options */}
              <div className="mb-4">
                <div className="space-y-2">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="buying"
                      value="onetime"
                      checked={buyingOption === "onetime"}
                      onChange={(e) => setBuyingOption(e.target.value)}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        One-time purchase
                      </div>
                      <div className="text-2xl">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  </label>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="buying"
                      value="subscribe"
                      checked={buyingOption === "subscribe"}
                      onChange={(e) => setBuyingOption(e.target.value)}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        Subscribe & Save 10%
                      </div>
                      <div className="text-2xl">
                        {formatPrice(Math.round(product.price * 0.9))}
                      </div>
                      <div className="text-xs text-gray-600">
                        Auto-deliveries sold by {product.seller}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery */}
              <div className="mb-4">
                <div className="text-lg font-medium mb-2">
                  {formatPrice(product.price)}
                </div>
                <div className="text-sm mb-2">
                  FREE delivery{" "}
                  <span className="font-bold">{formattedDeliveryDate}</span>
                </div>
                <div className="text-sm text-blue-600 hover:text-orange-600 cursor-pointer mb-2">
                  <MapPin size={14} className="inline mr-1" />
                  Deliver to Mumbai 400001
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm mr-2"
                  />
                  <button className="text-sm text-blue-600 hover:text-orange-600">
                    Check
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              {product.inStock ? (
                <div className="text-lg text-green-700 font-medium mb-4">
                  In Stock
                </div>
              ) : (
                <div className="text-lg text-red-700 font-medium mb-4">
                  Out of Stock
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="text-sm mr-2">Qty:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#FFD814] border border-[#FCD200] rounded-full py-2 text-sm font-medium hover:bg-[#F7CA00] transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#FFA41C] border border-[#FF8F00] rounded-full py-2 text-sm font-medium hover:bg-[#FF8F00] transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Security & Support */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheck size={16} className="mr-2" />
                  Secure transaction
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck size={16} className="mr-2" />
                  Ships from Amazon
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RotateCcw size={16} className="mr-2" />
                  Eligible for Return, Refund or Replacement
                </div>
              </div>

              {/* Seller Info */}
              <div className="border-t mt-4 pt-4">
                <div className="text-sm">
                  Sold by{" "}
                  <span className="text-blue-600 hover:text-orange-600 cursor-pointer">
                    {product.seller}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {product.rating} out of 5 stars ({product.reviews} ratings)
                </div>
              </div>

              {/* Gift Options */}
              <div className="border-t mt-4 pt-4">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  Add gift options
                </label>
              </div>
            </div>

            {/* Additional Services */}
            <div className="mt-4 border border-gray-300 rounded-lg p-4">
              <h3 className="font-bold text-sm mb-2">Enhance your purchase</h3>
              <div className="space-y-2">
                <label className="flex items-start text-sm cursor-pointer">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <div>
                    <div className="font-medium">2 Year Extended Warranty</div>
                    <div className="text-xs text-gray-600">₹1,999</div>
                  </div>
                </label>
                <label className="flex items-start text-sm cursor-pointer">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <div>
                    <div className="font-medium">
                      1 Year Accidental Damage Protection
                    </div>
                    <div className="text-xs text-gray-600">₹2,499</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-orange-400 text-orange-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg">{product.rating} out of 5</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {product.reviews.toLocaleString()} global ratings
              </p>

              {/* Rating Bars */}
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center mb-2">
                  <span className="text-sm w-12">{stars} star</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-orange-400 h-4 rounded-full"
                      style={{
                        width: `${stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : 3}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm w-10 text-right">
                    {stars === 5
                      ? "60%"
                      : stars === 4
                        ? "25%"
                        : stars === 3
                          ? "10%"
                          : "3%"}
                  </span>
                </div>
              ))}
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-400 text-white text-xs px-2 py-1 rounded mr-2">
                    Verified Purchase
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-orange-400 text-orange-400"
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1">Excellent product!</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Amazing camera quality and super fast performance. Battery
                  life is excellent too!
                </p>
                <p className="text-xs text-gray-500">
                  Reviewed on 15 January 2024
                </p>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-400 text-white text-xs px-2 py-1 rounded mr-2">
                    Verified Purchase
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < 4
                            ? "fill-orange-400 text-orange-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1">
                  Great value for money
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Good phone with excellent features. Display quality is superb.
                </p>
                <p className="text-xs text-gray-500">
                  Reviewed on 10 January 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RufusChatbot />
    </div>
  );
};
