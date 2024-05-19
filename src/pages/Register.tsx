import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { IAuthUser, IAxiosResponse, ICustomInput } from "../interfaces";
import errorToString from "../helpers/errorToString";
import { styles } from "../constants/styles";
import AuthService from "../service/auth";
import { spinner } from "../assets";

import { CustomInput, Modal } from "../components";

const Register: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(false);

  const inputs: ICustomInput[] = [
    { type: "text", placeholder: "Full Name", styles: "", value: name, setValue: setName },
    { type: "email", placeholder: "Email", styles: "", value: email, setValue: setEmail },
    { type: "password", placeholder: "Password", styles: "mb-3", value: password, setValue: setPassword },
  ];

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return setErr("Type your email");
    if (!password.trim()) return setErr("Type your password");
    if (password.trim().length < 4) return setErr("Password must be least 4 characters long");

    setIsLoading(true);
    const user: IAuthUser = { name, email, password, avatar: "https://picsum.photos/200" };
    try {
      const check = await AuthService.userAvailable(email);

      if (check?.isAvailable) throw new Error("Email already exist");
      await AuthService.userRegister(user);
      setIsOpen(true);
    } catch (err) {
      const error = err as IAxiosResponse;
      setErr(errorToString(error?.response?.data));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce | Register</title>
      </Helmet>
      <section className="h-screen flex items-center justify-center">
        <div className={`${styles.container} max-w-[800px] py-4 md:py-6`}>
          <h2 className="text-center text-[26px] md:text-[36px] font-bold mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            {inputs.map(input => (
              <CustomInput {...input} key={input.placeholder} />
            ))}

            <button
              className={`${styles.flexCenter} ${styles.focus} text-white font-medium rounded-lg text-sm px-7 py-3 text-center mb-3 bg-blue-600 hover:bg-blue-700 w-full`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <span>Loading...</span> : <span>Register</span>}
              {isLoading && <img className="ml-[6px]" src={spinner} />}
            </button>
            {err && <p className="text-[15px] md:text-[18px] mb-1 font-semibold text-red-600">{err}.</p>}
            <p className="text-[15px] md:text-[18px] font-semibold">
              Already Registered?{" "}
              <Link className="text-blue-600" to="/login">
                Login
              </Link>
            </p>
          </form>
          <Modal handleClose={handleClose} type="notification" isOpen={isOpen}>
            <div className="text-center">
              <p className="text-green-600 mb-3 font-medium text-sm xs:text-md md:text-lg">You have successfully registered. Please log in to proceed.</p>
              <button className={`${styles.buttonGreen} mx-auto`} onClick={() => navigate("/")}>
                Login
              </button>
            </div>
          </Modal>
        </div>
      </section>
    </main>
  );
};

export default Register;
