import { ChangeEvent, FC, useState } from "react";
import { IProduct, TypeStateSetter } from "../interfaces";
import { styles } from "../constants/styles";
import { Link } from "react-router-dom";
import { iconTrash } from "../assets";
import useLocalStorage from "../hooks/useLocalstorage";
interface ICartItem {
  cart: IProduct;
  setCarts: TypeStateSetter;
}

const CartItem: FC<ICartItem> = ({ cart, setCarts }): JSX.Element => {
  const [value, setValue] = useState<number>(typeof cart?.count === "number" ? cart?.count : 1);
  const [decr, setDecr] = useState<string | JSX.Element>("-");
  const { add, remove } = useLocalStorage();

  const updateCart = (count: number): void => {
    const newCart: IProduct = { ...cart, count };
    setCarts(add(newCart));
  };

  const handleDelete = (): void => setCarts(remove(Number(cart?.id)));

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val: number = +e.target.value;
    setValue(val);
    if (val === 0) return handleDelete();
    updateCart(val);
  };

  const handleDec = (): void => {
    if (value < 2) return handleDelete();
    setValue(p => p - 1);
    updateCart(value - 1);
  };
  return (
    <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
      <Link className="flex items-center gap-4" to={`/product/${cart.id}`}>
        <img
          className=" w-[68px] xs:w-[28px] md:w-[64px] aspect-square h-auto rounded"
          src={cart.images && cart?.images[0]}
          alt={cart.title}
        />
        <div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-900">{cart.title}</h3>
          <span className="font-medium text-gray-600 inline leading-[0] text-xs md:text-sm">Price: ${cart.price}</span>
        </div>
      </Link>
      <div className="flex flex-1 w-full items-center justify-between xs:justify-end gap-2">
        <div className={`${styles.borderGray} ${styles.flexCenter}`}>
          <button
            type="button"
            onClick={handleDec}
            onMouseOver={() => (value === 1 ? setDecr(<img className="w-6 h-auto" src={iconTrash} alt="icon trash" />) : setDecr("-"))}
            onMouseLeave={() => setDecr("-")}
            className="outline-none flex justify-center items-center w-6 h-6 md:w-10 md:h-10 leading-4 sm:leading-6 md:leading-10 text-md md:text-xl disabled:opacity-60 text-gray-600 transition hover:opacity-75"
          >
            {decr}
          </button>
          <input
            className="w-12 h-6 md:h-10 md:w-16 border-transparent outline-none text-center [-moz-appearance:_textfield] text-xs sm:text-sm"
            type="number"
            min={1}
            value={value}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => {
              updateCart(value + 1);
              setValue(p => p + 1);
            }}
            className="outline-none flex justify-center items-center w-6 h-6 md:w-10 md:h-10 leading-4 sm:leading-6 md:leading-10 text-md md:text-xl text-gray-600 transition hover:opacity-75"
          >
            +
          </button>
        </div>
        <button className="flex-shrink-0" onClick={handleDelete}>
          <img className="w-[20px] md:w-[24px] h-auto" src={iconTrash} alt="icon delete trash" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
