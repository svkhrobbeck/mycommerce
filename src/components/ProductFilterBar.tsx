import { FC, useState, useRef, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

import getUrlParams from "../helpers/getUrlParams";
import { styles } from "../constants/styles";

const ProductFilterBar: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [min, setMin] = useState<string>(searchParams.get("min") || "");
  const [max, setMax] = useState<string>(searchParams.get("max") || "");
  const [title, setTitle] = useState<string>(searchParams.get("title") || "");
  let timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    clearTimeout(timeoutId.current);
    setTitle(e.target.value);
    timeoutId.current = setTimeout(() => {
      setSearchParams(getUrlParams("title", e.target.value, searchParams));
    }, 500);
  };

  const changeValPrice = (e: ChangeEvent<HTMLInputElement>, name: "min" | "max"): void => {
    const val = e.target.value;
    name === "max" ? setMax(val) : setMin(val);
    setSearchParams(getUrlParams(name, val, searchParams));
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-stretch gap-4 mb-2">
      <div className="relative flex items-stretch mb-2 lg:mb-0">
        <input
          type="text"
          id="Search"
          autoComplete="off"
          placeholder="Search..."
          value={title}
          onChange={handleChangeSearch}
          className={`${styles.borderGray} p-2 md:p-4 w-full shadow-sm sm:text-md`}
        />
        <span className="absolute inset-y-0 end-0 grid w-10">
          <button className="text-gray-600 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </span>
      </div>

      <details className={`${styles.borderGray} overflow-hidden select-none`}>
        <summary className={`${styles.flexBetween} cursor-pointer p-2 md:p-4 text-gray-900 transition-all`}>
          <span className="hidden sm:inline-block text-sm font-medium">Price</span>

          <div className="flex w-full sm:w-auto justify-between gap-4">
            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>
              <input
                className={`${styles.borderGray} w-full p-1 shadow-sm sm:text-sm overflow-hidden select-none`}
                type="number"
                id="FilterPriceFrom"
                placeholder="From"
                value={min}
                onChange={e => changeValPrice(e, "min")}
              />
            </label>
            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>
              <input
                className={`${styles.borderGray} w-full p-1 shadow-sm sm:text-sm overflow-hidden select-none`}
                type="number"
                id="FilterPriceTo"
                placeholder="To"
                value={max}
                onChange={e => changeValPrice(e, "max")}
              />
            </label>
          </div>
        </summary>
      </details>
    </div>
  );
};

export default ProductFilterBar;
