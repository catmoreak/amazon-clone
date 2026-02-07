import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";

const banners = [
  {
    image: banner1,
    alt: "Up to 60% off Fashion & beauty",
  },
  {
    image: banner2,
    alt: "Amazon Banner 2",
  },
  {
    image: banner3,
    alt: "Amazon Banner 3",
  },
  {
    image: banner4,
    alt: "Amazon Banner 4",
  },
  {
    image: banner5,
    alt: "Amazon Banner 5",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-[1500px] mx-auto">
      {/* Hero Banner Carousel */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        {/* Banner Images */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="min-w-full h-full flex items-center justify-center"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 hover:bg-white border border-gray-200 cursor-pointer z-20 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Previous banner"
        >
          <ChevronLeft size={24} className="text-[#232f3e]" />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 hover:bg-white border border-gray-200 cursor-pointer z-20 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Next banner"
        >
          <ChevronRight size={24} className="text-[#232f3e]" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full border-none cursor-pointer transition-all ${
                currentSlide === index
                  ? "bg-[#232f3e] w-6"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>

        {/* Gradient Fade at Bottom */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#eaeded] to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};
