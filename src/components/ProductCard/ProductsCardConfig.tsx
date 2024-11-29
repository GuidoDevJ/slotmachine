import Image from "next/image";

interface ProductCardProps {
  product: {
    _id: string;
    imageURL: string;
    name: string;
    description: string;
  };
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
  isSelected?: boolean;
  height?: number;
  highlightedClass?: string;
}

const ProductCardConfig: React.FC<ProductCardProps> = ({
  product,
  onClick,
  isSelected = false,
  height = 250,
  highlightedClass = "border-red-600",
}) => {
  return (
    <div
      onClick={(e) => onClick(e, product._id)}
      key={product._id}
      data-key={product._id}
      className={`max-w-[150px] w-full h-[${height}px] flex flex-col border-solid border-[2px] rounded-lg ${
        isSelected ? highlightedClass : ""
      }`}
    >
      <div className="w-full h-[75%] relative">
        <Image
          src={product.imageURL}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full h-[25%] bg-[#FEF7FF] flex flex-col justify-center p-2">
        <h3 className="text-[16px] text-[#1D1B20] font-bold mb-2">{product.name}</h3>
        <span className="text-[12px] text-[#000]">{product.description}</span>
      </div>
    </div>
  );
};

export default ProductCardConfig;
