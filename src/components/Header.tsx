import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import MenuModal from "./MenuModal";
import { links } from "./MenuModal";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

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
        <button className="btn--auth">Log out</button>
      </nav>
    </Fragment>
  );
};

export default Header;
