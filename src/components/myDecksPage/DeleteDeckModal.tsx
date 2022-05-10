import { Fragment } from "react";
import ReactDOM from "react-dom";

import "../../styles/reusables.css";

type Props = {
  deleteDeck: () => Promise<void>;
  closeModal: () => void;
};

const DeleteDeckModal = ({ deleteDeck, closeModal }: Props) => {
  const portal = document.querySelector("#portal");

  if (!portal) return null;

  return ReactDOM.createPortal(
    <Fragment>
      <div className="overlay" onClick={closeModal} />
      <div className="modal modal--delete">
        <span>Are you sure you want to delete this deck?</span>
        <button
          onClick={() => {
            deleteDeck();
            closeModal();
          }}
          type="button"
          className="delete modal__btn--delete"
        >
          Delete
        </button>
      </div>
    </Fragment>,
    portal
  );
};

export default DeleteDeckModal;
