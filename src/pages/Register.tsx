import { styles } from "../constants/styles";
import { ChangeEvent, useState } from "react";
import { IAuthUser, IAxiosResponse, ICustomInput } from "../interfaces";
import AuthService from "../service/auth";
import errorToString from "../helpers/errorToString";
import { Link } from "react-router-dom";
import { CustomInput } from "../components";

const Register: React.FC = (): JSX.Element => {
  const [err, setErr] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputs: ICustomInput[] = [
    { type: "text", placeholder: "Full Name", styles: "", value: name, setValue: setName },
    { type: "text", placeholder: "Email", styles: "", value: email, setValue: setEmail },
    { type: "text", placeholder: "Password", styles: "", value: password, setValue: setPassword },
  ];

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: IAuthUser = { name, email, password, avatar: "https://picsum.photos/200" };
    try {
      const check = await AuthService.userAvailable(email);

      if (check?.isAvailable) throw new Error("Email already exist");
      const data = await AuthService.userRegister(user);
      console.log(data);
    } catch (err) {
      const error = err as IAxiosResponse;
      setErr(errorToString(error?.response?.data));
    }
  };

  return (
    <div className={`${styles.container} max-w-[800px] py-4 md:py-6`}>
      <h2 className="text-center text-[26px] md:text-[36px] font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit}>
        {inputs.map(input => (
          <CustomInput {...input} key={input.placeholder} />
        ))}

        <button
          className="text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-3 text-center mb-3 bg-blue-600 hover:bg-blue-700 w-full"
          type="submit"
        >
          Register
        </button>
        {err && <p className="text-[15px] md:text-[18px] mb-1 font-semibold text-red-600">{err}</p>}
        <p className="text-[15px] md:text-[18px] font-semibold">
          Already Registered?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
