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

  const [firstClickedCard, setFirstClickedCard] = useState<any>(null);
  const [secondClickedCard, setSecondClickedCard] = useState<any>(null);

  useEffect(() => {
    if (
      firstClickedCard?.number === secondClickedCard?.number &&
      secondClickedCard &&
      firstClickedCard
    ) {
      matchingGameDispatch({
        type: "SUCCESS",
        payload: firstClickedCard?.number,
      });
      setFirstClickedCard(null);
      setSecondClickedCard(null);
    }
    // if ()
    // if first clicked === the number of second clicked then remove the side cards from state
  }, [secondClickedCard]);

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
          const clickedStyle =
            side.number === firstClickedCard?.number &&
            side.type === firstClickedCard?.type
              ? "clicked"
              : "";

          const secondClickedStyle =
            side.number === secondClickedCard?.number &&
            side.type === secondClickedCard?.type
              ? "clicked"
              : "";

          return (
            <div
              key={index}
              className={`matching__card  ${clickedStyle} ${secondClickedStyle}`}
              onClick={() => {
                const clickedSameCart =
                  firstClickedCard?.number === side.number &&
                  firstClickedCard?.type === side.type;

                setFirstClickedCard((prevState: any) => {
                  if (
                    prevState?.number === side.number &&
                    prevState?.type === side.type
                  ) {
                    console.log("RAN");
                    return null;
                  } else if (!prevState) {
                    return { number: side.number, type: side.type };
                  } else {
                    return prevState;
                  }
                });

                if (firstClickedCard && !clickedSameCart)
                  setSecondClickedCard(() => {
                    console.log("SECOND");
                    return { number: side.number, type: side.type };
                  });
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
