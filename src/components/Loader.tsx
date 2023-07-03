import { FC } from "react";
import { loader } from "../assets";

const Loader: FC = (): JSX.Element => {
  return (
    <div className={`flex justify-center items-start z-[200] fixed top-0 left-0 inset-0`}>
      <img className="max-w-[90px] mt-[130px] md:max-w-[150px] w-full h-auto" src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
