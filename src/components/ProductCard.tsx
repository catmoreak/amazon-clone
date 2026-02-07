import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  title: string;
  image: string;
  linkText?: string;
  multiImage?: boolean;
  images?: { title: string; img: string }[];
  productId?: string;
}

export const ProductCard = ({
  title,
  image,
  linkText = "See more",
  multiImage = false,
  images,
  productId,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div
      className="bg-white p-5 m-2.5 h-[420px] flex flex-col justify-between shadow-md z-10 flex-1 min-w-[250px] rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <h2 className="text-[21px] font-bold mb-2.5 leading-tight">{title}</h2>

      <div className="flex-1 flex justify-center items-center overflow-hidden mb-2.5">
        {multiImage && images ? (
          <div className="grid grid-cols-2 gap-2.5 w-full h-full">
            {images.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="bg-[#f7f7f7] h-[100px] flex items-center justify-center mb-1.5 rounded">
                  <img
                    src={item.img}
                    className="max-h-full max-w-full object-contain p-1.5"
                    alt={item.title}
                  />
                </div>
                <span className="text-[11px] text-[#333]">{item.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      <a
        href="#"
        onClick={handleLinkClick}
        className="text-[#007185] text-[13px] no-underline font-semibold hover:text-[#C7511F] hover:underline"
      >
        {linkText}
      </a>
    </div>
  );
};
