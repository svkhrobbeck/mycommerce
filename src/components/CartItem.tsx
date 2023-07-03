import { ChangeEvent, FC, useState } from "react";
import { IProduct, TypeStateSetter } from "../interfaces";
import { styles } from "../constants/styles";
import { addToCart, removeFromCart } from "../helpers/addRemoveCart";
import { Link } from "react-router-dom";

interface ICartItem {
  cart: IProduct;
  setCarts: TypeStateSetter;
}

const CartItem: FC<ICartItem> = ({ cart, setCarts }): JSX.Element => {
  const [value, setValue] = useState<number>(typeof cart?.count === "number" ? cart?.count : 1);

  const updateCart = (count: number) => {
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
      <div className="flex items-center gap-4">
        <img className="w-[28px] md:w-[64px] h-auto rounded" src={cart.images && cart?.images[0]} />
        <Link to={`/product/${cart.id}`}>
          <h3 className="text-xs md:text-sm font-semibold text-gray-900">{cart.title}</h3>
          <div className="font-medium text-gray-600">
            <span className="inline leading-[0] text-xs md:text-sm">Price: </span>
            <span className="inline leading-[0] text-xs md:text-sm">${cart.price}</span>
          </div>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <div className={`${styles.borderGray} flex items-center`}>
          <button
            type="button"
            disabled={value === 0}
            onClick={() => {
              updateCart(value - 1);
              setValue(p => p - 1);
            }}
            className="w-6 h-6 md:w-10 md:h-10 disabled:opacity-60 leading-6  md:leading-10 text-gray-600 transition hover:opacity-75"
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
            className="w-6 h-6 md:w-10 md:h-10 leading-6 leading-10 text-gray-600 transition hover:opacity-75"
          >
            +
          </button>
        </div>
        <button className="text-gray-600 transition hover:text-red-600" onClick={handleDelClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
