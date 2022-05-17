import { useEffect, useState, Fragment, useReducer, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../App";
import { Deck } from "../../reducers/authReducer";
import {
  matchingGameReducer,
  defaultState as matchingGameDefaultState,
} from "../../reducers/matchingGameReducer";

import PreGame from "./PreGame";
import Matching from "./Matching";

const MatchPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const authContext = useContext(AuthContext);
  const [matchingGameState, matchingGameDispatch] = useReducer(
    matchingGameReducer,
    matchingGameDefaultState
  );

  useEffect(() => {
    // if the deck from the url does not exist then navigate to my decks
    const deck = authContext.authState.myDecks.find((deck: Deck) => {
      return deck.key === params.myDecksId;
    });

    if (!deck) navigate("/myDecks");

    matchingGameDispatch({
      type: "GET_DECK",
      payload: deck,
    });
  }, []);

  useEffect(() => {
    console.log(matchingGameState);
    if (matchingGameState.deck)
      matchingGameDispatch({
        type: "SORT_CARD_SIDES",
        payload: matchingGameState.deck?.cards,
      });
  }, [matchingGameState.deck]);

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
        <Matching
          matchingGameState={matchingGameState}
          matchingGameDispatch={matchingGameDispatch}
        />
      )}
      {matchingGameState.gameStatus === "SUMMARY" && <div>Summary</div>}
    </Fragment>
  );
};

export default MatchPage;
