import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./reusables/Header";
import Home from "./homePage/Home";
import CreatePage from "./createPage/CreatePage";
import MyDecks from "./myDecksPage/MyDecks";
import AuthPage from "./authPage/AuthPage";
import "../styles/app.css";

const App = () => {
  return (
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
  );
};

export default App;
