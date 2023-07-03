import { FC, useContext } from "react";
import { createPortal } from "react-dom";
import { IProduct } from "../interfaces";
import { styles } from "../constants/styles";
import { countries } from "../constants/constants";
import { Context } from "../context/Context";

interface IChekoutModal {
  total: number;
  carts: IProduct[];
}

const CheckoutModal: FC<IChekoutModal> = ({ total, carts }): JSX.Element => {
  const { auth, setAuth } = useContext(Context);

  return createPortal(
    <>
      {auth?.modal && (
        <section className="fixed flex justify-center z-[400] overflow-auto p-5 inset-0 bg-black bg-opacity-60">
          <h1 className="sr-only">Checkout</h1>
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-50 py-12 md:py-24">
              <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
                <div className="flex items-center gap-4">
                  <img className="w-[128px] md:w-[170px] bg-dark p-2" src="/logo.svg" alt="" />
                </div>
                <div>
                  <p className="text-2xl font-medium tracking-tight text-gray-900">${total}</p>
                  <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
                </div>
                <div>
                  <div className="flow-root">
                    <ul className="-my-4 max-h-[500px] overflow-y-auto divide-y divide-gray-100">
                      {!!carts?.length &&
                        carts?.map(cart => (
                          <li className="flex items-center gap-4 py-4" key={cart?.id}>
                            <img src={cart?.images && cart.images[0]} alt={cart?.title} className="h-16 w-16 rounded object-cover" />
                            <div>
                              <h3 className="text-xs md:text-sm font-semibold text-gray-900">{cart.title}</h3>
                              <div className="font-medium text-gray-600">
                                <span className="inline leading-[0] text-xs md:text-sm">Price: </span>
                                <span className="inline leading-[0] text-xs md:text-sm">${cart.price}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <form className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      className={`${styles.borderGray} p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm`}
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={`${styles.borderGray} p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm`}
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      type="email"
                      placeholder="Email"
                      className={`${styles.borderGray} p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm`}
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      type="tel"
                      placeholder="Phone"
                      className={`${styles.borderGray} p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm`}
                    />
                  </div>
                  <fieldset className="col-span-6">
                    <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                      <div>
                        <input
                          type="text"
                          id="CardNumber"
                          placeholder="Card Number"
                          className={`${styles.borderGray} rounded-b-none p-2 relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm`}
                        />
                      </div>
                      <div className="flex">
                        <div className="flex-1">
                          <input
                            type="text"
                            id="CardExpiry"
                            placeholder="Expiry Date"
                            className={`${styles.borderGrayNotRounded} p-2 relative w-full rounded-bl border-gray-200 focus:z-10 sm:text-sm`}
                          />
                        </div>
                        <div className="-ms-px flex-1">
                          <input
                            type="text"
                            id="CardCVC"
                            placeholder="CVC"
                            className={`${styles.borderGrayNotRounded} p-2 relative w-full rounded-br border-gray-200 focus:z-10 sm:text-sm`}
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="col-span-6">
                    <legend className="block text-sm font-medium text-gray-700">Address</legend>
                    <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                      <div>
                        <label htmlFor="Country" className="sr-only">
                          Country
                        </label>
                        <select
                          id="Country"
                          className={`${styles.borderGray} p-2 relative w-full rounded-b-none border-gray-200 focus:z-10 sm:text-sm`}
                        >
                          {countries.map(country => (
                            <option value={country} key={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          id="PostalCode"
                          placeholder="ZIP/Post Code"
                          className={`${styles.borderGray} p-2 relative w-full rounded-t-none border-gray-200 focus:z-10 sm:text-sm`}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <div className="col-span-6">
                    <button className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg mb-2">
                      Buy Now
                    </button>
                    <button className={`${styles.buttonGreen} w-full`} onClick={() => setAuth(prev => ({ ...prev, modal: false }))}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>,
    document.body
  );
};

export default CheckoutModal;
