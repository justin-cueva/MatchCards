import { Fragment } from "react";
import { createPortal } from "react-dom";
import { ImCross } from "react-icons/im";

import "../styles/menuModal.css";

type Props = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuIsOpen: boolean;
};

const MenuModal = ({ setMenuIsOpen, menuIsOpen }: Props) => {
  const portal = document.querySelector("#portal");
  if (!portal) return null;

  return createPortal(
    <Fragment>
      <div
        onClick={() => setMenuIsOpen(false)}
        className="overlay overlay--menu-modal"
      />
      <span
        className="icon--close-menu-modal"
        onClick={() => setMenuIsOpen(false)}
      >
        <ImCross />
      </span>
      <ul className="modal modal--menu">
        <li className="menu-modal__link">Home</li>
        <li className="menu-modal__link">Create</li>
        <li className="menu-modal__link">My Decks</li>
        <li className="menu-modal__link">Auth</li>
      </ul>
    </Fragment>,
    portal
  );
};

export default MenuModal;
