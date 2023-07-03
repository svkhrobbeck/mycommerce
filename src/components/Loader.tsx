import { FC } from "react";
import { loader } from "../assets/icons";
import { styles } from "../constants/styles";

const Loader: FC = (): JSX.Element => {
  return (
    <div className={`${styles.flexCenter} z-[200] fixed top-0 left-0 inset-0`}>
      <img className="w-[200px] h-auto -mt-[200px]" src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
