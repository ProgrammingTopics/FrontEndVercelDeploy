import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employers from "./pages/employers/Employers";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Reports from "./pages/reports/Reports";
import Tasks from "./pages/tasks/Tasks";
import Team from "./pages/team/Team";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Tasks" element={<Tasks />}></Route>
        <Route path="/Team" element={<Team />}></Route>
        <Route path="/Employers" element={<Employers />}></Route>
        <Route path="/Reports" element={<Reports />}></Route>
      </Routes>
    </Router>
  );
}
