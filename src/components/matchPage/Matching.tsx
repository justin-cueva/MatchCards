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
          <span className="col-primary">24.8</span>
        </div>
        <div className="field">
          <label>BEST TIME</label>
          <span>50.2</span>
        </div>
      </div>
      <div className="matching__cards">
        {matchingGameState.cardSides.map((side) => {
          return (
            <div className={`matching__card ${side.type}`}>{side.text}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Matching;
