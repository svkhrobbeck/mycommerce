import { FC } from "react";
import { styles } from "../constants/styles";
import { Link } from "react-router-dom";
import { iconCart, iconUser } from "../assets";
const Header: FC = (): JSX.Element => {
  return (
    <header className="w-full py-3 md:py-5 bg-dark sticky top-0 z-[100]">
      <div className={`${styles.container} ${styles.flexBetween}`}>
        <Link to="/">
          <img className="max-w-[150px] md:max-w-[200px]" src="/logo.svg" alt="logo" />
        </Link>

        <div className={`${styles.flexEnd} gap-5 flex-grow-[1] text-[18px]`}>
          <Link to="/cart">
            <img src={iconCart} alt="icon cart" />
          </Link>
          <Link to="/user">
            <img src={iconUser} alt="icon user" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
