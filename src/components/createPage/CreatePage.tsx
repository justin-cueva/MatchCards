import { useReducer, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import SingleCard from "./SingleCard";
import AddCardBtn from "./AddCardBtn";
import { AuthContext as Context } from "../App";
import {
  newDeckReducer,
  newDeckInitState,
} from "../../reducers/newDeckReducer";
import "../../styles/create.css";

const CreatePage = () => {
  const navigate = useNavigate();
  const { authState } = useContext(Context);
  const [newDeckState, dispatch] = useReducer(newDeckReducer, newDeckInitState);

  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // if we dont have the inputs filled out then throw an error
      // if we are not logged in then thow an error
      if (!authState.isLoggedIn)
        throw new Error("Log in or create an account to build a deck");

      // if ()
      console.log(newDeckState);
      await fetch(
        `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${authState.userId}.json`,
        { method: "POST", body: JSON.stringify(newDeckState) }
      );
      dispatch({ type: "CREATE_DECK" });
      navigate("/myDecks");
    } catch (err) {
      console.error(err);
    }
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
