import { FC } from "react";
import { styles } from "../constants/styles";
import { socials } from "../constants/constants";
import { Link } from "react-router-dom";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className="bg-dark py-4 md:py-6">
      <div className={`${styles.container}`}>
        <Link to="/">
          <img className="max-w-[200px] mb-[36px] w-full" src="/logo.svg" alt="logo" />
        </Link>
        <div className="flex items-end justify-between">
          <p className={`${styles.paragraph} opacity-50 mb-[16px] max-w-[540px]`}>
            Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are
            devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
          </p>
          <div className="flex items-center gap-4">
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
