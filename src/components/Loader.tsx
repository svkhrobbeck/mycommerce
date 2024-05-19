import { FC } from "react";
import { loader } from "../assets";

const Loader: FC = (): JSX.Element => {
  return (
    <div className={`flex justify-center items-center z-[200] fixed inset-0`}>
      <img className="max-w-[90px] md:max-w-[150px] w-full h-auto" src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
