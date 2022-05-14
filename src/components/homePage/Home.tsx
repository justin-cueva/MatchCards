import { useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DefaultStateType as AuthType } from "../../reducers/authReducer";

type Props = {
  authState: AuthType;
};

const Home = ({ authState }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/" && !authState.isLoggedIn) navigate("/auth");
    if (pathname === "/" && authState.isLoggedIn) navigate("/create");
  }, []);

  return <Fragment></Fragment>;
};

export default Home;
