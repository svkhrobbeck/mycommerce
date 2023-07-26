import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../constants/styles";
import { SwiperImageSliders } from ".";
import { IProduct } from "../interfaces";
import { CART_LOCALSTORAGE } from "../constants/constants";
import { getStorageParse } from "../helpers/localStorage";
import { iconStar, iconWhiteStar } from "../assets";
import useLocalStorage from "../hooks/useLocalstorage";

const ProductCard: FC<IProduct> = ({ id, images, title, price }): JSX.Element => {
  const getRandomNumber = (num: number): number => Math.trunc(Math.random()) * num;
  const [carts, setCarts] = useState<IProduct[]>(getStorageParse(CART_LOCALSTORAGE));
  const [keys, setKeys] = useState<number[]>(getStorageParse(CART_LOCALSTORAGE).map(item => Number(item?.id)));
  const { toggle } = useLocalStorage();

  const addToCart = (): void => setCarts(toggle({ id, images, title, price }));

  useEffect((): void => {
    setKeys(carts.map(cart => Number(cart.id)));
  }, [carts]);

  return (
    <div className={`${styles.borderGray} p-1 sm:p-2 md:p-3 select-none`}>
      <Link to={`/product/${id}`} className="hidden sm:block">
        <SwiperImageSliders images={images || []} />
      </Link>
      <div>
        <img
          src={images && images[getRandomNumber(images?.length || 2)]}
          className="h-[350px] rounded-md block sm:hidden w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
      </div>

      <div className="relative bg-white">
        <h3 className="text-lg font-semibold mb-1 text-blue-700 group-hover:underline group-hover:underline-offset-4">
          <Link to={`/product/${id}`} className="group mb-2 block overflow-hidden">
            {title}
          </Link>
        </h3>
        <p className="text-sm mb-3">Highest Rated Product</p>
        <div className="flex mb-1">
          <img className="w-[20px] h-auto" src={iconStar} alt="icon star" />
          <img className="w-[20px] h-auto" src={iconStar} alt="icon star" />
          <img className="w-[20px] h-auto" src={iconStar} alt="icon star" />
          <img className="w-[20px] h-auto" src={iconStar} alt="icon star" />
          <img className="w-[20px] h-auto" src={iconWhiteStar} alt="icon star" />
        </div>
        <p className="mb-3">
          <span className="tracking-wider text-gray-900">${price}</span>
        </p>
        <button
          className={`${styles.buttonYellow} ${styles.focus} ${keys.includes(Number(id)) && "bg-yellow-600"} hover:scale-[1.02]`}
          onClick={addToCart}
        >
          {keys.includes(Number(id)) ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
