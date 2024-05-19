import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";

import { IAuth, IAuthUser, IAxiosResponse, ICustomInput } from "../interfaces";
import errorToString from "../helpers/errorToString";
import { useMyContext } from "../context/Context";
import { styles } from "../constants/styles";
import AuthService from "../service/auth";
import { spinner } from "../assets";

import { CustomInput } from "../components";

const Login: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const { setAuth } = useMyContext();
  const navigate = useNavigate();

  const inputs: ICustomInput[] = [
    { type: "text", placeholder: "Email", styles: "", value: email, setValue: setEmail },
    { type: "password", placeholder: "Password", styles: "mb-3", value: password, setValue: setPassword },
  ];

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return setErr("Type your email");
    if (!password.trim()) return setErr("Type your password");
    if (password.trim().length < 4) return setErr("Password must be least 4 characters long");

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
    <main>
      <section className="h-screen flex items-center justify-center">
        <div className={`${styles.container} max-w-[800px] py-4 md:py-6`}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Ecommerce | Login</title>
          </Helmet>
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
      </section>
    </main>
  );
};

export default Login;
