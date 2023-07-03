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
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-50 py-6 md:py-8 px-4 lg:px-8 space-y-2">
              <img className="w-[128px] md:w-[170px] bg-dark p-2" src="/logo.svg" alt="logo mycommerce" />
              <p className="text-2xl font-medium tracking-tight text-gray-900">${total}</p>
              <p className="text-sm text-gray-600">For the purchase of</p>
              <ul className="max-h-[300px] md:max-h-[500px] overflow-y-auto divide-y divide-gray-100">
                {carts?.map(cart => (
                  <li className="flex items-center gap-4 py-3" key={cart?.id}>
                    <img className="h-16 w-16 rounded" src={cart?.images && cart.images[0]} alt={cart?.title} />
                    <div>
                      <h3 className="text-xs md:text-sm font-semibold text-gray-900">{cart.title}</h3>
                      <span className="font-medium text-gray-600 inline leading-[0] text-xs md:text-sm">Price: ${cart.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white py-6 md:py-8">
              <form className=" grid grid-cols-6 gap-2 mx-auto max-w-lg px-4 lg:px-8">
                <input
                  className={`${styles.borderGray} mb-auto col-span-6 sm:col-span-3 p-2 mt-1 w-full rounded-md shadow-sm sm:text-sm`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className={`${styles.borderGray} col-span-6 sm:col-span-3 p-2 mt-1 w-full rounded-md shadow-sm sm:text-sm mb-auto`}
                  type="text"
                  placeholder="Last Name"
                />
                <input
                  className={`${styles.borderGray} p-2 mt-1 w-full rounded-md shadow-sm sm:text-sm col-span-6 mb-auto`}
                  type="email"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className={`${styles.borderGray} p-2 mt-1 w-full rounded-md shadow-sm sm:text-sm col-span-6 mb-auto`}
                />
                <fieldset className="col-span-6">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className={`${styles.borderGray} rounded-b-none p-2 relative mt-1 w-full focus:z-10 sm:text-sm`}
                  />
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Expiry Date"
                      className={`${styles.borderGrayNotRounded} -mt-[1px]  p-2 relative w-full rounded-bl focus:z-10 sm:text-sm`}
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className={`${styles.borderGrayNotRounded} -mt-[1px] p-2 relative w-full rounded-br focus:z-10 sm:text-sm`}
                    />
                  </div>
                </fieldset>
                <fieldset className="col-span-6">
                  <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <select id="country" className={`${styles.borderGray} p-2 relative w-full rounded-b-none focus:z-10 sm:text-sm`}>
                    {countries.map(country => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className={`${styles.borderGray} -mt-[1px] p-2 relative w-full rounded-t-none focus:z-10 sm:text-sm mb-3`}
                  />
                  <button className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg mb-2">
                    Buy Now
                  </button>
                  <button className={`${styles.buttonGreen} w-full`} onClick={() => setAuth(prev => ({ ...prev, modal: false }))}>
                    Cancel
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </section>
      )}
    </>,
    document.body
  );
};

export default CheckoutModal;
