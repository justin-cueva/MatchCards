import { useEffect, useContext, useState } from "react";

import { AuthContext as Context } from "../App";
import SortDecksInputs from "./SortDecksInputs";
import DecksContainer from "./DecksContainer";
import "../../styles/myDecksPage.css";

const MyDecks = () => {
  const { authDispatch, authState } = useContext(Context);
  const [decksAreLoading, setDecksAreLoading] = useState<boolean>(false);

  const getDecks = async () => {
    // set loading
    setDecksAreLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setDecksAreLoading(false);
      return;
    }

    const response = await fetch(
      `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${userId}.json`
    );
    const data = await response.json();

    authDispatch({ type: "GOT_DECKS", payload: data });

    setDecksAreLoading(false);
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div className="page max-w-80">
      <SortDecksInputs />
      <DecksContainer
        decksAreLoading={decksAreLoading}
        decks={authState.myDecks}
      />
    </div>
  );
};

export default MyDecks;
