import { Fragment } from "react";
import { createPortal } from "react-dom";

type Props = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuModal = ({ setMenuIsOpen }: Props) => {
  const portal = document.querySelector("#portal");
  if (!portal) return null;

  return createPortal(
    <Fragment>
      <div
        onClick={() => setMenuIsOpen(false)}
        className="overlay overlay--menu-modal"
      ></div>
      <div>MenuModal</div>
    </Fragment>,
    portal
  );
};

export default MenuModal;
