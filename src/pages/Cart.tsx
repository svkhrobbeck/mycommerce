import { FC, useContext, useState } from "react";
import { getStorageParse } from "../helpers/localStorage";
import { CART_LOCALSTORAGE } from "../constants/constants";
import { IProduct } from "../interfaces";
import { CartItem, CheckoutModal } from "../components";
import { styles } from "../constants/styles";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Cart: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { setAuth } = useContext(Context);
  const [carts, setCarts] = useState<IProduct[]>(getStorageParse(CART_LOCALSTORAGE));
  const total: number = carts.reduce((a, b) => a + (b.count || 0) * (b?.price || 0), 0);

  return (
    <div>
      <section className={`${styles.py} mx-auto max-w-4xl px-4 sm:px-6 lg:px-8`}>
        <h1 className="text-xl mb-8 text-center font-bold text-gray-900 sm:text-3xl">Your Cart</h1>

        {!!carts.length ? (
          <ul className="mb-2 space-y-4 max-h-[300px]  md:max-h-[600px] py-4 overflow-y-auto">
            {carts.map(cart => (
              <li key={cart.id}>
                <CartItem setCarts={setCarts} cart={cart} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={`${styles.flexCenter} text-center mb-5 flex-col`}>
            <div className="w-[120px] h-[120px] xs:w-[150px] xs:h-[150px] sm:w-[210px] sm:h-[210px] md:w-[240px] md:h-[240px] select-none mb-3 bg-bg-image-empty bg-no-repeat bg-center bg-contain" />
            <h2 className="font-bold text-[16px] sm:text-lg md:text-xl lg:text-2xl">There are currently no products in your cart</h2>
            <p className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[18px] mb-3">
              Start with a category on the home page or find the product you need by searching
            </p>
            <button className={`${styles.buttonGreen} ${styles.focus}`} onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        )}

        <div className="flex justify-end border-t border-gray-300 pt-6">
          <div className="w-screen max-w-lg space-y-4 text-sm text-gray-700">
            <div className={`${styles.flexBetween} text-[16px] font-medium`}>
              <span>Total</span>
              <span>{total.toLocaleString("ru")}$</span>
            </div>
            <div className={`${styles.flexBetween} text-[16px] font-medium`}>
              <span>with delivery</span>
              <span>+ 10$</span>
            </div>
            <div className="flex justify-end">
              <button className={`${styles.buttonDarkGray} ${styles.focus}`} onClick={() => setAuth(prev => ({ ...prev, modal: true }))}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <CheckoutModal total={total} carts={carts} />
    </div>
  );
};

export default Cart;
