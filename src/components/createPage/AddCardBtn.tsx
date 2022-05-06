import React from "react";
import { HiPlus } from "react-icons/hi";

import { ActionTypes } from "../../reducers/newDeckReducer";

type Props = {
  dispatch: React.Dispatch<ActionTypes>;
};

const AddCardBtn = ({ dispatch }: Props) => {
  return (
    <button type="button" className="add-card">
      <span
        className="border-bottom"
        onClick={() => dispatch({ type: "ADD_CARD" })}
      >
        <span className="icon icon--add">
          <HiPlus />
        </span>
        ADD CARD
      </span>
    </button>
  );
};

export default AddCardBtn;
