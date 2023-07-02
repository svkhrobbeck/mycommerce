import { FC, ChangeEvent } from "react";
import { ICustomInput } from "../interfaces";

const CustomInput: FC<ICustomInput> = ({ type, placeholder, styles, value, setValue }): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value.toLowerCase());
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      aria-label={placeholder}
      name={placeholder}
      onChange={handleChange}
      className={`${styles} lowercase border text-sm rounded-lg outline-none  block w-full p-2 md:p-3 bg-gray-700  placeholder-gray-400 text-white text-[19px] [&:not(:last-child)]:mb-3`}
    />
  );
};

export default CustomInput;
