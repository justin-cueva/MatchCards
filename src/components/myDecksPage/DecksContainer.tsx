import { useEffect, useContext, useState, Fragment } from "react";
import ReactLoading from "react-loading";

import DeleteDeckModal from "./DeleteDeckModal";
import DeckActions from "./DeckActions";
import Message from "../reusables/Message";
import { AuthContext as Context } from "../App";
import { Deck } from "../../reducers/authReducer";
import "../../styles/myDeckPage/myDecksContainer.css";

type Props = {
  decks: Deck[];
  decksAreLoading: boolean;
  currentSort: string;
};

const DecksContainer = ({ decks, decksAreLoading, currentSort }: Props) => {
  const { authState, authDispatch } = useContext(Context);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [deckOrder, setDeckOrder] = useState<Deck[]>(decks);

  useEffect(() => {
    if (currentSort === "newest") {
      const newestSorted = decks
        .sort(function (a, b) {
          const aDay = Number(a.date?.split("-")[1]);
          const bDay = Number(b.date?.split("-")[1]);
          return aDay - bDay;
        })
        .sort((a, b) => {
          const aMonth = Number(a.date?.split("-")[0]);
          const bMonth = Number(b.date?.split("-")[0]);
          return aMonth - bMonth;
        })
        .sort((a, b) => {
          const aYear = Number(a.date?.split("-")[2]);
          const bYear = Number(b.date?.split("-")[2]);
          return aYear - bYear;
        });
      setDeckOrder(newestSorted);
    }
    if (currentSort === "oldest") {
      const oldestSorted = decks
        .sort(function (a, b) {
          const aDay = Number(a.date?.split("-")[1]);
          const bDay = Number(b.date?.split("-")[1]);
          return bDay - aDay;
        })
        .sort((a, b) => {
          const aMonth = Number(a.date?.split("-")[0]);
          const bMonth = Number(b.date?.split("-")[0]);
          return bMonth - aMonth;
        })
        .sort((a, b) => {
          const aYear = Number(a.date?.split("-")[2]);
          const bYear = Number(b.date?.split("-")[2]);
          return bYear - aYear;
        });
      setDeckOrder(oldestSorted);
    }
    if (currentSort === "most terms") {
      // console.log("sorting MOST");
      const mostSorted = decks.sort(function (a, b) {
        return a.cards.length - b.cards.length;
      });
      setDeckOrder(mostSorted);
    }
    if (currentSort === "least terms") {
      // console.log("sorting LEAST");
      const leastSorted = decks.sort(function (a, b) {
        return b.cards.length - a.cards.length;
      });
      setDeckOrder(leastSorted);
    }
  }, [currentSort]);

  // useEffect(() => {
  //   console.log(authState.myDecks);
  // }, [authState]);

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
        {decks.length === 0 && !decksAreLoading && (
          <Message text="You have no decks created" />
        )}
        {decksAreLoading && lComponent}
        {!decksAreLoading &&
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
