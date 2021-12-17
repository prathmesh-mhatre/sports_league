import React from "react";
import Home from "./Home";
import Details from "./Details";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leagueDetails/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
