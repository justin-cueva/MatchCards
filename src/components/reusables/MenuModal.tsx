import { Fragment } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

import "../../styles/reusables/menuModal.css";

export const links = [
  { name: "Home", to: "/" },
  { name: "Create", to: "/create" },
  { name: "My Decks", to: "/myDecks" },
  { name: "Auth", to: "/auth" },
];

type Props = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuIsOpen: boolean;
};

const MenuModal = ({ setMenuIsOpen, menuIsOpen }: Props) => {
  const navigate = useNavigate();

  const portal = document.querySelector("#portal");
  if (!portal) return null;

  return createPortal(
    <Fragment>
      <div
        onClick={() => setMenuIsOpen(false)}
        className="overlay overlay--menu-modal"
      />
      <span
        className="icon icon--close-menu-modal"
        onClick={() => setMenuIsOpen(false)}
      >
        <ImCross />
      </span>
      <ul className="modal modal--menu">
        {links.map((link, index) => {
          return (
            <li
              key={index}
              className="menu-modal__link"
              onClick={() => {
                navigate(link.to);
                setMenuIsOpen(false);
              }}
            >
              {link.name}
            </li>
          );
        })}
      </ul>
    </Fragment>,
    portal
  );
};

export default MenuModal;
