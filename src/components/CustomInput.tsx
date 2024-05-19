import { FC, ChangeEvent, useState } from "react";

import { ICustomInput } from "../interfaces";
import { iconEye, iconEyeSlash } from "../assets";
import { styles as globalStyles } from "../constants/styles";

const CustomInput: FC<ICustomInput> = ({ type, placeholder, styles, value, setValue }): JSX.Element => {
  const [isShowing, setisShowing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value.toLowerCase());
  };

  return (
    <>
      {type === "password" ? (
        <div className={`${styles}  relative`}>
          <input
            className={`${globalStyles.customInput} ${globalStyles.focus}`}
            type={isShowing ? "text" : type}
            placeholder={placeholder}
            value={value}
            aria-label={placeholder}
            name={placeholder}
            onChange={handleChange}
          />
          <button className="flex absolute top-[50%] -translate-y-[50%] right-6" type="button" onClick={() => setisShowing(p => !p)}>
            <img className="w-4 h-4" src={isShowing ? iconEyeSlash : iconEye} alt="icon eye" />
          </button>
        </div>
      ) : (
        <input
          className={`${globalStyles.customInput} ${globalStyles.focus} [&:not(:last-child)]:mb-3`}
          type={type}
          placeholder={placeholder}
          value={value}
          aria-label={placeholder}
          name={placeholder}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default CustomInput;
