import { FC, useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { styles } from "../constants/styles";
import { CustomInput } from "../components";
import { ICustomInput } from "../interfaces";
const User: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(Context);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const inputs: ICustomInput[] = [
    { type: "text", placeholder: "New Name", styles: "", value: name, setValue: setName },
    { type: "email", placeholder: "New Email", styles: "", value: email, setValue: setEmail },
    { type: "password", placeholder: "New Password", styles: "mb-4", value: password, setValue: setPassword },
  ];

  const handleLogoutClick = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("a@t#k$n");
    navigate("/login");
  };

  return (
    <div className={`${styles.container} ${styles.py}`}>
      <form className="rounded-xl border border-gray-700 bg-gray-800 p-4">
        <div className="mb-4 flex w-full items-center gap-4 flex-wrap">
          <img className="w-[80px] rounded-full" alt="Developer" src={auth?.user?.avatar} />
          <div>
            <h3 className="text-lg font-medium text-white capitalize">{auth?.user?.name}</h3>
            <p className="leading-none text-sm font-medium text-gray-300">{auth?.user?.role}</p>
          </div>
          <button className={`${styles.buttonGreen} ml-auto self-center flex-grow-[1] xs:flex-grow-0`} onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
        <div className="space-y-2">
          {inputs.map(input => (
            <CustomInput key={input.placeholder} {...input} />
          ))}
          <div className={`${styles.flexEnd} gap-3`}>
            <button className={`${styles.buttonLightGray} flex-grow-[1] sm:flex-grow-0`}>Save</button>
            <button className={`${styles.buttonPurpleOutlined} flex-grow-[1] sm:flex-grow-0`}>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default User;
