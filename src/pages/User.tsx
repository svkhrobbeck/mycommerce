import { FC, useContext, useState, ChangeEvent } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { styles } from "../constants/styles";
import { CustomInput } from "../components";
import { IAxiosResponse, ICustomInput } from "../interfaces";
import AuthService from "../service/auth";
import errorToString from "../helpers/errorToString";
import { TOKEN_LOCALSTORAGE } from "../constants/constants";
import { removeStorage } from "../helpers/localStorage";
import { Helmet } from "react-helmet";

const User: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(Context);
  const [email, setEmail] = useState<string>(auth?.user?.email || "");
  const [password, setPassword] = useState<string>(auth?.user?.password || "");
  const [name, setName] = useState<string>(auth?.user?.name || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  const inputs: ICustomInput[] = [
    { type: "text", placeholder: "New Name", styles: "", value: name, setValue: setName },
    { type: "email", placeholder: "New Email", styles: "", value: email, setValue: setEmail },
    { type: "password", placeholder: "New Password", styles: "mb-4", value: password, setValue: setPassword },
  ];

  const handleLogoutClick = () => {
    removeStorage(TOKEN_LOCALSTORAGE);
    setAuth({});
    navigate("/login");
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return setErr("Type your email");
    if (!password.trim()) return setErr("Type your password");
    if (password.trim().length < 4) return setErr("Password must be least 4 characters long");
    setIsLoading(true);
    setErr(null);
    try {
      const data = { name, email, password };
      const user = await AuthService.userUpdate(auth?.user?.id as number, data);
      setAuth(prev => ({ ...prev, user }));
      navigate("/");
    } catch (err) {
      const error = err as IAxiosResponse;
      setErr(errorToString(error?.response?.data));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles.py}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce | User Settings</title>
      </Helmet>
      <h2 className="text-4xl font-semibold text-center mb-4 uppercase">Update Profile</h2>
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-700 bg-gray-800 p-4">
        <div className="mb-4 flex w-full items-center gap-4 flex-wrap">
          <img className="w-[80px] rounded-full" alt="Developer" src={auth?.user?.avatar} />
          <div>
            <h3 className="text-xl font-medium text-white capitalize mb-1">Name: {auth?.user?.name}</h3>
            <p className="leading-none text-md font-medium text-gray-300 mb-2">Email: {auth?.user?.email}</p>
            <p className="leading-none text-md font-medium text-gray-300">Password: {auth?.user?.password}</p>
          </div>
          <button
            className={`${styles.buttonGreen} ${styles.focus} ml-auto self-center flex-grow-[1] xs:flex-grow-0`}
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
        <div className="space-y-2">
          {inputs.map(input => (
            <CustomInput key={input.placeholder} {...input} />
          ))}
          <div className={`${styles.flexEnd} flex-col xs:flex-row gap-3`}>
            <button
              className={`${styles.buttonLightGray} ${styles.focus} w-full xs:w-auto flex-grow-[1] sm:flex-grow-0`}
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              className={`${styles.buttonPurpleOutlined} ${styles.focus} w-full xs:w-auto flex-grow-[1] sm:flex-grow-0`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
          {err && <p className="text-[15px] md:text-[16px] mb-1 font-semibold text-red-600">{err}.</p>}
        </div>
      </form>
    </div>
  );
};

export default User;
