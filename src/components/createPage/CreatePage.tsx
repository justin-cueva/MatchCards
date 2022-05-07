import { useReducer, useEffect, useContext, useState } from "react";
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
  const [error, setError] = useState<null | string>(null);

  const numberOfCards = newDeckState.cards.length;

  useEffect(() => {
    console.log(numberOfCards);
    console.log(numberOfCards < 10);
  }, [numberOfCards]);

  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (!authState.isLoggedIn)
        throw new Error("Log in or create an account to build a deck");

      if (newDeckState.title === "") throw new Error("Give your deck a title");

      const notFinished = newDeckState.cards.some((card) => {
        if (card.term === "" || card.definition === "") return true;
      });
      if (notFinished)
        throw new Error("Add a term and definition to all your cards");

      console.log(newDeckState);
      await fetch(
        `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${authState.userId}.json`,
        { method: "POST", body: JSON.stringify(newDeckState) }
      );
      dispatch({ type: "CREATE_DECK" });
      navigate("/myDecks");
    } catch (err: any) {
      console.error(err);
      setError(`${err.message}`);
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
      {error && <p className="error--new-deck">{error}</p>}
      {newDeckState.cards.map((card, index) => {
        return (
          <SingleCard
            numberOfCards={numberOfCards}
            key={index}
            card={card}
            index={index}
            dispatch={dispatch}
          />
        );
      })}
      {numberOfCards < 10 && <AddCardBtn dispatch={dispatch} />}
      <button className="btn-create--bottom  btn--create">Create</button>
    </form>
  );
};

export default CreatePage;
