import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Job from "./components/job";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/job" element={<Job />} />
    </Routes>
  );
};

export default App;
