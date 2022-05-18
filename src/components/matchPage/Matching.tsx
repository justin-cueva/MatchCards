import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { myDecksId } = useParams();

  const putHighScore = async (time: number) => {
    const userId = localStorage.getItem("userId");
    await fetch(
      `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${userId}/${myDecksId}/highScore.json`,
      { method: "PUT", body: JSON.stringify(time.toFixed(1)) }
    );
  };

  useEffect(() => {
    if (
      matchingGameState.stopwatch < Number(matchingGameState.deck?.highScore) &&
      matchingGameState.cardSides.length === 0
    ) {
      putHighScore(matchingGameState.stopwatch);
    }
    if (matchingGameState.cardSides.length === 0) {
      matchingGameDispatch({ type: "FINISHED_GAME" });
      navigate("/myDecks");
    }
  }, [matchingGameState.cardSides]);

  useEffect(() => {
    const { firstClickedCard, secondClickedCard } = matchingGameState;
    if (
      firstClickedCard?.number !== secondClickedCard?.number &&
      firstClickedCard &&
      secondClickedCard
    ) {
      matchingGameDispatch({ type: "ADD_4_SECS" });
      setTimeout(() => {
        matchingGameDispatch({ type: "WRONG" });
      }, 1000);
    }
  }, [matchingGameState.firstClickedCard, matchingGameState.secondClickedCard]);

  useEffect(() => {
    if (
      matchingGameState.firstClickedCard?.number ===
        matchingGameState.secondClickedCard?.number &&
      matchingGameState.secondClickedCard &&
      matchingGameState.firstClickedCard
    ) {
      setTimeout(() => {
        matchingGameDispatch({
          type: "SUCCESS",
          payload: matchingGameState?.firstClickedCard?.number
            ? matchingGameState?.firstClickedCard?.number
            : 0,
        });
      }, 500);
    }
  }, [matchingGameState.secondClickedCard]);

  useEffect(() => {
    const timer = setTimeout(() => {
      matchingGameDispatch({ type: "ADD_TIME" });
    }, 100);
    return () => clearTimeout(timer);
  }, [matchingGameState.stopwatch]);

  const wrongGuess =
    matchingGameState.firstClickedCard?.number !==
      matchingGameState.secondClickedCard?.number &&
    matchingGameState.firstClickedCard &&
    matchingGameState.secondClickedCard
      ? true
      : false;

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
          <span className={`col-primary ${wrongGuess ? "shake-ani" : ""}`}>
            {matchingGameState.stopwatch.toFixed(1)}
          </span>
        </div>
        <div className="field">
          <label>BEST TIME</label>
          <span>
            {matchingGameState.deck?.highScore
              ? matchingGameState.deck?.highScore
              : "N/A"}
          </span>
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

          const correctGuess =
            matchingGameState.firstClickedCard?.number ===
              matchingGameState.secondClickedCard?.number &&
            matchingGameState.firstClickedCard &&
            matchingGameState.secondClickedCard &&
            side.number === matchingGameState.firstClickedCard?.number
              ? "success"
              : "";

          // const correctMatchClass1 =
          //   bothCardsAreSelected &&
          //   correctGuess &&
          //   side.number === matchingGameState.firstClickedCard?.number &&
          //   side.type === matchingGameState.firstClickedCard?.type
          //     ? "correct"
          //     : "";
          // const correctMatchClass2 =
          //   bothCardsAreSelected &&
          //   correctGuess &&
          //   side.number === matchingGameState.secondClickedCard?.number &&
          //   side.type === matchingGameState.secondClickedCard?.type
          //     ? "correct"
          //     : "";

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
              className={`matching__card ${correctGuess} ${wrongMatchClass2} ${wrongMatchClass}  ${clickedStyle} ${secondClickedStyle}`}
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
