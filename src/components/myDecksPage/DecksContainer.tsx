import { useEffect } from "react";

import { Deck } from "../../reducers/authReducer";
import "../../styles/myDecksContainer.css";

type Props = {
  decks: Deck[];
};

const DecksContainer = ({ decks }: Props) => {
  useEffect(() => {
    console.log(decks);
  }, []);

  return (
    <div className="container--my-decks">
      {decks &&
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
