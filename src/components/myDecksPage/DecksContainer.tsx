import { useEffect, useContext } from "react";
import ReactLoading from "react-loading";

import Message from "../reusables/Message";
import { AuthContext as Context } from "../App";
import { Deck } from "../../reducers/authReducer";
import "../../styles/myDeckPage/myDecksContainer.css";

type Props = {
  decks: Deck[];
  decksAreLoading: boolean;
};

const DecksContainer = ({ decks, decksAreLoading }: Props) => {
  const { authState, authDispatch } = useContext(Context);

  useEffect(() => {
    console.log(authState.myDecks);
  }, [authState]);

  const lComponent = (
    <ReactLoading
      className="self-center"
      color={"#ffba08"}
      type={"spin"}
      width={"10rem"}
      height={"10rem"}
    />
  );

  return (
    <div className="container--my-decks">
      {decks.length === 0 && !decksAreLoading && (
        <Message text="You have no decks created" />
      )}

      {decksAreLoading && lComponent}

      {!decksAreLoading &&
        decks.map(({ cards, title, key }, index) => {
          return (
            <div key={index} className="container--decks-of-a-date">
              <label>
                <span>March 20 2022</span>
              </label>
              <div className="my-decks__deck">
                <div>
                  <span>{cards.length} terms</span>
                  <h4>{title}</h4>
                </div>
                <div className="deck__actions">
                  <button
                    onClick={async () => {
                      console.log("loading");
                      await fetch(
                        `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${authState.userId}/${key}.json`,
                        { method: "DELETE" }
                      );
                      authDispatch({
                        type: "DELETE_DECK",
                        payload: { deckId: key },
                      });
                      console.log("trying to delete deck");
                      // remove the deck from state
                      // await deleting the deck from firebase
                      //
                    }}
                    type="button"
                    className="delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DecksContainer;
