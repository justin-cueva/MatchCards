import { Fragment, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import MenuModal from "./MenuModal";
import "../styles/header.css";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  useEffect(() => console.log(menuIsOpen), [menuIsOpen]);

  return (
    <Fragment>
      {menuIsOpen && <MenuModal setMenuIsOpen={setMenuIsOpen} />}
      <nav className="header">
        <span className="icon--burger" onClick={() => setMenuIsOpen(true)}>
          <GiHamburgerMenu />
        </span>
        <button className="btn--auth">Log out</button>
      </nav>
    </Fragment>
  );
};

export default Header;
