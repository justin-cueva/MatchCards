import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { MdDragHandle } from "react-icons/md";

import { Card } from "../../reducers/newDeckReducer";
import { ActionTypes } from "../../reducers/newDeckReducer";

type Props = {
  card: Card;
  index: number;
  dispatch: React.Dispatch<ActionTypes>;
};

const SingleCard = ({ card, index, dispatch }: Props) => {
  return (
    <div key={index} className="card">
      <div className="toolbar">
        <label className="card-number">{card.number}</label>
        <div className="card-icons">
          <span className="icon icon--drag-handle">
            <MdDragHandle />
          </span>
          <span
            className="icon icon--trash"
            onClick={() =>
              dispatch({ type: "DELETE_CARD", payload: card.number })
            }
          >
            <BsFillTrashFill />
          </span>
        </div>
      </div>
      <div className="fields">
        <div className="field">
          {/* on change, change the state */}
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_TERM",
                payload: {
                  term: e.target.value,
                  cardNumber: card.number,
                },
              })
            }
            value={card.term}
            className="card__input"
          />
          <label className="card__label">TERM</label>
        </div>
        <div className="field">
          <input
            onChange={(e) =>
              dispatch({
                type: "CHANGE_DEFINITION",
                payload: {
                  definition: e.target.value,
                  cardNumber: card.number,
                },
              })
            }
            value={card.definition}
            className="card__input"
          />
          <label className="card__label">DEFINITION</label>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
