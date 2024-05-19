import { FC } from "react";
import { styles } from "../constants/styles";

const ProductsNotFound: FC = (): JSX.Element => {
  return (
    <div className={`${styles.flexCenter} border-t-0 rounded-t-none flex-col md:flex-row ${styles.borderGray} ${styles.py} px-6 xl:px-0 gap-5 lg:py-8`}>
      <div className="h-[210px] w-[210px] md:h-[170px] md:w-[170px] lg:h-[230px] lg:w-[230px] rounded-full border-2 border-indigo-500" aria-hidden="true">
        <img className="rounded-full" src="/images/not-found-cat.jpg" alt="not found cat" />
      </div>
      <div className="text-center md:text-left">
        <strong className="inline-block mb-2 rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[16px] font-medium text-white">404</strong>
        <h3 className="md:mb-1 lg:mb-2 xl:mb-3 text-2xl uppercase sm:text-3xl md:text-4xl text-gray-700">Products were not found</h3>
        <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-gray-500 font-medium">Please select other category!</p>
      </div>
    </div>
  );
};

export default ProductsNotFound;
