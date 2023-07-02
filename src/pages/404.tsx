import { FC } from "react";
import { Link } from "react-router-dom";
const PageNotFound: FC = (): JSX.Element => {
  return (
    <div className="flex-grow-[1] flex flex-col px-4 bg-white place-content-center">
      <div className="text-center flex-grow-[1] flex flex-col justify-center">
        <h1 className="font-black text-gray-200 text-9xl md:text-[200px]">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
        <p className="mt-4 text-gray-500">We can't find that page.</p>
        <Link
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring mx-auto"
          to="/"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
