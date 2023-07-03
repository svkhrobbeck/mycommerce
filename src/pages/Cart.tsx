import { FC, useContext, useState } from "react";
import { getStorageParse } from "../helpers/localStorage";
import { CART_LOCALSTORAGE } from "../constants/constants";
import { IProduct } from "../interfaces";
import { CartItem, CheckoutModal } from "../components";
import { styles } from "../constants/styles";
import { Context } from "../context/Context";

const Cart: FC = (): JSX.Element => {
  const { setAuth } = useContext(Context);
  const [carts, setCarts] = useState<IProduct[]>(getStorageParse(CART_LOCALSTORAGE));
  const total: number = carts.reduce((a, b) => a + (b.count || 0) * (b?.price || 0), 0);

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
            </header>
            <div className="mt-8">
              <ul className="space-y-4 max-h-[600px] py-4 overflow-y-auto">
                {carts.map(cart => (
                  <li key={cart.id}>
                    <CartItem setCarts={setCarts} cart={cart} />
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
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
                    <button onClick={() => setAuth(prev => ({ ...prev, modal: true }))} className={`${styles.buttonDarkGray}`}>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CheckoutModal total={total} carts={carts} />
    </div>
  );
};

export default Cart;
