import { useReducer, useEffect } from "react";

import SingleCard from "./SingleCard";
import AddCardBtn from "./AddCardBtn";
import {
  newDeckReducer,
  newDeckInitState,
} from "../../reducers/newDeckReducer";
import "../../styles/create.css";

const CreatePage = () => {
  const [newDeckState, dispatch] = useReducer(newDeckReducer, newDeckInitState);

  const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
  };

  return (
    <form onSubmit={(e) => createHandler(e)} className="create-page">
      <div className="flex justify-between items-center mb-3">
        <h2>Create a new deck</h2>
        <button className="btn-create--top btn--create">Create</button>
      </div>
      <input
        onChange={(e) =>
          dispatch({ type: "CHANGE_TITLE", payload: e.target.value })
        }
        placeholder={`Enter a title, like "Biology"`}
        className="create__title"
      />
      {newDeckState.cards.map((card, index) => {
        return (
          <SingleCard
            key={index}
            card={card}
            index={index}
            dispatch={dispatch}
          />
        );
      })}
      <AddCardBtn dispatch={dispatch} />
      <button className="btn-create--bottom  btn--create">Create</button>
    </form>
  );
};

export default CreatePage;
