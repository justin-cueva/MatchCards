import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../App";
import "../../styles/reusables.css";

const DeleteDeckModal = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { myDecksId } = useParams();
  const navigate = useNavigate();
  const portal = document.querySelector("#portal");

  const deleteDeck = async (key: string | undefined) => {
    authDispatch({
      type: "DELETE_DECK",
      payload: { deckId: key },
    });
    navigate("/myDecks");
    await fetch(
      `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${authState.userId}/${key}.json`,
      { method: "DELETE" }
    );
  };

  if (!portal) return null;

  return ReactDOM.createPortal(
    <Fragment>
      <div className="overlay" onClick={() => navigate("/myDecks")} />
      <div className="modal modal--delete">
        <span>Are you sure you want to delete this deck?</span>
        <button
          onClick={() => deleteDeck(myDecksId)}
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
