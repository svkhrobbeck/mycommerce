import { FC } from "react";
import { styles } from "../constants/styles";
import { Link } from "react-router-dom";
import { iconCart, iconUser } from "../assets/icons";
const Header: FC = (): JSX.Element => {
  return (
    <header className="w-full py-3 md:py-5 bg-dark">
      <div className={`${styles.container} ${styles.flexBetween}`}>
        <Link to="/">
          <img className="max-w-[200px]" src="/logo.svg" alt="logo" />
        </Link>

        <div className={`${styles.flexEnd} gap-5 flex-grow-[1] text-[18px]`}>
          <input className="bg-transparent text-white outline-none max-w-[300px] w-[100%]" type="text" placeholder="Search" />
          <Link to="/cart">
            <img src={iconCart} alt="icon cart" />
          </Link>
          <Link to="/user">
            <img src={iconUser} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
