import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import DashboardPage from "./pages/DashboardPage"
import RootPage from "./pages/RootPage";
import InstancePage from "./pages/InstancePage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import {RequireAuth} from "react-auth-kit"

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<RequireAuth loginPath="/login"> <DashboardPage/></RequireAuth>} />
          <Route path="/dashboard/:instance" element={<RequireAuth loginPath="/login"> <InstancePage/></RequireAuth>} />
          <Route path="/root" element={<RequireAuth loginPath="/login"> <RootPage/></RequireAuth>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
