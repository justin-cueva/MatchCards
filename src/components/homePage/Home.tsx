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
    const userId = localStorage.getItem("userId");

    console.log(userId?.length);

    if (pathname === "/" && !userId) navigate("/auth");
    if (pathname === "/" && userId) navigate("/create");
  }, []);

  return <Fragment></Fragment>;
};

export default Home;
