import { IAuthUser } from "../interfaces";
import axios from "./axios";

const AuthService = {
  async userRegister(user: IAuthUser) {
    const { data } = await axios.post("users", { ...user });
    return data;
  },

  async userLogin(user: IAuthUser) {
    const { data } = await axios.post("auth/login", { ...user });
    return data;
  },

  async userAvailable(email: string) {
    const { data } = await axios.post("users/is-available", { email });
    return data;
  },

  async userGet() {
    const { data } = await axios.get("auth/profile");
    return data;
  },

  async userUpdate(id: number, user: IAuthUser) {
    const { data } = await axios.put(`users/${id}`, { ...user });
    return data;
  },
};

export default AuthService;
