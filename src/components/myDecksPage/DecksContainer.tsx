import { useEffect } from "react";
import ReactLoading from "react-loading";

import Message from "../reusables/Message";
import { Deck } from "../../reducers/authReducer";
import "../../styles/myDeckPage/myDecksContainer.css";

type Props = {
  decks: Deck[];
  decksAreLoading: boolean;
};

const DecksContainer = ({ decks, decksAreLoading }: Props) => {
  useEffect(() => {
    console.log(decks);
  }, []);

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
        decks.map(({ cards, title }, index) => {
          return (
            <div key={index} className="container--decks-of-a-date">
              <label>
                <span>March 20 2022</span>
              </label>
              <div className="my-decks__deck">
                <span>{cards.length} terms</span>
                <h4>{title}</h4>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DecksContainer;
