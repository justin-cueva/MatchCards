import { useEffect, useState, Fragment, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../App";
import { Deck } from "../../reducers/authReducer";
import {
  matchingGameReducer,
  defaultState as matchingGameDefaultState,
} from "../../reducers/matchingGameReducer";

import PreGame from "./PreGame";
import Matching from "./Matching";

const MatchPage = () => {
  const params = useParams();
  const authContext = useContext(AuthContext);
  const [matchingGameState, matchingGameDispatch] = useReducer(
    matchingGameReducer,
    matchingGameDefaultState
  );

  useEffect(() => console.log(matchingGameState), [matchingGameState]);

  useEffect(() => {
    const deck = authContext.authState.myDecks.find((deck: Deck) => {
      return deck.key === params.myDecksId;
    });

    matchingGameDispatch({
      type: "GET_DECK",
      payload: deck,
    });
  }, []);

  useEffect(() => {
    return () => {
      matchingGameDispatch({ type: "CHANGE_GAME_STATUS", payload: "PREGAME" });
    };
  }, []);

  return (
    <Fragment>
      {matchingGameState.gameStatus === "PREGAME" && (
        <PreGame matchingGameDispatch={matchingGameDispatch} />
      )}
      {matchingGameState.gameStatus === "MATCHING" && (
        <Matching matchingGameDispatch={matchingGameDispatch} />
      )}
      {matchingGameState.gameStatus === "SUMMARY" && <div>Summary</div>}
    </Fragment>
  );
};

// hide the header

export default MatchPage;
