import { useEffect, useState, Fragment, useReducer } from "react";

import {
  matchingGameReducer,
  defaultState as matchingGameDefaultState,
} from "../../reducers/matchingGameReducer";

import PreGame from "./PreGame";
import Matching from "./Matching";

const MatchPage = () => {
  const [matchingGameState, matchingGameDispatch] = useReducer(
    matchingGameReducer,
    matchingGameDefaultState
  );

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
