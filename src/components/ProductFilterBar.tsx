import { FC, useState, useRef, ChangeEvent } from "react";
import { styles } from "../constants/styles";
import { useSearchParams } from "react-router-dom";
import getUrlParams from "../helpers/getUrlParams";

const ProductFilterBar: FC = ({}): JSX.Element => {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  let timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => setSearchParams(getUrlParams("title", e.target.value, searchParams)), 500);
  };

  const priceValsReset = () => {
    setMin("");
    setMax("");
    setSearchParams(getUrlParams("", "", searchParams, "price_max", "price_min"));
  };

  const changeClearMinVal = (e: ChangeEvent<HTMLInputElement>) => {
    setMin(e.target.value);
    setSearchParams(getUrlParams("price_min", e.target.value, searchParams));
  };

  const changeMaxVal = (e: ChangeEvent<HTMLInputElement>) => {
    setMax(e.target.value);
    setSearchParams(getUrlParams("price_max", e.target.value, searchParams));
  };

  return (
    <div className="space-y-2 lg:block">
      <div className="relative">
        <input
          type="text"
          id="Search"
          autoComplete="off"
          placeholder="Search for..."
          onChange={handleChangeSearch}
          className="border-gray-300 p-2 md:p-4 focus:outline-cyan-700 rounded border w-full shadow-sm sm:text-md"
        />
        <span className="absolute inset-y-0 end-0 grid w-10">
          <button className="text-gray-600 hover:text-gray-700">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>

      <details className="overflow-hidden select-none rounded border border-gray-300">
        <summary className={`${styles.flexBetween} cursor-pointer gap-2 p-2 md:p-4 text-gray-900 transition-all`}>
          <span className="text-sm font-medium">Price</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>
        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700">Min and Max Price</span>
            <button onClick={priceValsReset} type="button" className="text-md text-blue-700 font-semibold">
              Reset
            </button>
          </header>
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  className="w-full p-1 focus:outline-gray-500 focus:outline-1 rounded-sm border-gray-200 shadow-sm sm:text-sm"
                  type="number"
                  id="FilterPriceFrom"
                  placeholder="From"
                  value={min}
                  onChange={changeClearMinVal}
                />
              </label>
              <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  className="w-full p-1 focus:outline-gray-500 focus:outline-1 rounded-sm border-gray-200 shadow-sm sm:text-sm"
                  type="number"
                  id="FilterPriceTo"
                  placeholder="To"
                  value={max}
                  onChange={changeMaxVal}
                />
              </label>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default ProductFilterBar;
