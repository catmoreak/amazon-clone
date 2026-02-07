import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { RufusChatbot } from "../components/RufusChatbot";
import { useCart } from "../context/CartContext";

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [giftMessage, setGiftMessage] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryCharge - appliedDiscount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "10%OFF") {
      const discountAmount = Math.round(totalPrice * 0.1);
      setAppliedDiscount(discountAmount);
      setPromoCode(""); // Clear input after successful application
      // Show success message instead of alert for better UX
    } else {
      alert("Invalid coupon code. Please try again.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(0);
    setPromoCode("");
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully! Thank you for shopping with Amazon.in");
    navigate("/");
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#FFD814] border border-[#FCD200] rounded-lg px-6 py-2 text-sm font-medium hover:bg-[#F7CA00] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        <RufusChatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    Select Address
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium">Review Order</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="ml-2 text-sm text-gray-600">Payment</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <MapPin size={20} className="mr-2 text-orange-500" />
                Select a delivery address
              </h2>

              <div className="space-y-3">
                <label className="flex items-start cursor-pointer border border-gray-300 rounded-lg p-4 hover:border-orange-500">
                  <input
                    type="radio"
                    name="address"
                    value="home"
                    checked={selectedAddress === "home"}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Home</div>
                    <div className="text-sm text-gray-600 mt-1">
                      John Doe
                      <br />
                      123, ABC Apartments, Sector 15
                      <br />
                      Gurgaon, Haryana 122001
                      <br />
                      India
                      <br />
                      Phone: +91 9876543210
                    </div>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer border border-gray-300 rounded-lg p-4 hover:border-orange-500">
                  <input
                    type="radio"
                    name="address"
                    value="office"
                    checked={selectedAddress === "office"}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Office</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Tech Solutions Pvt Ltd
                      <br />
                      Cyber City, Tower B, 5th Floor
                      <br />
                      Gurgaon, Haryana 122002
                      <br />
                      India
                      <br />
                      Phone: +91 9876543210
                    </div>
                  </div>
                </label>

                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors">
                  + Add a new address
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4">Review your order</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain mr-4"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-600 mb-2">
                        Sold by: {item.seller}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-orange-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-3 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-orange-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-lg font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Gift Options */}
              <div className="mt-6 pt-4 border-t">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">This order contains a gift</span>
                </label>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add a gift message (optional)"
                  className="w-full mt-2 p-2 border border-gray-300 rounded text-sm"
                  rows={3}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <CreditCard size={20} className="mr-2 text-orange-500" />
                Select a payment method
              </h2>

              <div className="space-y-3">
                <label className="flex items-start cursor-pointer border border-gray-300 rounded-lg p-4 hover:border-orange-500">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPayment === "card"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Visa, Mastercard, RuPay, American Express
                    </div>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer border border-gray-300 rounded-lg p-4 hover:border-orange-500">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPayment === "upi"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">UPI</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Paytm, Google Pay, PhonePe, BHIM UPI
                    </div>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer border border-gray-300 rounded-lg p-4 hover:border-orange-500">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={selectedPayment === "netbanking"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Net Banking</div>
                    <div className="text-sm text-gray-600 mt-1">
                      All major banks supported
                    </div>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer border border-gray-300 rounded-lg p-4 hover:border-orange-500">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === "cod"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Pay when you receive your order
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#FFD814] border border-[#FCD200] rounded-lg py-3 text-lg font-bold mb-4 hover:bg-[#F7CA00] transition-colors"
              >
                Place your order
              </button>

              <div className="text-xs text-gray-600 mb-4 text-center">
                By placing your order, you agree to Amazon's{" "}
                <a href="#" className="text-blue-600 hover:text-orange-600">
                  privacy notice
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-orange-600">
                  conditions of use
                </a>
                .
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <h3 className="font-bold text-lg mb-3">Order Summary</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Items ({items.length}):</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span
                      className={deliveryCharge === 0 ? "text-green-600" : ""}
                    >
                      {deliveryCharge === 0
                        ? "FREE"
                        : formatPrice(deliveryCharge)}
                    </span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount:</span>
                      <span>-{formatPrice(appliedDiscount)}</span>
                    </div>
                  )}

                  <hr className="my-2" />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Order Total:</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="border-t pt-4 mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code (try 10%OFF)"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                    disabled={appliedDiscount > 0}
                  />
                  {appliedDiscount > 0 ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyPromo}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {appliedDiscount > 0 && (
                  <div className="text-green-600 text-sm mt-2 flex items-center justify-between">
                    <span>
                      ✓ Coupon "10%OFF" applied: {formatPrice(appliedDiscount)}{" "}
                      off
                    </span>
                  </div>
                )}
              </div>

              {/* Security & Support */}
              <div className="border-t pt-4 mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheck size={16} className="mr-2 text-green-600" />
                  Secure SSL encryption
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck size={16} className="mr-2 text-blue-600" />
                  Fast & free delivery
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RotateCcw size={16} className="mr-2 text-orange-600" />
                  Easy returns & refunds
                </div>
              </div>

              {/* Need Help */}
              <div className="border-t pt-4 mt-4">
                <div className="text-sm">
                  <span className="text-gray-600">Need help? </span>
                  <a href="#" className="text-blue-600 hover:text-orange-600">
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RufusChatbot />
    </div>
  );
};
