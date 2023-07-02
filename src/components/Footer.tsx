import { FC } from "react";
import { styles } from "../constants/styles";
import { socials } from "../constants/constants";
import { Link } from "react-router-dom";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className="bg-dark py-4 md:py-6">
      <div className={`${styles.container}`}>
        <div className={`${styles.flexBetween} mb-[16px] md:text-[28px] flex-col md:flex-row gap-[10px] md:gap-[20px]`}>
          <Link to="/">
            <img className="max-w-[150px] md:max-w-[200px] w-full" src="/logo.svg" alt="logo" />
          </Link>
          <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            <li>
              <a href="#" className="text-gray-300 transition opacity-75 hover:opacity-100">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 transition opacity-75 hover:opacity-100">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 transition opacity-75 hover:opacity-100">
                Cookies
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-end justify-between flex-col md:flex-row mb-[15px] md:m-[20px]">
          <p className={`${styles.paragraph} opacity-50 mb-[16px] max-w-none md:max-w-[540px]`}>
            MyCommerce is an all-in-one solution designed to meet all your needs. Our dedicated team of professionals is committed to
            ensuring that you have a fulfilling and rewarding personal shopping experience. We invite you to visit our demo facility, which
            is open seven days a week, to explore the full range of features and benefits our solution offers.
          </p>

          <div className="flex items-center gap-4 w-full md:w-auto flex-row md:flex-col lg:flex-row">
            {socials.map(social => (
              <Link className="flex items-center" to={social.link} key={social.link}>
                <img className="w-[24px] h-auto" src={social.icon} alt="icon" />
              </Link>
            ))}
          </div>
        </div>
        <p className={`${styles.paragraph} opacity-50`}>Copyright 2023. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
