import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useReducer, useEffect } from "react";

import authReducer, {
  defaultState as authDefaultState,
} from "../reducers/authReducer";
import Header from "./reusables/Header";
import Home from "./homePage/Home";
import CreatePage from "./createPage/CreatePage";
import MyDecks from "./myDecksPage/MyDecks";
import AuthPage from "./authPage/AuthPage";
import "../styles/app.css";

export const AuthContext = createContext<any>(null);

const App = () => {
  const [authState, authDispatch] = useReducer(authReducer, authDefaultState);

  useEffect(() => {
    console.log("-------------------");
    console.log(authState);
    console.log("-------------------");
  }, [authState.myDecks]);

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

  // SETTING THE MY DECKS STATE
  useEffect(() => {
    getDecks();
  }, [authState.isLoggedIn]);

  // SETTING THE ISLOGGED IN AND USERID
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      authDispatch({ type: "LOGIN", payload: { userId: userId } });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState: authState, authDispatch: authDispatch }}
    >
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/myDecks" element={<MyDecks />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
