import { useContext, useState, Fragment } from "react";
import ReactLoading from "react-loading";

import DeleteDeckModal from "./DeleteDeckModal";
import DeckActions from "./DeckActions";
import Message from "../reusables/Message";
import useSortAndFilter from "./useSortAndFilter";
import { AuthContext as Context } from "../App";
import { Deck } from "../../reducers/authReducer";
import "../../styles/myDeckPage/myDecksContainer.css";

type Props = {
  decks: Deck[];
  decksAreLoading: boolean;
  currentSort: string;
  searchStr: string;
};

const DecksContainer = (props: Props) => {
  const { deckOrder } = useSortAndFilter(props);
  const { authState, authDispatch } = useContext(Context);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const lComponent = (
    <ReactLoading
      className="self-center"
      color={"#ffba08"}
      type={"spin"}
      width={"10rem"}
      height={"10rem"}
    />
  );

  const deleteDeck = async (key: string) => {
    authDispatch({
      type: "DELETE_DECK",
      payload: { deckId: key },
    });
    await fetch(
      `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${authState.userId}/${key}.json`,
      { method: "DELETE" }
    );
  };

  return (
    <Fragment>
      <div className="container--my-decks">
        {props.decks.length === 0 && !props.decksAreLoading && (
          <Message text="You have no decks created" />
        )}
        {props.decksAreLoading && lComponent}
        {!props.decksAreLoading &&
          deckOrder.map(({ cards, title, key, date }, index) => {
            return (
              <div key={index} className="container--decks-of-a-date">
                {deleteModalIsOpen && (
                  <DeleteDeckModal
                    closeModal={() => setDeleteModalIsOpen(false)}
                    deleteDeck={() => deleteDeck(key)}
                  />
                )}
                <label>
                  <span>{date ? date : "March 20 2022"}</span>
                </label>
                <div className="my-decks__deck">
                  <div>
                    <span>{cards.length} terms</span>
                    <h4>{title}</h4>
                  </div>
                  <DeckActions
                    setDeleteModalIsOpen={setDeleteModalIsOpen}
                    deckId={key}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default DecksContainer;
