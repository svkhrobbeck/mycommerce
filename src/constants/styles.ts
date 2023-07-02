import { IStyles } from "../interfaces";

export const styles: IStyles = {
  flexBetween: "flex justify-between items-center",
  flexStart: "flex justify-start items-center",
  flexEnd: "flex justify-end items-center",
  flexCenter: "flex justify-center items-center",
  container: "max-w-[1440px] w-full mx-auto px-[20px]",
  flexCol: "flex flex-col",
  paragraph: "text-white text-[15px] font-regular leading-[1.5] md:font-medium",
  py: "py-4 md:py-6",
  buttonPurpleOutlined:
    "inline-block rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm text-white hover:bg-transparent hover:text-indigo-600 focus:ring transition-all duration-300",
  buttonPurple:
    "inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring mx-auto",
  buttonYellow: "block w-full mb-2 rounded bg-yellow-400 p-3 text-sm font-medium transition",
  badgeYellow: "whitespace-nowrap mb-3 inline-block bg-yellow-400 px-[12px] py-[6px] text-xs font-medium",
};
