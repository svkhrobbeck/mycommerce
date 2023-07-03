import { styles } from "../constants/styles";
import { ChangeEvent, useContext, useState } from "react";
import { IAuth, IAuthUser, IAxiosResponse, ICustomInput } from "../interfaces";
import AuthService from "../service/auth";
import { Context } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import errorToString from "../helpers/errorToString";
import { CustomInput } from "../components";
import { spinner } from "../assets/icons";

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAuth } = useContext(Context);

  const inputs: ICustomInput[] = [
    { type: "text", placeholder: "Email", styles: "", value: email, setValue: setEmail },
    { type: "password", placeholder: "Password", styles: "mb-3", value: password, setValue: setPassword },
  ];

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const user: IAuthUser = { email, password };
    try {
      const { access_token }: { access_token: string } = await AuthService.userLogin(user);

      setAuth((p: IAuth) => ({ ...p, token: access_token }));
      localStorage.setItem("a@t#k$n", access_token);
      navigate("/");
    } catch (err) {
      const error = err as IAxiosResponse;
      setErr(errorToString(error?.response?.data));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container} max-w-[800px] py-4 md:py-6`}>
      <h2 className="text-center text-[26px] md:text-[36px] font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        {inputs.map(input => (
          <CustomInput {...input} key={input.placeholder} />
        ))}

        <button
          className={`${styles.flexCenter} text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-3 mb-3 text-center bg-blue-600 hover:bg-blue-700 w-full`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <span>Loading...</span> : <span>Login</span>}
          {isLoading && <img className="ml-[6px]" src={spinner} />}
        </button>
        {err && <p className="text-[15px] md:text-[18px] mb-1 font-semibold text-red-600">{err}.</p>}
        <p className="text-[15px] md:text-[18px] font-semibold">
          Not Registered?{" "}
          <Link className="text-blue-600" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
