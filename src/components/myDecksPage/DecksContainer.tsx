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
  searchStr: string;
};

const DecksContainer = (props: Props) => {
  const { authState, authDispatch } = useContext(Context);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [deckOrder, setDeckOrder] = useState<Deck[]>(props.decks);

  useEffect(() => {
    if (props.currentSort === "oldest") {
      const newestSorted = props.decks
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
    if (props.currentSort === "newest") {
      const oldestSorted = props.decks
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
    if (props.currentSort === "least terms") {
      // console.log("sorting MOST");
      const mostSorted = props.decks.sort(function (a, b) {
        return a.cards.length - b.cards.length;
      });
      setDeckOrder(mostSorted);
    }
    if (props.currentSort === "most terms") {
      // console.log("sorting LEAST");
      const leastSorted = props.decks.sort(function (a, b) {
        return b.cards.length - a.cards.length;
      });
      setDeckOrder(leastSorted);
    }

    setDeckOrder(() => {
      return props.decks.filter((deck) => {
        return deck.title.toLowerCase().includes(props.searchStr.toLowerCase());
      });
    });
  }, [props.currentSort, props.decks, props.searchStr]);

  // useEffect(() => {
  //   console.log(props.searchStr);
  //   setDeckOrder(() => {
  //     return props.decks.filter((deck) => {
  //       return deck.title.toLowerCase().includes(props.searchStr.toLowerCase());
  //     });
  //   });
  // }, [props.searchStr, props.currentSort, props.decks]);

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
