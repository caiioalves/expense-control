import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
