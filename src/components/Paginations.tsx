import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import getUrlParams from "../helpers/getUrlParams";
import { v4 as uuidv4 } from "uuid";
interface IPaginations {
  total: number;
}

const Paginations: FC<IPaginations> = ({ total }): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginations = new Array(total).fill("").map((item, i) => (item = { id: uuidv4(), idx: i + 1 }));

  const handleClick = (page: number) => {
    setSearchParams(getUrlParams("page", page, searchParams));
  };

  return (
    <div className="flex justify-center gap-1 text-xs font-medium">
      <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
        <span className="sr-only">Prev Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {paginations.map(({ id, idx }) => (
        <button
          className={`block h-8 w-8 rounded border ${
            +(searchParams.get("page") || 1) === +idx ? "border-blue-600 bg-blue-600 text-white" : "border-gray-100 text-gray-900 bg-white"
          } text-center leading-8`}
          key={id}
          onClick={() => handleClick(idx)}
        >
          {idx}
        </button>
      ))}

      <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
        <span className="sr-only">Next Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
/* <li className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">1</li> */
export default Paginations;
