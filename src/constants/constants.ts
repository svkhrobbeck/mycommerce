import { ISocials } from "../interfaces";
import { iconFacebook, iconInstagram, iconTwitter } from "../assets/icons";

export const BASE_API_URL: string = "https://api.escuelajs.co/api/v1/";

export const socials: ISocials[] = [
  {
    icon: iconFacebook,
    link: "https://facebook.com",
  },
  {
    icon: iconTwitter,
    link: "https://twitter.com",
  },
  {
    icon: iconInstagram,
    link: "https://instagram.com",
  },
];
