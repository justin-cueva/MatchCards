import { useEffect, useState, Fragment } from "react";

import PreGame from "./PreGame";

const MatchPage = () => {
  const [gameStatus, setGameStatus] = useState<string>("PREGAME");

  // useEffect(() => {
  //   return () => {
  //     setGameStatus("PREGAME");
  //   };
  // });

  return (
    <Fragment>
      {gameStatus === "PREGAME" && <PreGame setGameStatus={setGameStatus} />}
      {gameStatus === "MATCHING" && <div>MatchPage</div>}
      {gameStatus === "SUMMARY" && <div>Summary</div>}
    </Fragment>
  );
};

// hide the header

export default MatchPage;
