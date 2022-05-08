import { useEffect, useContext } from "react";

import { AuthContext as Context } from "../App";

const MyDecks = () => {
  const { authDispatch } = useContext(Context);

  const getDecks = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const response = await fetch(
      `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${userId}.json`
    );
    const data = await response.json();

    console.log(Object.values(data));

    authDispatch({ type: "GOT_DECKS", payload: Object.values(data) });
  };

  useEffect(() => {
    getDecks();
  }, []);

  return <div style={{ backgroundColor: "#fff" }}>MyDecks</div>;
};

export default MyDecks;
