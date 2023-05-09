import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import DashboardPage from "./pages/DashboardPage"
import RootPage from "./pages/RootPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

function App() {
  const [count, setCount] = useState(0);
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/root" element={<RootPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
