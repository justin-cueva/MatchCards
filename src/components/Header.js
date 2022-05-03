import { GiHamburgerMenu } from "react-icons/gi";

import "../styles/header.css";

const Header = () => {
  return (
    <nav className="header">
      <span className="icon--burger">
        <GiHamburgerMenu />
      </span>
      <button className="btn--auth">Log out</button>
    </nav>
  );
};

export default Header;
