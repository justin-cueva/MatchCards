import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./home/Home";
import Create from "./create/Create";
import MyDecks from "./myDecks/MyDecks";
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
