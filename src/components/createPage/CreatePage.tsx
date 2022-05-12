import { useReducer, useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SingleCard from "./SingleCard";
import AddCardBtn from "./AddCardBtn";
import { AuthContext as Context } from "../App";
import {
  configDeckReducer,
  newDeckInitState,
} from "../../reducers/newDeckReducer";
import "../../styles/create.css";

const CreatePage = () => {
  const { myDecksId } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(Context);
  const [configDeckState, configDeckDispatch] = useReducer(
    configDeckReducer,
    newDeckInitState
  );
  const [formMode, setFormMode] = useState<string>("CREATE");

  useEffect(() => {
    console.log(configDeckState);
  }, [configDeckState]);

  // useEffect(() => {
  //   if (formMode === "CREATE") {
  //     const timeElapsed = Date.now();
  //     const today = new Date(timeElapsed);
  //     configDeckDispatch({ type: "ADD_CREATION_DATE", payload: today });
  //   }
  // }, [formMode]);

  useEffect(() => {
    if (myDecksId) {
      setFormMode("EDIT");
      const deck = authState.myDecks.find((deck: any) => {
        return deck.key === myDecksId;
      });
      configDeckDispatch({ type: "EDIT_DECK", payload: { deck } });
      // trying to EDIT a deck
      // configDispatch({type: "EDIT_DECK", payload: {deckId: myDecksId}})
    }
    if (!myDecksId) {
      setFormMode("CREATE");
      configDeckDispatch({ type: "CREATE_DECK" });
      // dispatch action to clear all inputs
      // trying to CREATE a deck
      // do nothing because just bc
    }
  }, [myDecksId]);

  const [error, setError] = useState<null | string>(null);

  const numberOfCards = configDeckState.cards.length;

  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      let endPoint: string = "";
      let method: string = "GET";

      if (formMode === "CREATE") {
        endPoint = `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${authState.userId}.json`;
        method = "POST";
      }
      if (formMode === "EDIT") {
        endPoint = `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${authState.userId}/${myDecksId}.json`;
        method = "PUT";
      }

      if (!authState.isLoggedIn)
        throw new Error("Log in or create an account to build a deck");

      if (configDeckState.title === "")
        throw new Error("Give your deck a title");

      const notFinished = configDeckState.cards.some((card) => {
        if (card.term === "" || card.definition === "") return true;
      });
      if (notFinished)
        throw new Error("Add a term and definition to all your cards");

      // console.log(configDeckState);

      await fetch(endPoint, {
        method: method,
        body: JSON.stringify(configDeckState),
      });
      console.log(configDeckState);
      configDeckDispatch({ type: "CREATE_DECK" });
      navigate("/myDecks");
    } catch (err: any) {
      console.error(err);
      setError(`${err.message}`);
    }
  };

  return (
    <form onSubmit={(e) => createHandler(e)} className="page">
      <div className="flex justify-between items-center mb-3">
        <h2 className="config-form-heading">
          {formMode === "CREATE" ? "Create a new deck" : "Edit your deck"}
        </h2>
        <button className="btn-create--top btn--create">
          {formMode === "CREATE" ? "Create" : "Save"}
        </button>
      </div>
      <input
        value={configDeckState.title}
        onChange={(e) =>
          configDeckDispatch({ type: "CHANGE_TITLE", payload: e.target.value })
        }
        placeholder={`Enter a title, like "Biology"`}
        className="create__title"
      />
      {error && <p className="error--new-deck">{error}</p>}
      {configDeckState.cards.map((card, index) => {
        return (
          <SingleCard
            numberOfCards={numberOfCards}
            key={index}
            card={card}
            index={index}
            dispatch={configDeckDispatch}
          />
        );
      })}
      {numberOfCards < 10 && <AddCardBtn dispatch={configDeckDispatch} />}
      <button className="btn-create--bottom  btn--create">
        {formMode === "CREATE" ? "Create" : "Save"}
      </button>
    </form>
  );
};

export default CreatePage;
