import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Manager from "./Components/Manager";
import Sidebar from "./Components/Sidebar";
import Clients from "./Components/Clients";
import Employee from "./Components/Employee";
import Projects from "./Components/Projects";
import Attendance from "./Components/Attendance";
import Profile from "./Components/Profile";


function App() {
  

  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute><Sidebar /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
