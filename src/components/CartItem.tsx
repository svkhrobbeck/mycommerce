import { ChangeEvent, FC, useState } from "react";
import { IProduct, TypeStateSetter } from "../interfaces";
import { styles } from "../constants/styles";
import { addToCart, removeFromCart } from "../helpers/addRemoveCart";
import { Link } from "react-router-dom";
import { iconTrash } from "../assets";

interface ICartItem {
  cart: IProduct;
  setCarts: TypeStateSetter;
}

const CartItem: FC<ICartItem> = ({ cart, setCarts }): JSX.Element => {
  const [value, setValue] = useState<number>(typeof cart?.count === "number" ? cart?.count : 1);

  const updateCart = (count: number): void => {
    const newCart: IProduct = { ...cart, count };
    setCarts(addToCart(newCart));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val: number = +e.target.value;
    setValue(val);
    updateCart(val);
  };

  const handleDelClick = (): void => setCarts(removeFromCart(Number(cart?.id)));

  return (
    <div className="flex items-center justify-between gap-4">
      <Link className="flex items-center gap-4" to={`/product/${cart.id}`}>
        <img className="w-[28px] md:w-[64px] h-auto rounded" src={cart.images && cart?.images[0]} />
        <div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-900">{cart.title}</h3>
          <span className="font-medium text-gray-600 inline leading-[0] text-xs md:text-sm">Price: ${cart.price}</span>
        </div>
      </Link>
      <div className="flex flex-1 items-center justify-end gap-2">
        <div className={`${styles.borderGray} ${styles.flexCenter}`}>
          <button
            type="button"
            disabled={value === 0}
            onClick={() => {
              updateCart(value - 1);
              setValue(p => p - 1);
            }}
            className="outline-none w-6 h-6 md:w-10 md:h-10 leading-6 md:leading-10 text-md md:text-xl disabled:opacity-60 text-gray-600 transition hover:opacity-75"
          >
            −
          </button>
          <input
            className="w-12 h-6 md:h-10 md:w-16 border-transparent outline-none text-center [-moz-appearance:_textfield] sm:text-sm"
            type="number"
            min={0}
            value={value}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => {
              updateCart(value + 1);
              setValue(p => p + 1);
            }}
            className="outline-none w-6 h-6 md:w-10 md:h-10 leading-6 md:leading-10 text-md md:text-xl text-gray-600 transition hover:opacity-75"
          >
            +
          </button>
        </div>
        <button onClick={handleDelClick}>
          <img className="w-[24px] h-auto" src={iconTrash} alt="icon delete trash" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
