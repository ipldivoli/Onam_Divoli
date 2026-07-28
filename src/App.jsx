import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import GameDetails from "./pages/GameDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/:id" element={<GameDetails />} />
    </Routes>
  );
}