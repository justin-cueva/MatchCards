import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./homePage/Home";
import Create from "./createPage/Create";
import MyDecks from "./myDecksPage/MyDecks";
import "../styles/app.css";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/myDecks" element={<MyDecks />} />
          <Route path="/auth" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
