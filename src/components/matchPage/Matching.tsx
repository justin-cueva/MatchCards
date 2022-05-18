import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { StateType } from "../../reducers/matchingGameReducer";
import { Actions } from "../../reducers/matchingGameReducer";
import "../../styles/matchPage/matching.css";

type Props = {
  matchingGameDispatch: React.Dispatch<Actions>;
  matchingGameState: StateType;
};

const Matching = ({ matchingGameDispatch, matchingGameState }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { firstClickedCard, secondClickedCard } = matchingGameState;
    if (
      firstClickedCard?.number !== secondClickedCard?.number &&
      firstClickedCard &&
      secondClickedCard
    ) {
      setTimeout(() => {
        matchingGameDispatch({ type: "WRONG" });
      }, 1500);
    }
  }, [matchingGameState.firstClickedCard, matchingGameState.secondClickedCard]);

  useEffect(() => {
    if (
      matchingGameState.firstClickedCard?.number ===
        matchingGameState.secondClickedCard?.number &&
      matchingGameState.secondClickedCard &&
      matchingGameState.firstClickedCard
    ) {
      matchingGameDispatch({
        type: "SUCCESS",
        payload: matchingGameState?.firstClickedCard?.number,
      });
    }
  }, [matchingGameState.secondClickedCard]);

  useEffect(() => {
    const timer = setTimeout(() => {
      matchingGameDispatch({ type: "ADD_TIME" });
    }, 100);
    return () => clearTimeout(timer);
  }, [matchingGameState.stopwatch]);

  return (
    <div className="page--matching">
      <div className="matching__header">
        <span className="icon--arrow-left" onClick={() => navigate("/myDecks")}>
          <AiOutlineArrowLeft />
        </span>
      </div>
      <div className="matching__stats">
        <div className="field">
          <label>TIME</label>
          <span className="col-primary">
            {matchingGameState.stopwatch.toFixed(1)}
          </span>
        </div>
        <div className="field">
          <label>BEST TIME</label>
          <span>50.2</span>
        </div>
      </div>
      <div className="matching__cards">
        {matchingGameState.cardSides.map((side, index) => {
          const bothCardsAreSelected =
            matchingGameState.secondClickedCard &&
            matchingGameState.secondClickedCard
              ? true
              : false;
          const clickedStyle =
            side.number === matchingGameState.firstClickedCard?.number &&
            side.type === matchingGameState.firstClickedCard?.type
              ? "clicked"
              : "";

          const secondClickedStyle =
            side.number === matchingGameState.secondClickedCard?.number &&
            side.type === matchingGameState.secondClickedCard?.type
              ? "clicked"
              : "";

          const guessedWrong =
            matchingGameState.firstClickedCard?.number !==
            matchingGameState.secondClickedCard?.number
              ? true
              : false;

          const wrongMatchClass =
            bothCardsAreSelected &&
            guessedWrong &&
            side.number === matchingGameState.firstClickedCard?.number &&
            side.type === matchingGameState.firstClickedCard?.type
              ? "wrong"
              : "";

          const wrongMatchClass2 =
            bothCardsAreSelected &&
            guessedWrong &&
            side.number === matchingGameState.secondClickedCard?.number &&
            side.type === matchingGameState.secondClickedCard?.type
              ? "wrong"
              : "";

          return (
            <div
              key={index}
              className={`matching__card ${wrongMatchClass2} ${wrongMatchClass}  ${clickedStyle} ${secondClickedStyle}`}
              onClick={() => {
                const clickedSameCart =
                  matchingGameState.firstClickedCard?.number === side.number &&
                  matchingGameState.firstClickedCard?.type === side.type;

                matchingGameDispatch({
                  type: "FIRST_CARD",
                  payload: { number: side.number, type: side.type },
                });

                if (matchingGameState.firstClickedCard && !clickedSameCart) {
                  matchingGameDispatch({
                    type: "SECOND_CARD",
                    payload: { number: side.number, type: side.type },
                  });
                }
              }}
            >
              {side.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matching;
