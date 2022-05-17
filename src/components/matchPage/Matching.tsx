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
          return (
            <div key={index} className={`matching__card ${side.type}`}>
              {side.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matching;
