import { FC, useContext } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
const User: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { setAuth } = useContext(Context);

  const handleLogoutClick = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("a@t#k$n");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default User;
