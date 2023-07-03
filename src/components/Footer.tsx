import { FC } from "react";
import { styles } from "../constants/styles";
import { socials } from "../constants/constants";
import { Link } from "react-router-dom";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className={`bg-dark ${styles.py}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.flexBetween} mb-[14px] md:text-[28px] flex-col md:flex-row gap-[10px] md:gap-[13px]`}>
          <Link to="/">
            <img className="max-w-[150px] md:max-w-[200px] w-full" src="/logo.svg" alt="logo" />
          </Link>
          <ul className="flex flex-wrap justify-center gap-4 text-sm lg:justify-end">
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
        <div className="flex items-center justify-between flex-col lg:flex-row mb-[6px] md:mb-[10px]">
          <p
            className={`${styles.paragraph} opacity-50 md:text-center lg:text-left mb-[10px] max-w-none sm:msx-w-[700px] md:max-w-[800px]`}
          >
            Our team at MyCommerce ensures a complete and rewarding personal shopping experience, addressing all your needs. With our open
            availability seven days a week, you can enjoy the full range of features and benefits we offer.
          </p>

          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            {socials.map(social => (
              <Link className="flex items-center" to={social.link} key={social.link}>
                <img className="w-[18px] md:w-[22px] h-auto" src={social.icon} alt="icon" />
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
