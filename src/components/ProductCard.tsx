import { FC } from "react";
import { Link } from "react-router-dom";

interface IProductCard {
  id: number;
  images: string[];
  title: string;
  price: number;
}

const ProductCard: FC<IProductCard> = ({ id, images, title, price }): JSX.Element => {
  return (
    <div className="border-gray-300 p-1">
      <img src={images[0]} className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]" />
      <div className="relative bg-white pt-3">
        <span className="whitespace-nowrap mb-3 inline-block bg-yellow-400 px-3 py-1.5 text-xs font-medium">New</span>
        <Link to={`product/${id}`} className="group block overflow-hidden">
          <h3 className="text-md mb-2 text-gray-700 group-hover:underline group-hover:underline-offset-4">{title}</h3>
        </Link>
        <p className="mb-2">
          <span className="tracking-wider text-gray-900">${price}</span>
        </p>
        <button className="block w-full mb-2 rounded bg-yellow-400 p-3 text-sm font-medium transition hover:scale-105">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
