import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../constants/styles";
import { SwiperImageSliders } from ".";
import { IProduct } from "../interfaces";
import setToCart from "../helpers/setToCart";
import { CART_LOCALSTORAGE } from "../constants/constants";
import { getStorageParse } from "../helpers/localStorage";

const ProductCard: FC<IProduct> = ({ id, images, title, price }): JSX.Element => {
  const getRandomNumber = (num: number): number => Math.trunc(Math.random()) * num;
  const [keys, setKeys] = useState<number[]>(getStorageParse(CART_LOCALSTORAGE));

  const addToCart = () => {
    setKeys(setToCart(id));
  };

  return (
    <div className="border-gray-300 select-none">
      <div className="hidden sm:block">
        <SwiperImageSliders images={images} />
      </div>
      <div>
        <img
          src={images[getRandomNumber(images.length)]}
          className="h-[350px] block sm:hidden w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
      </div>

      <div className="relative bg-white pt-3">
        <span className={`${styles.badgeYellow}`}>New</span>
        <Link to={`/product/${id}`} className="group mb-2 block overflow-hidden">
          <h3 className="text-lg font-semibold mb-2 text-blue-700 group-hover:underline group-hover:underline-offset-4">{title}</h3>
        </Link>
        <p className="mb-3">
          <span className="tracking-wider text-gray-900">${price}</span>
        </p>
        <button className={`${styles.buttonYellow} hover:scale-105`} onClick={addToCart}>
          {keys.includes(id) ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
