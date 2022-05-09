import { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { AuthContext as context } from "../App";
import MenuModal from "./MenuModal";
import { links } from "./MenuModal";
import "../../styles/reusables/header.css";

const Header = () => {
  const { pathname } = useLocation();
  const authContext = useContext(context);
  const navigate = useNavigate();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const visibility = pathname === "/auth" ? "invisible" : "";

  return (
    <Fragment>
      {menuIsOpen && (
        <MenuModal setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />
      )}
      <nav className="header">
        <span
          className={`icon icon--burger ${menuIsOpen && "opacity-0"}`}
          onClick={() => setMenuIsOpen(true)}
        >
          <GiHamburgerMenu />
        </span>
        <ul className="link-list">
          {links.map((link, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  navigate(link.to);
                }}
              >
                {link.name}
              </li>
            );
          })}
        </ul>
        {authContext.authState.isLoggedIn && (
          <button
            className={`btn--auth ${visibility}`}
            onClick={() => {
              // console.log(authContext.authState);
              localStorage.removeItem("userId");
              authContext.authDispatch({ type: "LOGOUT" });
            }}
          >
            Log out
          </button>
        )}
        {!authContext.authState.isLoggedIn && (
          <button
            className={`btn--auth ${visibility}`}
            onClick={() => {
              navigate("/auth");
              // console.log(authContext.authState);
              // localStorage.removeItem("userId");
              // authContext.authDispatch({ type: "LOGOUT" });
            }}
          >
            Log in
          </button>
        )}
      </nav>
    </Fragment>
  );
};

export default Header;
