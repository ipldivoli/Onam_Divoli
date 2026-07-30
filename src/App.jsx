import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import GameDetails from "./pages/GameDetails";
import Teams from "./pages/Teams";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/:id" element={<GameDetails />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  );
}