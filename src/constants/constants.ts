import { ISocials } from "../interfaces";
import { iconFacebook, iconInstagram, iconTwitter } from "../assets/icons";

export const BASE_API_URL: string = "https://api.escuelajs.co/api/v1/";

export const PAGINATION_LIMIT: number = 9;

export const CART_LOCALSTORAGE = "$c@rt";

export const TOKEN_LOCALSTORAGE = "a@t#k$n";

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

export const countries: string[] = ["Uzbekistan", "Kazakhstan", "Tajikistan", "Turkey", "China", "Korea"];
