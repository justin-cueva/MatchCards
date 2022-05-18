import { Fragment } from "react";

import { Actions } from "../../reducers/matchingGameReducer";
import "../../styles/matchPage/preGame.css";

type Props = {
  matchingGameDispatch: React.Dispatch<Actions>;
};

const PreGame = ({ matchingGameDispatch }: Props) => {
  return (
    <Fragment>
      <div className="overlay--pre-game" />
      <div className="page--pre-game modal--pre-game">
        <h1>Make everything disappear</h1>
        <span>
          Match all of the terms with their definitions. If you pick the wrong
          match extra time will be added.
        </span>
        <button
          onClick={() => {
            matchingGameDispatch({
              type: "CHANGE_GAME_STATUS",
              payload: "MATCHING",
            });
          }}
        >
          Start game
        </button>
      </div>
    </Fragment>
  );
};

export default PreGame;
